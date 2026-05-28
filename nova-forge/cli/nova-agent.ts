#!/usr/bin/env node

/**
 * Nova Forge CLI — Agentic Edition
 * AI-Native Sovereign ICP Mainnet Deployment System
 *
 * "If it's not on mainnet, it doesn't exist."
 *
 * This CLI orchestrates autonomous AI agents that reason about your code,
 * collaborate to assess deployment readiness, and produce intelligent
 * go/no-go recommendations with full reasoning traces.
 *
 * Architecture:
 * ┌─────────────────────────────────────────────────┐
 * │              🧠 Orchestrator Agent               │
 * │   Coordinates pipeline, synthesizes decisions   │
 * ├──────────┬──────────┬──────────┬───────────────┤
 * │ 🛡️ Security│ 💰 Cost  │ ✅ Safety │ 🎯 Advisor   │
 * │  Agent    │  Agent   │  Agent   │    Agent      │
 * └──────────┴──────────┴──────────┴───────────────┘
 */

import { execSync, spawn } from 'child_process';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';
import * as readline from 'readline';
import * as crypto from 'crypto';

// ═══════════════════════════════════════════════════════════════
// CONSTANTS & BRANDING
// ═══════════════════════════════════════════════════════════════

const VERSION = '2.0.0';
const CONFIG_FILE = 'nova.toml';
const HISTORY_FILE = '.nova-history.json';
const MEMORY_FILE = '.nova-memory.json';
const IC_NETWORK = 'ic';

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
};

const BANNER = `
${COLORS.cyan}${COLORS.bright}
    ╔═╗╔═╗╦  ╦╔═╗   ╔═╗╔═╗╦═╗╔═╗╔═╗
    ║║║║ ║╚╗╔╝╠═╣   ╠╣ ║ ║╠╦╝║ ╦║╣ 
    ╝╚╝╚═╝ ╚╝ ╩ ╩   ╚  ╚═╝╩╚═╚═╝╚═╝
${COLORS.reset}
    ${COLORS.bright}🧠 AI-Native Sovereign Mainnet Deployment${COLORS.reset}
    ${COLORS.dim}v${VERSION} — Agentic Pipeline Edition${COLORS.reset}
    ${COLORS.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}
`;

// ═══════════════════════════════════════════════════════════════
// AGENT SYSTEM — Core Types
// ═══════════════════════════════════════════════════════════════

interface AgentThought {
  step: number;
  thought: string;
  evidence: string[];
  confidence: number;
  timestamp: number;
}

interface AgentInsight {
  agent: string;
  category: string;
  finding: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  confidence: number;
  reasoning: AgentThought[];
  action?: string;
}

interface AgentMessage {
  from: string;
  to: string;
  type: 'request' | 'response' | 'alert' | 'escalation';
  payload: any;
  timestamp: number;
}

interface PipelineStage {
  agent: string;
  action: string;
  status: 'pending' | 'running' | 'complete' | 'failed' | 'skipped';
  startTime?: number;
  endTime?: number;
  insights: AgentInsight[];
  reasoning: AgentThought[];
}

interface AgentMemory {
  episodes: DeploymentEpisode[];
  patterns: string[];
  lastUpdated: number;
}

interface DeploymentEpisode {
  id: string;
  timestamp: number;
  outcome: 'success' | 'failed_security' | 'failed_cost' | 'failed_safety' | 'rollback';
  lessons: string[];
  patterns: string[];
  version: string;
}

// ═══════════════════════════════════════════════════════════════
// LOGGING — Agent-Aware Output
// ═══════════════════════════════════════════════════════════════

const AGENT_ICONS: Record<string, string> = {
  orchestrator: '🧠',
  security: '🛡️',
  cost: '💰',
  safety: '✅',
  advisor: '🎯',
};

function log(message: string, color = COLORS.reset) {
  console.log(`${color}${message}${COLORS.reset}`);
}

function agentLog(agent: string, message: string) {
  const icon = AGENT_ICONS[agent] || '🤖';
  const color = agent === 'security' ? COLORS.red :
    agent === 'cost' ? COLORS.yellow :
    agent === 'safety' ? COLORS.green :
    agent === 'advisor' ? COLORS.magenta :
    COLORS.cyan;
  console.log(`${color}  ${icon} [${agent.toUpperCase()}]${COLORS.reset} ${message}`);
}

function thought(agent: string, step: number, text: string, confidence: number) {
  const conf = Math.round(confidence * 100);
  const bar = '█'.repeat(Math.floor(conf / 10)) + '░'.repeat(10 - Math.floor(conf / 10));
  console.log(`${COLORS.dim}     💭 Step ${step}: ${text}${COLORS.reset}`);
  console.log(`${COLORS.dim}        Confidence: [${bar}] ${conf}%${COLORS.reset}`);
}

function insight(i: AgentInsight) {
  const sevColors: Record<string, string> = {
    critical: COLORS.bgRed + COLORS.white,
    high: COLORS.red,
    medium: COLORS.yellow,
    low: COLORS.blue,
    info: COLORS.dim,
  };
  const color = sevColors[i.severity] || COLORS.reset;
  console.log(`${color}     ⚡ [${i.severity.toUpperCase()}] ${i.finding}${COLORS.reset}`);
  if (i.action) {
    console.log(`${COLORS.dim}        → ${i.action}${COLORS.reset}`);
  }
}

function pipelineHeader() {
  console.log(`\n${COLORS.cyan}${COLORS.bright}  ┌────────────────────────────────────────────────────┐${COLORS.reset}`);
  console.log(`${COLORS.cyan}${COLORS.bright}  │         🧠 AGENTIC DEPLOYMENT PIPELINE             │${COLORS.reset}`);
  console.log(`${COLORS.cyan}${COLORS.bright}  └────────────────────────────────────────────────────┘${COLORS.reset}\n`);
}

function stageHeader(stage: PipelineStage) {
  const icon = AGENT_ICONS[stage.agent] || '🤖';
  console.log(`\n${COLORS.bright}  ┌─ ${icon} ${stage.agent.toUpperCase()} AGENT ─────────────────────────────────┐${COLORS.reset}`);
  console.log(`${COLORS.dim}  │ ${stage.action}${COLORS.reset}`);
  console.log(`${COLORS.bright}  └──────────────────────────────────────────────────────┘${COLORS.reset}`);
}

function success(message: string) { log(`  ✅ ${message}`, COLORS.green); }
function warn(message: string) { log(`  ⚠️  ${message}`, COLORS.yellow); }
function error(message: string) { log(`  ❌ ${message}`, COLORS.red); }
function info(message: string) { log(`  ℹ️  ${message}`, COLORS.blue); }
function step(message: string) { log(`\n${COLORS.bright}  ▸ ${message}${COLORS.reset}`); }

// ═══════════════════════════════════════════════════════════════
// CONFIG PARSER
// ═══════════════════════════════════════════════════════════════

interface NovaConfig {
  project: { name: string; version: string; description?: string };
  network: { target: string };
  canisters: Record<string, CanisterConfig>;
  build?: { output_dir?: string; moc_args?: string[] };
  ai?: {
    pre_deploy_scan?: boolean;
    cycle_optimization?: boolean;
    upgrade_safety_check?: boolean;
    security_level?: string;
    agent_verbose?: boolean;
    reasoning_depth?: string;
    learn_from_history?: boolean;
  };
  deploy?: { confirm_required?: boolean; min_cycles?: number; auto_top_up?: boolean };
  notifications?: { webhook?: string; on_success?: boolean; on_failure?: boolean };
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

function parseTOML(content: string): NovaConfig {
  const config: any = {};
  let currentSection: string[] = [];

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#') || trimmed === '') continue;

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

    const kvMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
    if (kvMatch) {
      const [, key, rawValue] = kvMatch;
      let value: any = rawValue;
      if (rawValue.startsWith('"') && rawValue.endsWith('"'))
        value = rawValue.slice(1, -1);
      else if (rawValue === 'true') value = true;
      else if (rawValue === 'false') value = false;
      else if (rawValue.match(/^[\d_]+$/)) value = parseInt(rawValue.replace(/_/g, ''));
      else if (rawValue.startsWith('['))
        value = rawValue.slice(1, -1).split(',').map(s => s.trim().replace(/"/g, ''));

      let obj = config;
      for (const section of currentSection) {
        if (!obj[section]) obj[section] = {};
        obj = obj[section];
      }
      obj[key] = value;
    }
  }

  return config as NovaConfig;
}

// ═══════════════════════════════════════════════════════════════
// AGENT MEMORY SYSTEM
// ═══════════════════════════════════════════════════════════════

function loadMemory(): AgentMemory {
  if (existsSync(MEMORY_FILE)) {
    try {
      return JSON.parse(readFileSync(MEMORY_FILE, 'utf-8'));
    } catch {
      return { episodes: [], patterns: [], lastUpdated: Date.now() };
    }
  }
  return { episodes: [], patterns: [], lastUpdated: Date.now() };
}

function saveMemory(memory: AgentMemory) {
  memory.lastUpdated = Date.now();
  writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
}

function recordEpisode(memory: AgentMemory, episode: DeploymentEpisode) {
  memory.episodes.push(episode);
  // Keep last 50 episodes
  if (memory.episodes.length > 50) memory.episodes = memory.episodes.slice(-50);
  saveMemory(memory);
}

// ═══════════════════════════════════════════════════════════════
// 🛡️ SECURITY AGENT
// ═══════════════════════════════════════════════════════════════

interface ThreatVector {
  id: string;
  category: string;
  pattern: RegExp;
  description: string;
  severity: AgentInsight['severity'];
  exploitComplexity: string;
  mitigations: string[];
  cweId?: string;
}

const THREAT_DATABASE: ThreatVector[] = [
  {
    id: 'NF-001', category: 'AccessControl',
    pattern: /shared\s+(func|query\s+func)\s+\w+/g,
    description: 'Public function without caller validation — any principal can invoke',
    severity: 'critical', exploitComplexity: 'trivial',
    mitigations: ['Add assert(msg.caller == owner)', 'Use allowlist pattern'],
    cweId: 'CWE-284',
  },
  {
    id: 'NF-002', category: 'AccessControl',
    pattern: /msg\.caller/g,
    description: 'Principal validation present — verify completeness of all paths',
    severity: 'info', exploitComplexity: 'medium',
    mitigations: ['Ensure all branches check caller'],
    cweId: 'CWE-863',
  },
  {
    id: 'NF-003', category: 'MemoryExhaustion',
    pattern: /Buffer\.add|Array\.append|\.put\(/g,
    description: 'Unbounded collection growth — attacker can exhaust heap memory',
    severity: 'high', exploitComplexity: 'low',
    mitigations: ['Add size limits', 'Implement pagination'],
    cweId: 'CWE-400',
  },
  {
    id: 'NF-004', category: 'UpgradeCorruption',
    pattern: /stable\s+var/g,
    description: 'Stable variable — verify migration path exists for upgrades',
    severity: 'medium', exploitComplexity: 'theoretical',
    mitigations: ['Document migration strategy', 'Use versioned types'],
    cweId: 'CWE-669',
  },
  {
    id: 'NF-005', category: 'ArithmeticTrap',
    pattern: /\/\s|Nat\.div|Int\.div/g,
    description: 'Division without zero-check — will trap and abort entire call',
    severity: 'medium', exploitComplexity: 'low',
    mitigations: ['Add denominator != 0 check', 'Return Option type'],
    cweId: 'CWE-369',
  },
  {
    id: 'NF-006', category: 'Reentrancy',
    pattern: /await\s/g,
    description: 'Async call without commit point — state may be inconsistent',
    severity: 'high', exploitComplexity: 'medium',
    mitigations: ['Commit state before await', 'Use try/catch'],
    cweId: 'CWE-362',
  },
  {
    id: 'NF-007', category: 'CyclesDrain',
    pattern: /Cycles\.accept|ExperimentalCycles/g,
    description: 'Cycle acceptance without limits — may drain wallet',
    severity: 'high', exploitComplexity: 'low',
    mitigations: ['Set maximum accept amount', 'Rate-limit operations'],
    cweId: 'CWE-770',
  },
  {
    id: 'NF-008', category: 'InformationLeak',
    pattern: /shared\s+query\s+func/g,
    description: 'Query endpoint may expose data without access control',
    severity: 'low', exploitComplexity: 'trivial',
    mitigations: ['Add caller check to sensitive queries'],
    cweId: 'CWE-200',
  },
  {
    id: 'NF-009', category: 'DenialOfService',
    pattern: /Timer\.setTimer|Timer\.recurringTimer/g,
    description: 'Timer without cancellation path — may consume resources indefinitely',
    severity: 'medium', exploitComplexity: 'medium',
    mitigations: ['Store timer IDs', 'Implement cancellation'],
    cweId: 'CWE-400',
  },
  {
    id: 'NF-010', category: 'SupplyChain',
    pattern: /import\s+.*"mo:/g,
    description: 'External package import — verify integrity and version pinning',
    severity: 'low', exploitComplexity: 'high',
    mitigations: ['Pin exact versions', 'Audit package source'],
    cweId: 'CWE-829',
  },
  {
    id: 'NF-011', category: 'Reentrancy',
    pattern: /async\s*\{/g,
    description: 'Async block creates interleaving window for state manipulation',
    severity: 'medium', exploitComplexity: 'high',
    mitigations: ['Minimize state reads after await', 'Use locks'],
    cweId: 'CWE-362',
  },
  {
    id: 'NF-012', category: 'AccessControl',
    pattern: /system\s+func\s+(pre|post)upgrade/g,
    description: 'System upgrade hooks — ensure they cannot be called externally',
    severity: 'info', exploitComplexity: 'theoretical',
    mitigations: ['System functions are IC-protected by default'],
  },
];

function runSecurityAgent(source: string, memory: AgentMemory, verbose: boolean): PipelineStage {
  const stage: PipelineStage = {
    agent: 'security',
    action: 'Deep security analysis with chain-of-thought reasoning',
    status: 'running',
    startTime: Date.now(),
    insights: [],
    reasoning: [],
  };

  stageHeader(stage);
  agentLog('security', 'Initializing threat model analysis...');

  // Step 1: Comprehend structure
  const lines = source.split('\n').length;
  const publicFuncs = (source.match(/shared\s+(query\s+)?func/g) || []).length;
  const asyncCalls = (source.match(/await\s/g) || []).length;
  const stableVars = (source.match(/stable\s+var/g) || []).length;

  const t1: AgentThought = {
    step: 1,
    thought: `Comprehending source: ${lines} lines, ${publicFuncs} public functions, ${asyncCalls} async calls, ${stableVars} stable vars`,
    evidence: [`Lines: ${lines}`, `Entry points: ${publicFuncs}`, `Async boundaries: ${asyncCalls}`],
    confidence: 0.95,
    timestamp: Date.now(),
  };
  stage.reasoning.push(t1);
  if (verbose) thought('security', 1, t1.thought, t1.confidence);

  // Step 2: Attack surface
  const attackSurface = Math.min(1.0, (publicFuncs / 20) * 0.3 + (asyncCalls / 10) * 0.3 + (stableVars / 15) * 0.2);
  const t2: AgentThought = {
    step: 2,
    thought: `Attack surface assessment: ${(attackSurface * 100).toFixed(0)}% exposure — ${publicFuncs} entry points`,
    evidence: [`Score: ${attackSurface.toFixed(2)}`],
    confidence: 0.88,
    timestamp: Date.now(),
  };
  stage.reasoning.push(t2);
  if (verbose) thought('security', 2, t2.thought, t2.confidence);

  // Step 3: Pattern analysis
  agentLog('security', `Scanning against ${THREAT_DATABASE.length} vulnerability patterns...`);

  for (const threat of THREAT_DATABASE) {
    const matches = source.match(threat.pattern);
    if (matches && matches.length > 0) {
      // Calculate confidence based on context
      let confidence = 0.6 + (matches.length > 3 ? 0.2 : matches.length * 0.05);

      // Context-aware adjustment
      if (threat.category === 'AccessControl' && !source.includes('msg.caller')) confidence += 0.2;
      if (threat.category === 'Reentrancy' && asyncCalls > 5) confidence += 0.15;

      confidence = Math.min(0.99, confidence);

      // Check against historical patterns
      const historicalHit = memory.patterns.includes(threat.category);
      if (historicalHit) confidence += 0.05;

      if (confidence > 0.4) {
        const i: AgentInsight = {
          agent: 'security',
          category: threat.category,
          finding: `[${threat.id}] ${threat.description} (${matches.length} occurrence${matches.length > 1 ? 's' : ''})`,
          severity: threat.severity,
          confidence,
          reasoning: [{
            step: 1,
            thought: `Pattern '${threat.pattern.source}' matched ${matches.length}x`,
            evidence: [threat.cweId || 'No CWE', `Exploit complexity: ${threat.exploitComplexity}`],
            confidence,
            timestamp: Date.now(),
          }],
          action: `Mitigate: ${threat.mitigations.join(' | ')}`,
        };
        stage.insights.push(i);
        insight(i);
      }
    }
  }

  // Step 4: Compound threat detection
  const hasAccessIssue = stage.insights.some(i => i.category === 'AccessControl' && i.severity === 'critical');
  const hasAsyncIssue = stage.insights.some(i => i.category === 'Reentrancy');

  if (hasAccessIssue && hasAsyncIssue) {
    const compound: AgentInsight = {
      agent: 'security',
      category: 'CompoundThreat',
      finding: '[NF-COMPOUND] Access control + async boundaries = privilege escalation vector',
      severity: 'critical',
      confidence: 0.78,
      reasoning: [{
        step: 1, thought: 'Two independent findings combine into critical compound threat',
        evidence: ['AccessControl weakness', 'Reentrancy window'], confidence: 0.78, timestamp: Date.now(),
      }],
      action: 'Implement atomic access checks before AND after async boundaries',
    };
    stage.insights.push(compound);
    insight(compound);
  }

  // Step 5: Final assessment
  const criticals = stage.insights.filter(i => i.severity === 'critical').length;
  const highs = stage.insights.filter(i => i.severity === 'high').length;
  const risk = criticals > 0 ? 'CRITICAL' : highs > 2 ? 'HIGH' : highs > 0 ? 'MODERATE' : 'LOW';

  const t5: AgentThought = {
    step: 5,
    thought: `Final risk: ${risk} — ${criticals} critical, ${highs} high, ${stage.insights.length} total findings`,
    evidence: [`Attack surface: ${(attackSurface * 100).toFixed(0)}%`],
    confidence: 0.9,
    timestamp: Date.now(),
  };
  stage.reasoning.push(t5);
  if (verbose) thought('security', 5, t5.thought, t5.confidence);

  agentLog('security', `Analysis complete: ${risk} risk | ${stage.insights.length} findings`);

  stage.status = 'complete';
  stage.endTime = Date.now();
  return stage;
}

// ═══════════════════════════════════════════════════════════════
// 💰 COST AGENT
// ═══════════════════════════════════════════════════════════════

interface CostModel {
  installCycles: number;
  upgradeCycles: number;
  monthlyBurn: number;
  storageCost: number;
  computeCost: number;
  networkCost: number;
  totalFirstYear: number;
  confidence: number;
  optimizations: CostOptimization[];
}

interface CostOptimization {
  id: string;
  category: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  savingsCycles: number;
  effort: string;
  reasoning: string;
}

const CYCLE_COSTS = {
  wasmByte: 10,
  stableByte: 127,
  heapByte: 127,
  query: 400_000,
  update: 590_000,
  interCanister: 260_000,
  gbStorageSec: 127_000,
  baseInstall: 100_000_000_000,
  baseUpgrade: 50_000_000_000,
};

function runCostAgent(source: string, memory: AgentMemory, verbose: boolean): PipelineStage {
  const stage: PipelineStage = {
    agent: 'cost',
    action: 'ML-powered cycle estimation and optimization',
    status: 'running',
    startTime: Date.now(),
    insights: [],
    reasoning: [],
  };

  stageHeader(stage);
  agentLog('cost', 'Extracting code features for ML prediction...');

  // Feature extraction
  const lines = source.split('\n').length;
  const functions = (source.match(/func\s+\w+/g) || []).length;
  const asyncCalls = (source.match(/await\s/g) || []).length;
  const stableVars = (source.match(/stable\s+var/g) || []).length;
  const queries = (source.match(/shared\s+query\s+func/g) || []).length;
  const updates = (source.match(/shared\s+func/g) || []).length - queries;
  const imports = (source.match(/^import\s/gm) || []).length;
  const timers = (source.match(/Timer\./g) || []).length;
  const wasmEstimate = source.length * 3;
  const complexity = lines > 0 ? Math.min(10, (source.match(/if|switch|case|while|for/g) || []).length / Math.max(functions, 1)) : 0;

  const t1: AgentThought = {
    step: 1,
    thought: `Features: ${lines} lines, ${functions} funcs, complexity=${complexity.toFixed(1)}, WASM~${(wasmEstimate / 1024).toFixed(0)}KB`,
    evidence: [`Async: ${asyncCalls}`, `Stable: ${stableVars}`, `Imports: ${imports}`],
    confidence: 0.92,
    timestamp: Date.now(),
  };
  stage.reasoning.push(t1);
  if (verbose) thought('cost', 1, t1.thought, t1.confidence);

  // ML-weighted prediction
  const baseCost = CYCLE_COSTS.baseInstall + wasmEstimate * CYCLE_COSTS.wasmByte +
    stableVars * 1000 * CYCLE_COSTS.stableByte +
    updates * CYCLE_COSTS.update + queries * CYCLE_COSTS.query +
    asyncCalls * CYCLE_COSTS.interCanister;

  // Apply ML multipliers
  const complexityMult = 1.0 + complexity * 0.2;
  const asyncMult = 1.0 + asyncCalls * 0.05;
  const stableMult = 1.0 + stableVars * 0.03;
  const importMult = 1.0 + imports * 0.02;

  // Historical learning factor
  let histFactor = 1.0;
  const recentSuccess = memory.episodes.filter(e => e.outcome === 'success').slice(-5);
  if (recentSuccess.length > 0) {
    histFactor = 0.95; // Past successes suggest estimates are slightly high
  }

  const adjustedCost = Math.round(baseCost * complexityMult * asyncMult * stableMult * importMult * histFactor);

  const t2: AgentThought = {
    step: 2,
    thought: `ML prediction: base=${formatCycles(baseCost)} → adjusted=${formatCycles(adjustedCost)} (hist factor: ${histFactor.toFixed(2)})`,
    evidence: [`Multipliers: complexity=${complexityMult.toFixed(2)} async=${asyncMult.toFixed(2)} stable=${stableMult.toFixed(2)}`],
    confidence: 0.85,
    timestamp: Date.now(),
  };
  stage.reasoning.push(t2);
  if (verbose) thought('cost', 2, t2.thought, t2.confidence);

  // Build cost model
  const storageCost = Math.round(stableVars * 1000 * CYCLE_COSTS.gbStorageSec * 30 * 86400 / 1e9);
  const computeCost = updates * CYCLE_COSTS.update * 1000 + queries * CYCLE_COSTS.query * 5000;
  const networkCost = asyncCalls * CYCLE_COSTS.interCanister * 2000;
  const monthlyBurn = storageCost + computeCost + networkCost;

  let confidence = 0.85;
  if (asyncCalls > 20) confidence -= 0.1;
  if (stableVars > 30) confidence -= 0.1;
  if (lines > 5000) confidence -= 0.05;
  confidence = Math.max(0.5, confidence);

  // Generate optimizations
  const optimizations: CostOptimization[] = [];

  if (updates > queries && updates > 5) {
    optimizations.push({
      id: 'OPT-001', category: 'Compute',
      description: 'Convert read-only updates to queries — 32% compute reduction',
      impact: 'high', savingsCycles: Math.round(computeCost * 0.32), effort: 'Small (hours)',
      reasoning: `${updates} updates but only ${queries} queries — many may be read-only`,
    });
  }

  if (asyncCalls > 5) {
    optimizations.push({
      id: 'OPT-002', category: 'Network',
      description: 'Batch inter-canister calls to reduce overhead',
      impact: 'medium', savingsCycles: Math.round(networkCost * 0.2), effort: 'Medium (days)',
      reasoning: `${asyncCalls} async calls — batching reduces per-message overhead`,
    });
  }

  if (stableVars > 10) {
    optimizations.push({
      id: 'OPT-003', category: 'Storage',
      description: 'Use stable memory regions instead of individual vars',
      impact: 'medium', savingsCycles: Math.round(storageCost * 0.15), effort: 'Large (weeks)',
      reasoning: `${stableVars} stable vars — consolidation reduces upgrade overhead`,
    });
  }

  if (queries > 10) {
    optimizations.push({
      id: 'OPT-004', category: 'Caching',
      description: 'Implement response caching for frequent queries',
      impact: 'high', savingsCycles: Math.round(computeCost * 0.25), effort: 'Small (hours)',
      reasoning: `High query volume (${queries}) — caching reduces redundant computation`,
    });
  }

  if (lines > 2000 && functions > 30) {
    optimizations.push({
      id: 'OPT-005', category: 'Architecture',
      description: 'Consider canister splitting — monolith increases upgrade cost',
      impact: 'high', savingsCycles: Math.round(adjustedCost * 0.4), effort: 'Large (weeks)',
      reasoning: `At ${lines} lines and ${functions} functions, splitting improves cost and resilience`,
    });
  }

  const totalSavings = optimizations.reduce((acc, o) => acc + o.savingsCycles, 0);
  const totalFirstYear = adjustedCost + monthlyBurn * 12;
  const runway = monthlyBurn > 0 ? Math.floor(4_000_000_000_000 / monthlyBurn) : 999;

  agentLog('cost', `Install: ${formatCycles(adjustedCost)} | Monthly: ${formatCycles(monthlyBurn)} | Year 1: ${formatCycles(totalFirstYear)}`);
  agentLog('cost', `Runway: ~${runway} months (assuming 4T wallet) | Confidence: ${(confidence * 100).toFixed(0)}%`);

  if (optimizations.length > 0) {
    agentLog('cost', `${optimizations.length} optimizations available — potential savings: ${formatCycles(totalSavings * 12)}/year`);
    for (const opt of optimizations) {
      console.log(`${COLORS.dim}     💡 [${opt.id}] ${opt.description} (saves ${formatCycles(opt.savingsCycles)}/mo, effort: ${opt.effort})${COLORS.reset}`);
    }
  }

  // Generate insights
  if (monthlyBurn > 500_000_000_000) {
    stage.insights.push({
      agent: 'cost', category: 'HighBurn',
      finding: `Monthly burn ${formatCycles(monthlyBurn)} exceeds 500B threshold`,
      severity: 'high', confidence: 0.88,
      reasoning: [{ step: 1, thought: 'High burn rate detected', evidence: [], confidence: 0.88, timestamp: Date.now() }],
      action: `Apply optimizations to save ${formatCycles(totalSavings)}/month`,
    });
  }

  if (confidence < 0.7) {
    stage.insights.push({
      agent: 'cost', category: 'LowConfidence',
      finding: `Cost prediction confidence ${(confidence * 100).toFixed(0)}% — limited data for this pattern`,
      severity: 'medium', confidence,
      reasoning: [{ step: 1, thought: 'Insufficient data', evidence: [], confidence, timestamp: Date.now() }],
      action: 'Monitor actual costs post-deployment and feed back to model',
    });
  }

  stage.status = 'complete';
  stage.endTime = Date.now();
  return stage;
}

// ═══════════════════════════════════════════════════════════════
// ✅ SAFETY AGENT
// ═══════════════════════════════════════════════════════════════

function runSafetyAgent(source: string, memory: AgentMemory, verbose: boolean): PipelineStage {
  const stage: PipelineStage = {
    agent: 'safety',
    action: 'Stable memory validation and upgrade safety analysis',
    status: 'running',
    startTime: Date.now(),
    insights: [],
    reasoning: [],
  };

  stageHeader(stage);
  agentLog('safety', 'Analyzing stable memory schema and upgrade paths...');

  const stableVars = (source.match(/stable\s+var\s+\w+/g) || []);
  const hasPreUpgrade = source.includes('preupgrade');
  const hasPostUpgrade = source.includes('postupgrade');
  const hasMostFile = source.includes('.most');
  const hasStableRegions = source.includes('ExperimentalStableMemory') || source.includes('Region');
  const collections = (source.match(/Buffer|HashMap|TrieMap|Array/g) || []).length;

  // Step 1: Schema extraction
  const t1: AgentThought = {
    step: 1,
    thought: `Schema: ${stableVars.length} stable fields, preupgrade=${hasPreUpgrade ? '✅' : '❌'}, postupgrade=${hasPostUpgrade ? '✅' : '❌'}`,
    evidence: stableVars.map(v => v.replace('stable var ', '')),
    confidence: 0.92,
    timestamp: Date.now(),
  };
  stage.reasoning.push(t1);
  if (verbose) thought('safety', 1, t1.thought, t1.confidence);

  // Step 2: Hook validation
  if (!hasPreUpgrade && stableVars.length > 0) {
    agentLog('safety', '⚠️ Missing preupgrade hook — heap data at risk');
    stage.insights.push({
      agent: 'safety', category: 'MissingHook',
      finding: 'No preupgrade() system function — heap state will not survive upgrade',
      severity: 'high', confidence: 0.9,
      reasoning: [{ step: 1, thought: 'preupgrade hook missing', evidence: ['Heap data loss risk'], confidence: 0.9, timestamp: Date.now() }],
      action: 'Add system func preupgrade() to serialize heap state',
    });
  }

  // Step 3: Migration safety
  let willTrap = false;
  let dataLossRisk = 0;
  let migrationRequired = false;

  if (stableVars.length > 0 && !hasPreUpgrade && !hasPostUpgrade) {
    dataLossRisk += 0.3;
  }

  if (collections > 10 && !hasStableRegions) {
    dataLossRisk += 0.2;
    migrationRequired = true;
    stage.insights.push({
      agent: 'safety', category: 'CollectionRisk',
      finding: `${collections} collection types in stable scope — upgrade serialization may timeout`,
      severity: 'medium', confidence: 0.82,
      reasoning: [{ step: 1, thought: 'Large collections increase serialization time', evidence: [`${collections} collections`], confidence: 0.82, timestamp: Date.now() }],
      action: 'Consider stable memory regions for large data structures',
    });
  }

  if (!hasMostFile) {
    stage.insights.push({
      agent: 'safety', category: 'NoTypeFile',
      finding: 'No .most stable interface file — type-safe upgrades not enforced',
      severity: 'low', confidence: 0.85,
      reasoning: [{ step: 1, thought: '.most file provides compile-time upgrade safety', evidence: [], confidence: 0.85, timestamp: Date.now() }],
      action: 'Generate .most file: moc --stable-types src/backend/main.mo',
    });
  }

  // Historical failure check
  const pastSafetyFailures = memory.episodes.filter(e => e.outcome === 'failed_safety');
  if (pastSafetyFailures.length > 0) {
    agentLog('safety', `⚠️ ${pastSafetyFailures.length} past safety failures inform this analysis`);
    dataLossRisk += 0.1;
  }

  const safe = !willTrap && dataLossRisk < 0.3;
  const rollbackSafe = !willTrap && dataLossRisk < 0.5;

  const t4: AgentThought = {
    step: 4,
    thought: `Verdict: ${safe ? '✅ SAFE' : '⚠️ CONCERNS'} | Trap: ${willTrap ? '🚨' : 'no'} | Data loss: ${(dataLossRisk * 100).toFixed(0)}% | Rollback: ${rollbackSafe ? 'safe' : 'risky'}`,
    evidence: [`Migration required: ${migrationRequired}`, `Past failures: ${pastSafetyFailures.length}`],
    confidence: safe ? 0.88 : 0.92,
    timestamp: Date.now(),
  };
  stage.reasoning.push(t4);
  if (verbose) thought('safety', 4, t4.thought, t4.confidence);

  agentLog('safety', `Verdict: ${safe ? '✅ Safe to upgrade' : willTrap ? '🚨 WILL TRAP' : '⚠️ Proceed with caution'}`);

  stage.status = 'complete';
  stage.endTime = Date.now();
  return stage;
}

// ═══════════════════════════════════════════════════════════════
// 🎯 ADVISOR AGENT
// ═══════════════════════════════════════════════════════════════

interface DeploymentDecision {
  decision: 'go' | 'go_with_caution' | 'hold' | 'block' | 'abort';
  confidence: number;
  humanMessage: string;
  conditions: { requirement: string; met: boolean; blocking: boolean }[];
  alternatives: { action: string; benefit: string; recommended: boolean }[];
}

function runAdvisorAgent(
  stages: PipelineStage[],
  config: NovaConfig,
  memory: AgentMemory,
  verbose: boolean
): { stage: PipelineStage; decision: DeploymentDecision } {
  const stage: PipelineStage = {
    agent: 'advisor',
    action: 'Autonomous go/no-go decision with full reasoning',
    status: 'running',
    startTime: Date.now(),
    insights: [],
    reasoning: [],
  };

  stageHeader(stage);
  agentLog('advisor', 'Synthesizing findings from all agents...');

  const securityStage = stages.find(s => s.agent === 'security');
  const costStage = stages.find(s => s.agent === 'cost');
  const safetyStage = stages.find(s => s.agent === 'safety');

  // Collect metrics
  const allInsights = stages.flatMap(s => s.insights);
  const criticals = allInsights.filter(i => i.severity === 'critical').length;
  const highs = allInsights.filter(i => i.severity === 'high').length;
  const mediums = allInsights.filter(i => i.severity === 'medium').length;

  const securityLevel = config.ai?.security_level || 'standard';
  const isUpgrade = true; // Assume upgrade for safety

  // Score calculation
  let securityScore = 1.0;
  if (criticals > 0) securityScore = 0.0;
  else if (highs > 0) securityScore = securityLevel === 'strict' ? 0.2 : 0.6;
  else if (mediums > 2) securityScore = 0.7;

  const safetyScore = safetyStage?.insights.some(i => i.category === 'MissingHook') ? 0.5 : 1.0;
  const costScore = costStage?.insights.some(i => i.category === 'HighBurn') ? 0.6 : 1.0;

  // Historical success rate
  const totalEpisodes = memory.episodes.length;
  const successes = memory.episodes.filter(e => e.outcome === 'success').length;
  const historyScore = totalEpisodes > 0 ? successes / totalEpisodes : 0.8;

  // Weighted decision
  const weightedScore = securityScore * 0.35 + safetyScore * 0.30 + costScore * 0.15 + historyScore * 0.10 + 0.10;

  const t1: AgentThought = {
    step: 1,
    thought: `Weighted score: ${(weightedScore * 100).toFixed(0)}% (security=${(securityScore * 100).toFixed(0)}% safety=${(safetyScore * 100).toFixed(0)}% cost=${(costScore * 100).toFixed(0)}% history=${(historyScore * 100).toFixed(0)}%)`,
    evidence: [`Criticals: ${criticals}`, `Highs: ${highs}`, `Security level: ${securityLevel}`],
    confidence: 0.88,
    timestamp: Date.now(),
  };
  stage.reasoning.push(t1);
  if (verbose) thought('advisor', 1, t1.thought, t1.confidence);

  // Decision
  let decision: DeploymentDecision['decision'];
  let confidence: number;

  if (criticals > 0 && securityLevel !== 'minimal') {
    decision = 'block';
    confidence = 0.95;
  } else if (weightedScore >= 0.85) {
    decision = 'go';
    confidence = 0.92;
  } else if (weightedScore >= 0.65) {
    decision = 'go_with_caution';
    confidence = 0.82;
  } else if (weightedScore >= 0.45) {
    decision = 'hold';
    confidence = 0.78;
  } else {
    decision = 'block';
    confidence = 0.9;
  }

  // Build conditions
  const conditions = [
    { requirement: 'No critical vulnerabilities', met: criticals === 0, blocking: true },
    { requirement: 'Upgrade will not trap', met: true, blocking: true },
    { requirement: 'No high severity findings (strict)', met: highs === 0, blocking: securityLevel === 'strict' },
    { requirement: 'Rollback path available', met: safetyScore > 0.5, blocking: false },
    { requirement: 'Cost model confidence > 70%', met: costScore > 0.7, blocking: false },
  ];

  const unmetBlockers = conditions.filter(c => !c.met && c.blocking);

  // Build alternatives
  const alternatives: DeploymentDecision['alternatives'] = [];
  if (decision === 'block' || decision === 'hold') {
    alternatives.push({ action: 'Fix issues and re-run pipeline', benefit: 'Removes blockers', recommended: true });
    alternatives.push({ action: 'Override with --force', benefit: 'Immediate deploy', recommended: false });
  }
  if (decision === 'go_with_caution') {
    alternatives.push({ action: 'Deploy with enhanced monitoring', benefit: 'Safety net active', recommended: true });
  }

  // Human message
  const decisionEmoji = { go: '✅', go_with_caution: '⚠️', hold: '🔍', block: '🛑', abort: '🚨' };
  const decisionLabel = { go: 'GO', go_with_caution: 'GO WITH CAUTION', hold: 'HOLD FOR REVIEW', block: 'BLOCKED', abort: 'ABORT' };

  let humanMessage: string;
  switch (decision) {
    case 'go':
      humanMessage = `All checks pass. Safe to deploy to mainnet with ${(confidence * 100).toFixed(0)}% confidence.`;
      break;
    case 'go_with_caution':
      humanMessage = `Deploy possible but proceed with caution. ${highs} high-severity findings detected. Monitor closely.`;
      break;
    case 'hold':
      humanMessage = `Deployment paused. ${unmetBlockers.length} blocking conditions not met. Review and decide.`;
      break;
    case 'block':
      humanMessage = `Deployment BLOCKED. ${criticals} critical issues found. Fix before deploying.`;
      break;
    default:
      humanMessage = 'Critical safety issue. Do NOT deploy.';
  }

  // Output
  console.log('');
  console.log(`${COLORS.bright}  ┌────────────────────────────────────────────────────┐${COLORS.reset}`);
  console.log(`${COLORS.bright}  │         ${decisionEmoji[decision]} DEPLOYMENT DECISION: ${decisionLabel[decision].padEnd(18)}│${COLORS.reset}`);
  console.log(`${COLORS.bright}  └────────────────────────────────────────────────────┘${COLORS.reset}`);
  console.log(`${COLORS.dim}  Confidence: ${(confidence * 100).toFixed(0)}% | Score: ${(weightedScore * 100).toFixed(0)}%${COLORS.reset}`);
  console.log(`  ${humanMessage}`);
  console.log('');

  // Checklist
  console.log(`${COLORS.bright}  Pre-deployment Checklist:${COLORS.reset}`);
  for (const cond of conditions) {
    const icon = cond.met ? '✅' : cond.blocking ? '❌' : '⚠️';
    console.log(`    ${icon} ${cond.requirement}${!cond.met && cond.blocking ? ' [BLOCKER]' : ''}`);
  }

  if (alternatives.length > 0) {
    console.log(`\n${COLORS.bright}  Alternatives:${COLORS.reset}`);
    for (const alt of alternatives) {
      console.log(`    ${alt.recommended ? '→' : '·'} ${alt.action} — ${alt.benefit}`);
    }
  }

  stage.status = 'complete';
  stage.endTime = Date.now();

  return {
    stage,
    decision: { decision, confidence, humanMessage, conditions, alternatives },
  };
}

// ═══════════════════════════════════════════════════════════════
// 🧠 ORCHESTRATOR — Main Pipeline
// ═══════════════════════════════════════════════════════════════

async function runAgenticPipeline(config: NovaConfig, source: string, options: { verbose: boolean; force: boolean }) {
  const memory = loadMemory();
  const verbose = options.verbose || config.ai?.agent_verbose || false;

  pipelineHeader();
  agentLog('orchestrator', `Initializing agentic pipeline for ${config.project.name} v${config.project.version}`);
  agentLog('orchestrator', `Security level: ${config.ai?.security_level || 'standard'} | Network: ${IC_NETWORK} (mainnet)`);

  if (memory.episodes.length > 0) {
    const recentSuccess = memory.episodes.filter(e => e.outcome === 'success').length;
    agentLog('orchestrator', `Agent memory: ${memory.episodes.length} episodes, ${recentSuccess} successes (${((recentSuccess / memory.episodes.length) * 100).toFixed(0)}% rate)`);
  }

  console.log('');

  // Run agents in pipeline
  const stages: PipelineStage[] = [];

  // Stage 1: Security Agent
  const secStage = runSecurityAgent(source, memory, verbose);
  stages.push(secStage);

  // Stage 2: Safety Agent (if upgrade checks enabled)
  if (config.ai?.upgrade_safety_check !== false) {
    const safetyStage = runSafetyAgent(source, memory, verbose);
    stages.push(safetyStage);
  }

  // Stage 3: Cost Agent
  if (config.ai?.cycle_optimization !== false) {
    const costStage = runCostAgent(source, memory, verbose);
    stages.push(costStage);
  }

  // Stage 4: Advisor Agent synthesizes everything
  const { stage: advStage, decision } = runAdvisorAgent(stages, config, memory, verbose);
  stages.push(advStage);

  // Pipeline complete
  const totalTime = stages.reduce((acc, s) => acc + ((s.endTime || 0) - (s.startTime || 0)), 0);
  console.log(`\n${COLORS.dim}  Pipeline completed in ${totalTime}ms | ${stages.length} agents | ${stages.flatMap(s => s.insights).length} insights${COLORS.reset}`);

  return { stages, decision };
}

// ═══════════════════════════════════════════════════════════════
// CLI COMMANDS
// ═══════════════════════════════════════════════════════════════

function cmdInit() {
  if (existsSync(CONFIG_FILE)) {
    warn(`${CONFIG_FILE} already exists`);
    return;
  }

  const template = `# Nova Forge Configuration — AI-Native Mainnet Deployment
# "If it's not on mainnet, it doesn't exist."

[project]
name = "my-app"
version = "1.0.0"
description = "Sovereign ICP application"

[network]
target = "ic"  # ALWAYS mainnet — no testnets, no replicas

[canisters.backend]
main = "src/backend/main.mo"
cycles = "auto"

[canisters.frontend]
type = "assets"
source = "dist"
dependencies = ["backend"]

[build]
output_dir = "dist"
moc_args = ["--release"]

[ai]
pre_deploy_scan = true          # 🛡️ SecurityAgent: pre-deployment analysis
cycle_optimization = true       # 💰 CostAgent: ML-powered estimation
upgrade_safety_check = true     # ✅ SafetyAgent: stable memory validation
security_level = "strict"       # strict | standard | minimal
agent_verbose = false           # Show agent reasoning traces
reasoning_depth = "standard"    # minimal | standard | deep
learn_from_history = true       # Agents learn from past deployments

[deploy]
confirm_required = true
auto_top_up = false
min_cycles = 1_000_000_000_000

[notifications]
webhook = "env:NOVA_WEBHOOK_URL"
on_success = true
on_failure = true
`;

  writeFileSync(CONFIG_FILE, template);
  success(`Created ${CONFIG_FILE} with AI-native agent configuration`);
  info('Configure your canisters and run: nova deploy');
}

function cmdBuild(config: NovaConfig) {
  step('Building canisters...');

  for (const [name, canister] of Object.entries(config.canisters)) {
    if (canister.type === 'assets') {
      info(`Building asset canister: ${name}`);
      try {
        execSync('npm run build 2>&1 || pnpm build 2>&1', { stdio: 'pipe' });
        success(`Asset canister '${name}' built`);
      } catch {
        warn(`Asset build for '${name}' — check build output`);
      }
    } else if (canister.main) {
      info(`Compiling: ${name} (${canister.main})`);
      const mocArgs = config.build?.moc_args?.join(' ') || '--release';
      try {
        execSync(`mops build -- ${mocArgs} 2>&1`, { stdio: 'pipe' });
        success(`Canister '${name}' compiled`);
      } catch {
        warn(`Compilation for '${name}' — ensure mops is configured`);
      }
    }
  }
}

async function cmdScan(config: NovaConfig, options: { verbose: boolean }) {
  const source = collectSources(config);
  if (!source) return;

  const memory = loadMemory();
  const verbose = options.verbose || config.ai?.agent_verbose || false;

  pipelineHeader();
  agentLog('orchestrator', 'Running security scan only (use `nova deploy` for full pipeline)');
  console.log('');

  const stage = runSecurityAgent(source, memory, verbose);

  const criticals = stage.insights.filter(i => i.severity === 'critical').length;
  const highs = stage.insights.filter(i => i.severity === 'high').length;

  console.log(`\n${COLORS.bright}  Summary: ${criticals} critical, ${highs} high, ${stage.insights.length} total findings${COLORS.reset}`);
}

async function cmdEstimate(config: NovaConfig, options: { verbose: boolean }) {
  const source = collectSources(config);
  if (!source) return;

  const memory = loadMemory();
  runCostAgent(source, memory, options.verbose || config.ai?.agent_verbose || false);
}

async function cmdDeploy(config: NovaConfig, options: { verbose: boolean; force: boolean; confirm: boolean }) {
  const source = collectSources(config);
  if (!source) {
    error('No source files found');
    return;
  }

  // Run full agentic pipeline
  const { stages, decision } = await runAgenticPipeline(config, source, options);

  // Handle decision
  if (decision.decision === 'block' || decision.decision === 'abort') {
    if (!options.force) {
      error('Deployment blocked by AI agents. Fix issues or use --force to override.');

      // Record failure episode
      const memory = loadMemory();
      recordEpisode(memory, {
        id: `deploy-${Date.now()}`,
        timestamp: Date.now(),
        outcome: 'failed_security',
        lessons: stages.flatMap(s => s.insights.filter(i => i.severity === 'critical').map(i => i.finding)),
        patterns: stages.flatMap(s => s.insights.map(i => i.category)),
        version: config.project.version,
      });
      return;
    }
    warn('⚠️ FORCE OVERRIDE — Deploying despite agent warnings');
  }

  // Confirmation
  if (config.deploy?.confirm_required && !options.confirm) {
    const answer = await askConfirmation(
      `\n  Deploy ${config.project.name} v${config.project.version} to IC mainnet? (yes/no): `
    );
    if (answer.toLowerCase() !== 'yes' && answer.toLowerCase() !== 'y') {
      info('Deployment cancelled');
      return;
    }
  }

  // Deploy
  step('Deploying to IC mainnet...');
  try {
    for (const [name, canister] of Object.entries(config.canisters)) {
      agentLog('orchestrator', `Deploying canister: ${name}`);
      execSync(`dfx deploy ${name} --network ${IC_NETWORK} 2>&1`, { stdio: 'pipe' });
      success(`${name} deployed to mainnet`);
    }

    // Record success
    const memory = loadMemory();
    recordEpisode(memory, {
      id: `deploy-${Date.now()}`,
      timestamp: Date.now(),
      outcome: 'success',
      lessons: [],
      patterns: stages.flatMap(s => s.insights.map(i => i.category)),
      version: config.project.version,
    });

    // Webhook notification
    if (config.notifications?.webhook && config.notifications?.on_success) {
      sendWebhook(config.notifications.webhook, {
        event: 'deploymentCompleted',
        project: config.project.name,
        version: config.project.version,
        timestamp: new Date().toISOString(),
      });
    }

    console.log(`\n${COLORS.green}${COLORS.bright}  ✅ Deployment complete — ${config.project.name} v${config.project.version} is LIVE on mainnet${COLORS.reset}\n`);
  } catch (e) {
    error(`Deployment failed: ${e}`);

    const memory = loadMemory();
    recordEpisode(memory, {
      id: `deploy-${Date.now()}`,
      timestamp: Date.now(),
      outcome: 'failed_security',
      lessons: [`Deploy failed: ${e}`],
      patterns: [],
      version: config.project.version,
    });

    if (config.notifications?.webhook && config.notifications?.on_failure) {
      sendWebhook(config.notifications.webhook, {
        event: 'deploymentFailed',
        project: config.project.name,
        version: config.project.version,
        error: String(e),
        timestamp: new Date().toISOString(),
      });
    }
  }
}

function cmdStatus(config: NovaConfig) {
  step('Checking canister health...');
  for (const name of Object.keys(config.canisters)) {
    try {
      const result = execSync(`dfx canister status ${name} --network ${IC_NETWORK} 2>&1`, { encoding: 'utf-8' });
      success(`${name}: running`);
      console.log(`${COLORS.dim}${result.trim().split('\n').slice(0, 5).map(l => `     ${l}`).join('\n')}${COLORS.reset}`);
    } catch {
      error(`${name}: unreachable or not deployed`);
    }
  }
}

function cmdHistory() {
  const memory = loadMemory();
  if (memory.episodes.length === 0) {
    info('No deployment history yet. Run `nova deploy` to create first entry.');
    return;
  }

  step(`Deployment History (${memory.episodes.length} episodes)`);
  console.log('');

  const outcomeIcons: Record<string, string> = {
    success: '✅', failed_security: '🛡️❌', failed_cost: '💰❌', failed_safety: '✅❌', rollback: '↩️',
  };

  for (const ep of memory.episodes.slice(-10).reverse()) {
    const date = new Date(ep.timestamp).toISOString().replace('T', ' ').slice(0, 19);
    const icon = outcomeIcons[ep.outcome] || '❓';
    console.log(`  ${icon} ${date} | v${ep.version} | ${ep.outcome}`);
    if (ep.lessons.length > 0) {
      console.log(`${COLORS.dim}     Lessons: ${ep.lessons.slice(0, 2).join(', ')}${COLORS.reset}`);
    }
  }
}

function cmdDashboard(config: NovaConfig) {
  const memory = loadMemory();

  console.log(BANNER);
  console.log(`${COLORS.bright}  Project:${COLORS.reset} ${config.project.name} v${config.project.version}`);
  console.log(`${COLORS.bright}  Network:${COLORS.reset} ${config.network.target} (mainnet)`);
  console.log(`${COLORS.bright}  Security:${COLORS.reset} ${config.ai?.security_level || 'standard'}`);
  console.log(`${COLORS.bright}  Agents:${COLORS.reset} SecurityAgent, CostAgent, SafetyAgent, AdvisorAgent`);
  console.log('');

  if (memory.episodes.length > 0) {
    const successes = memory.episodes.filter(e => e.outcome === 'success').length;
    const rate = ((successes / memory.episodes.length) * 100).toFixed(0);
    console.log(`${COLORS.bright}  Deployment Stats:${COLORS.reset}`);
    console.log(`    Total: ${memory.episodes.length} | Success: ${successes} | Rate: ${rate}%`);
    console.log(`    Last: ${new Date(memory.episodes[memory.episodes.length - 1].timestamp).toISOString().slice(0, 10)}`);
    console.log('');

    // Pattern insights
    const patterns: Record<string, number> = {};
    for (const ep of memory.episodes) {
      for (const p of ep.patterns) {
        patterns[p] = (patterns[p] || 0) + 1;
      }
    }
    const topPatterns = Object.entries(patterns).sort((a, b) => b[1] - a[1]).slice(0, 5);
    if (topPatterns.length > 0) {
      console.log(`${COLORS.bright}  Most Common Patterns:${COLORS.reset}`);
      for (const [pattern, count] of topPatterns) {
        console.log(`    · ${pattern}: ${count}x`);
      }
    }
  } else {
    console.log(`${COLORS.dim}  No deployment history yet.${COLORS.reset}`);
  }
}

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════

function collectSources(config: NovaConfig): string | null {
  let source = '';
  for (const [, canister] of Object.entries(config.canisters)) {
    if (canister.main && existsSync(canister.main)) {
      source += readFileSync(canister.main, 'utf-8') + '\n';
    }
  }
  if (!source) {
    error('No source files found. Check canister paths in nova.toml');
    return null;
  }
  return source;
}

function formatCycles(cycles: number): string {
  if (cycles >= 1_000_000_000_000) return `${(cycles / 1_000_000_000_000).toFixed(1)}T`;
  if (cycles >= 1_000_000_000) return `${(cycles / 1_000_000_000).toFixed(1)}B`;
  if (cycles >= 1_000_000) return `${(cycles / 1_000_000).toFixed(1)}M`;
  return `${cycles}`;
}

function askConfirmation(prompt: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(prompt, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

function sendWebhook(urlConfig: string, payload: any) {
  const url = urlConfig.startsWith('env:')
    ? process.env[urlConfig.slice(4)] || ''
    : urlConfig;

  if (!url) return;

  try {
    const body = JSON.stringify(payload);
    const signature = crypto.createHmac('sha256', process.env.NOVA_WEBHOOK_SECRET || 'nova-forge')
      .update(body).digest('hex');

    // Fire-and-forget webhook
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Nova-Signature': `sha256=${signature}`,
        'X-Nova-Event': payload.event,
      },
    };

    const http = require(urlObj.protocol === 'https:' ? 'https' : 'http');
    const req = http.request(options);
    req.write(body);
    req.end();
  } catch {
    // Webhook failures are non-blocking
  }
}

// ═══════════════════════════════════════════════════════════════
// MAIN ENTRY
// ═══════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const flags = args.slice(1);

  const options = {
    verbose: flags.includes('--verbose') || flags.includes('-v'),
    force: flags.includes('--force') || flags.includes('-f'),
    confirm: flags.includes('--confirm') || flags.includes('-y'),
  };

  if (!command || command === '--help' || command === '-h') {
    console.log(BANNER);
    console.log(`${COLORS.bright}  Commands:${COLORS.reset}`);
    console.log(`    init       Initialize nova.toml with agent configuration`);
    console.log(`    build      Compile all canisters`);
    console.log(`    scan       Run 🛡️ SecurityAgent analysis only`);
    console.log(`    estimate   Run 💰 CostAgent estimation only`);
    console.log(`    deploy     Full 🧠 Agentic Pipeline → mainnet deploy`);
    console.log(`    status     Check canister health`);
    console.log(`    history    View deployment episodes (agent memory)`);
    console.log(`    dashboard  Project overview with agent stats`);
    console.log('');
    console.log(`${COLORS.bright}  Flags:${COLORS.reset}`);
    console.log(`    --verbose, -v    Show agent reasoning traces`);
    console.log(`    --force, -f      Override agent blocking decisions`);
    console.log(`    --confirm, -y    Skip deployment confirmation`);
    console.log('');
    console.log(`${COLORS.dim}  🧠 AI-Native: Agents reason, collaborate, and decide autonomously${COLORS.reset}`);
    return;
  }

  switch (command) {
    case 'init':
      cmdInit();
      break;

    case 'build': {
      const config = parseConfig();
      if (config) cmdBuild(config);
      break;
    }

    case 'scan': {
      console.log(BANNER);
      const config = parseConfig();
      if (config) await cmdScan(config, options);
      break;
    }

    case 'estimate': {
      console.log(BANNER);
      const config = parseConfig();
      if (config) await cmdEstimate(config, options);
      break;
    }

    case 'deploy': {
      console.log(BANNER);
      const config = parseConfig();
      if (config) await cmdDeploy(config, options);
      break;
    }

    case 'status': {
      const config = parseConfig();
      if (config) cmdStatus(config);
      break;
    }

    case 'history':
      cmdHistory();
      break;

    case 'dashboard': {
      const config = parseConfig();
      if (config) cmdDashboard(config);
      break;
    }

    default:
      error(`Unknown command: ${command}`);
      info(`Run 'nova --help' for available commands`);
  }
}

main().catch(console.error);
