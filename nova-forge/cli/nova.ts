#!/usr/bin/env node

/**
 * Nova Forge CLI
 * Sovereign ICP Mainnet Build & Deploy System
 * 
 * "If it's not on mainnet, it doesn't exist."
 */

import { execSync, spawn } from 'child_process';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import * as readline from 'readline';

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

const VERSION = '1.0.0';
const CONFIG_FILE = 'nova.toml';
const IC_NETWORK = 'ic'; // ALWAYS mainnet

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// ═══════════════════════════════════════════════════════════════
// BANNER
// ═══════════════════════════════════════════════════════════════

const BANNER = `
${COLORS.cyan}
    ╔═╗╔═╗╦  ╦╔═╗   ╔═╗╔═╗╦═╗╔═╗╔═╗
    ║║║║ ║╚╗╔╝╠═╣   ╠╣ ║ ║╠╦╝║ ╦║╣ 
    ╝╚╝╚═╝ ╚╝ ╩ ╩   ╚  ╚═╝╩╚═╚═╝╚═╝
${COLORS.reset}
    ${COLORS.bright}Sovereign ICP Mainnet Deployment${COLORS.reset}
    ${COLORS.yellow}v${VERSION}${COLORS.reset}
`;

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════

function log(message: string, color = COLORS.reset) {
  console.log(`${color}${message}${COLORS.reset}`);
}

function success(message: string) {
  log(`✅ ${message}`, COLORS.green);
}

function warn(message: string) {
  log(`⚠️  ${message}`, COLORS.yellow);
}

function error(message: string) {
  log(`❌ ${message}`, COLORS.red);
}

function info(message: string) {
  log(`ℹ️  ${message}`, COLORS.blue);
}

function step(message: string) {
  log(`\n${COLORS.bright}▸ ${message}${COLORS.reset}`);
}

// ═══════════════════════════════════════════════════════════════
// CONFIG PARSER
// ═══════════════════════════════════════════════════════════════

interface NovaConfig {
  project: {
    name: string;
    version: string;
    description?: string;
  };
  network: {
    target: string;
  };
  canisters: Record<string, CanisterConfig>;
  build?: {
    output_dir?: string;
    moc_args?: string[];
  };
  ai?: {
    pre_deploy_scan?: boolean;
    cycle_optimization?: boolean;
    upgrade_safety_check?: boolean;
    security_level?: string;
  };
  deploy?: {
    confirm_required?: boolean;
    min_cycles?: number;
  };
}

interface CanisterConfig {
  main?: string;
  type?: string;
  source?: string;
  cycles?: string | number;
  dependencies?: string[];
}

function parseConfig(): NovaConfig | null {
  if (!existsSync(CONFIG_FILE)) {
    error(`Config file '${CONFIG_FILE}' not found`);
    info(`Run 'nova init' to create a new configuration`);
    return null;
  }

  try {
    const content = readFileSync(CONFIG_FILE, 'utf-8');
    return parseTOML(content);
  } catch (e) {
    error(`Failed to parse ${CONFIG_FILE}: ${e}`);
    return null;
  }
}

// Simple TOML parser for nova.toml
function parseTOML(content: string): NovaConfig {
  const config: any = {};
  let currentSection: string[] = [];
  
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    
    // Skip comments and empty lines
    if (trimmed.startsWith('#') || trimmed === '') continue;
    
    // Section header
    const sectionMatch = trimmed.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1].split('.');
      let obj = config;
      for (const key of currentSection) {
        if (!obj[key]) obj[key] = {};
        obj = obj[key];
      }
      continue;
    }
    
    // Key-value pair
    const kvMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
    if (kvMatch) {
      const [, key, rawValue] = kvMatch;
      const value = parseValue(rawValue);
      
      let obj = config;
      for (const section of currentSection) {
        obj = obj[section];
      }
      obj[key] = value;
    }
  }
  
  return config as NovaConfig;
}

function parseValue(raw: string): any {
  raw = raw.trim();
  
  // String
  if (raw.startsWith('"') && raw.endsWith('"')) {
    return raw.slice(1, -1);
  }
  
  // Array
  if (raw.startsWith('[')) {
    const content = raw.slice(1, -1);
    return content.split(',').map(s => parseValue(s.trim())).filter(Boolean);
  }
  
  // Boolean
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  
  // Number
  const num = Number(raw.replace(/_/g, ''));
  if (!isNaN(num)) return num;
  
  return raw;
}

// ═══════════════════════════════════════════════════════════════
// COMMANDS
// ═══════════════════════════════════════════════════════════════

async function cmdInit() {
  step('Initializing Nova Forge project');
  
  if (existsSync(CONFIG_FILE)) {
    warn(`${CONFIG_FILE} already exists`);
    return;
  }
  
  const template = `# 🚀 Nova Forge Configuration
# Sovereign ICP Mainnet Build & Deploy System

[project]
name = "my-project"
version = "0.1.0"
description = "My ICP Project"

[network]
target = "ic"  # ALWAYS mainnet

[canisters.backend]
main = "src/backend/main.mo"
cycles = "auto"

[canisters.frontend]
type = "assets"
source = "src/frontend/dist"
dependencies = ["backend"]

[build]
output_dir = "src/backend/dist"

[ai]
pre_deploy_scan = true
cycle_optimization = true
upgrade_safety_check = true
security_level = "strict"

[deploy]
confirm_required = true
min_cycles = 1_000_000_000_000
`;
  
  writeFileSync(CONFIG_FILE, template);
  success(`Created ${CONFIG_FILE}`);
  info('Edit the configuration and run `nova build`');
}

async function cmdBuild() {
  step('Building canisters');
  
  const config = parseConfig();
  if (!config) return;
  
  const outputDir = config.build?.output_dir || 'dist';
  
  for (const [name, canister] of Object.entries(config.canisters)) {
    if (canister.type === 'assets') {
      info(`Skipping asset canister: ${name}`);
      continue;
    }
    
    log(`\nBuilding ${name}...`, COLORS.cyan);
    
    try {
      // Use mops build for Motoko
      execSync('mops build', { stdio: 'inherit' });
      success(`Built ${name}`);
    } catch (e) {
      error(`Failed to build ${name}`);
      process.exit(1);
    }
  }
  
  success('Build complete');
}

async function cmdScan() {
  step('Running AI security scan');
  
  const config = parseConfig();
  if (!config) return;
  
  info('Analyzing source files...');
  
  // Find all .mo files
  const moFiles: string[] = [];
  findFiles('src', '.mo', moFiles);
  
  log(`\nFound ${moFiles.length} Motoko files`);
  
  // Simple pattern matching (in production, this would use the Motoko scanner)
  const patterns = [
    { pattern: /shared\s+.*func.*controller/g, severity: 'critical', message: 'Unrestricted controller access' },
    { pattern: /Array\.append/g, severity: 'warning', message: 'Unbounded array growth' },
    { pattern: /await\s+[^{]*[^try]/g, severity: 'warning', message: 'Async without error handling' },
    { pattern: /stable\s+var/g, severity: 'info', message: 'Stable variable (upgrade risk)' },
  ];
  
  let warnings = 0;
  let errors = 0;
  
  for (const file of moFiles) {
    const content = readFileSync(file, 'utf-8');
    
    for (const { pattern, severity, message } of patterns) {
      const matches = content.match(pattern);
      if (matches) {
        if (severity === 'critical') {
          error(`[${file}] ${message} (${matches.length} occurrences)`);
          errors++;
        } else if (severity === 'warning') {
          warn(`[${file}] ${message} (${matches.length} occurrences)`);
          warnings++;
        } else {
          info(`[${file}] ${message} (${matches.length} occurrences)`);
        }
      }
    }
  }
  
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  if (errors > 0) {
    error(`Scan FAILED: ${errors} critical issues, ${warnings} warnings`);
  } else if (warnings > 0) {
    warn(`Scan passed with ${warnings} warnings`);
  } else {
    success('Scan passed - no issues found');
  }
}

async function cmdEstimate() {
  step('Estimating cycle costs');
  
  const config = parseConfig();
  if (!config) return;
  
  // Count source metrics
  let totalLines = 0;
  let totalFunctions = 0;
  let totalStableVars = 0;
  let wasmSize = 0;
  
  const moFiles: string[] = [];
  findFiles('src', '.mo', moFiles);
  
  for (const file of moFiles) {
    const content = readFileSync(file, 'utf-8');
    totalLines += content.split('\n').length;
    totalFunctions += (content.match(/func\s+/g) || []).length;
    totalStableVars += (content.match(/stable\s+var/g) || []).length;
  }
  
  // Check for WASM file
  const wasmPath = join(config.build?.output_dir || 'dist', 'backend.wasm');
  if (existsSync(wasmPath)) {
    const stats = require('fs').statSync(wasmPath);
    wasmSize = stats.size;
  }
  
  log('\n💰 CYCLE ESTIMATE');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log(`Source lines:     ${totalLines.toLocaleString()}`);
  log(`Functions:        ${totalFunctions}`);
  log(`Stable variables: ${totalStableVars}`);
  log(`WASM size:        ${(wasmSize / 1024 / 1024).toFixed(2)} MB`);
  log('');
  
  // Estimate costs
  const installCycles = wasmSize * 10 + 100_000_000_000;
  const monthlyCycles = totalFunctions * 100_000 + 10_000_000_000;
  const recommended = Math.max(installCycles * 1.2, 1_000_000_000_000);
  
  log(`Installation:  ${formatCycles(installCycles)}`);
  log(`Monthly burn:  ~${formatCycles(monthlyCycles)}`);
  log(`Recommended:   ${formatCycles(recommended)}`);
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

async function cmdDeploy(confirm: boolean) {
  console.log(BANNER);
  step('Deploying to ICP MAINNET');
  
  const config = parseConfig();
  if (!config) return;
  
  // Verify mainnet target
  if (config.network.target !== 'ic') {
    error('Nova Forge only deploys to mainnet (ic)');
    error('There is no testnet. There is no staging.');
    return;
  }
  
  // Confirmation
  if (config.deploy?.confirm_required && !confirm) {
    log('\n⚠️  MAINNET DEPLOYMENT', COLORS.yellow);
    log('This will deploy directly to the Internet Computer mainnet.');
    log('There is no testnet. There is no staging.');
    log('This is PRODUCTION.\n');
    
    const confirmed = await askConfirmation('Type "yes" to confirm: ');
    if (!confirmed) {
      info('Deployment cancelled');
      return;
    }
  }
  
  // Pre-deployment checks
  if (config.ai?.pre_deploy_scan) {
    info('Running pre-deployment security scan...');
    await cmdScan();
  }
  
  if (config.ai?.cycle_optimization) {
    info('Running cycle estimation...');
    await cmdEstimate();
  }
  
  // Deploy using dfx
  step('Deploying to mainnet...');
  
  try {
    execSync(`dfx deploy --network ${IC_NETWORK}`, { stdio: 'inherit' });
    
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    success('🚀 DEPLOYED TO MAINNET');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Show canister IDs
    try {
      execSync(`dfx canister --network ${IC_NETWORK} id backend`, { stdio: 'inherit' });
    } catch {}
    
  } catch (e) {
    error('Deployment failed');
    process.exit(1);
  }
}

async function cmdStatus() {
  step('Checking canister status on mainnet');
  
  const config = parseConfig();
  if (!config) return;
  
  for (const [name, canister] of Object.entries(config.canisters)) {
    log(`\n${name}:`, COLORS.cyan);
    
    try {
      execSync(`dfx canister --network ${IC_NETWORK} status ${name}`, { stdio: 'inherit' });
    } catch {
      warn(`Could not get status for ${name}`);
    }
  }
}

async function cmdCanisters() {
  step('Listing mainnet canisters');
  
  try {
    execSync(`dfx canister --network ${IC_NETWORK} list`, { stdio: 'inherit' });
  } catch {
    warn('No canisters found or not connected to mainnet');
  }
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function findFiles(dir: string, ext: string, results: string[]) {
  if (!existsSync(dir)) return;
  
  const entries = require('fs').readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      findFiles(path, ext, results);
    } else if (entry.name.endsWith(ext)) {
      results.push(path);
    }
  }
}

function formatCycles(cycles: number): string {
  if (cycles >= 1_000_000_000_000) {
    return `${(cycles / 1_000_000_000_000).toFixed(2)}T cycles`;
  } else if (cycles >= 1_000_000_000) {
    return `${(cycles / 1_000_000_000).toFixed(2)}B cycles`;
  } else if (cycles >= 1_000_000) {
    return `${(cycles / 1_000_000).toFixed(2)}M cycles`;
  }
  return `${cycles} cycles`;
}

async function askConfirmation(prompt: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'yes');
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command || command === 'help' || command === '-h' || command === '--help') {
    console.log(BANNER);
    log('USAGE:', COLORS.bright);
    log('  nova <command> [options]\n');
    log('COMMANDS:', COLORS.bright);
    log('  init        Initialize project with nova.toml');
    log('  build       Compile canisters');
    log('  scan        Run AI security analysis');
    log('  estimate    Calculate cycle costs');
    log('  deploy      Build + Scan + Deploy to MAINNET');
    log('  status      Check canister health on mainnet');
    log('  canisters   List all canisters\n');
    log('OPTIONS:', COLORS.bright);
    log('  --confirm   Skip deployment confirmation\n');
    log('PHILOSOPHY:', COLORS.bright);
    log('  "If it\'s not on mainnet, it doesn\'t exist."\n');
    return;
  }
  
  switch (command) {
    case 'init':
      await cmdInit();
      break;
    case 'build':
      await cmdBuild();
      break;
    case 'scan':
      await cmdScan();
      break;
    case 'estimate':
      await cmdEstimate();
      break;
    case 'deploy':
      await cmdDeploy(args.includes('--confirm'));
      break;
    case 'status':
      await cmdStatus();
      break;
    case 'canisters':
      await cmdCanisters();
      break;
    default:
      error(`Unknown command: ${command}`);
      log('Run `nova help` for usage');
  }
}

main().catch(console.error);
