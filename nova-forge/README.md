# 🚀 Nova Forge

## Sovereign ICP Mainnet Build & Deploy System

> *"If it's not on mainnet, it doesn't exist."*

Nova Forge is a mainnet-first deployment system for the Internet Computer. No testnets. No local replicas. Direct to production with AI-powered safety checks.

---

## Philosophy

Nova Forge operates on a simple principle: **mainnet is the only truth**. Instead of relying on test environments that can never fully replicate production, Nova Forge builds confidence through:

- 🔍 **AI Security Scanning** - Pre-deployment vulnerability detection
- 💰 **Cycle Estimation** - Know your costs before you deploy
- ✅ **Upgrade Safety** - Stable memory validation
- 🎯 **Deployment Advisor** - Intelligent go/no-go recommendations

---

## Quick Start

### 1. Initialize Project

```bash
nova init
```

This creates `nova.toml` in your project root.

### 2. Configure Canisters

```toml
[project]
name = "my-app"
version = "1.0.0"

[network]
target = "ic"  # ALWAYS mainnet

[canisters.backend]
main = "src/backend/main.mo"
cycles = "auto"

[canisters.frontend]
type = "assets"
source = "dist"

[ai]
pre_deploy_scan = true
cycle_optimization = true
```

### 3. Build

```bash
nova build
```

### 4. Scan for Issues

```bash
nova scan
```

### 5. Estimate Costs

```bash
nova estimate
```

### 6. Deploy to Mainnet

```bash
nova deploy
```

Or skip confirmation:

```bash
nova deploy --confirm
```

---

## Commands

| Command | Description |
|---------|-------------|
| `nova init` | Initialize project with nova.toml |
| `nova build` | Compile all canisters |
| `nova scan` | Run AI security analysis |
| `nova estimate` | Calculate cycle costs |
| `nova deploy` | Build → Scan → Deploy to mainnet |
| `nova status` | Check canister health |
| `nova canisters` | List deployed canisters |

---

## Configuration Reference

### `[project]`

```toml
[project]
name = "my-app"          # Project name
version = "1.0.0"        # Semantic version
description = "..."      # Optional description
```

### `[network]`

```toml
[network]
target = "ic"  # Always "ic" for mainnet
```

### `[canisters.<name>]`

```toml
[canisters.backend]
main = "src/main.mo"     # Entry point for Motoko
cycles = "auto"          # "auto" or specific number
stable_check = "..."     # Path to .most file for upgrade checks

[canisters.frontend]
type = "assets"          # Asset canister
source = "dist"          # Build output directory
dependencies = ["backend"]
```

### `[build]`

```toml
[build]
output_dir = "dist"
moc_args = ["--release"]
```

### `[ai]`

```toml
[ai]
pre_deploy_scan = true       # Security scan before deploy
cycle_optimization = true    # AI cycle recommendations
upgrade_safety_check = true  # Validate stable memory
security_level = "strict"    # strict | standard | minimal
```

### `[deploy]`

```toml
[deploy]
confirm_required = true      # Require "yes" confirmation
auto_top_up = false          # Auto-refill cycles
min_cycles = 1_000_000_000_000  # Minimum cycles required
```

---

## AI Features

### Security Scanner

Nova Forge scans your Motoko code for common vulnerabilities:

| ID | Vulnerability | Severity |
|----|--------------|----------|
| NF-001 | Unrestricted controller access | Critical |
| NF-002 | Missing principal validation | High |
| NF-003 | Unbounded array growth | High |
| NF-004 | Stable memory migration risk | Critical |
| NF-005 | Potential trap on division | Medium |
| NF-006 | Async call without error handling | High |
| NF-007 | Cycles acceptance without limits | Medium |
| NF-008 | Open query endpoint | Low |

### Cycle Estimator

AI-powered cost prediction based on:

- WASM size analysis
- Function complexity
- Stable variable count
- Async call patterns
- Historical deployment data

### Deployment Advisor

Intelligent go/no-go recommendations:

- ✅ Ready for mainnet
- ⚠️ Proceed with caution
- 🛑 Deployment blocked

---

## Architecture

```
nova-forge/
├── core/
│   ├── builder.mo       # Build orchestration
│   ├── deployer.mo      # Mainnet deployment
│   ├── cycles.mo        # Cycle management
│   ├── history.mo       # Deployment history tracking (Phase 3)
│   └── webhooks.mo      # Webhook notifications (Phase 3)
├── ai/
│   ├── scanner.mo       # Security analysis
│   ├── estimator.mo     # Cost estimation
│   └── advisor.mo       # Recommendations
├── cli/
│   └── nova.ts          # CLI tool with history & dashboard
└── types/
    ├── config.mo        # Type definitions
    └── deployment.mo    # Deployment & webhook types (Phase 3)
```

---

## Phase 3: Dashboard & Webhooks

### Deployment History

Nova Forge tracks all deployments with full audit trails:

```bash
nova history
```

Shows:
- Deployment ID and version
- Timestamp and duration
- Status (success/failed)
- Canisters deployed
- Scan reports and cycle estimates

### Dashboard

Interactive dashboard showing:

```bash
nova dashboard
```

- Project info and configuration
- Deployment statistics and success rate
- Canister status and cycle balances
- AI configuration overview

### Webhook Notifications

Configure webhook notifications in `nova.toml`:

```toml
[notifications]
webhook = "env:NOVA_WEBHOOK_URL"
on_success = true
on_failure = true
```

Events:
- `deploymentStarted` - Deployment initiated
- `deploymentCompleted` - Successful deployment
- `deploymentFailed` - Deployment failed
- `scanCompleted` - Security scan finished
- `cycleWarning` - Low cycle balance alert

---

## Phase 4: EduAI Integration

### Native Nova Forge Support

Access Nova Forge directly from the EduAI platform:

- `/nova-forge` - Main dashboard
- `/admin/nova-forge` - Admin deployment panel

### Self-Deploy Capability

Request deployments from within the platform:

1. **Request Deploy** - Authorized users can request deployments
2. **Approval Flow** - Multi-signature approval for production deploys
3. **Automatic Deploy** - Optional auto-deploy for trusted CI/CD

### Configuration

```typescript
// Authorized deployers
addDeployer(principal);

// Configure approval requirements
configureSelfDeploy({
  autoEnabled: false,
  requiredApprovers: 2
});
```

---

## Security Levels

### Strict (Recommended for Production)

- All critical and high severity issues block deployment
- Upgrade compatibility required
- Full security scan mandatory

### Standard

- Critical issues block deployment
- High severity issues produce warnings
- Upgrade compatibility recommended

### Minimal

- Advisory only
- No blocking checks
- Use only for emergency deploys

---

## Best Practices

### 1. Always Run Scan Before Deploy

```bash
nova scan && nova deploy
```

### 2. Check Cycle Balance Regularly

```bash
nova status
```

### 3. Use Strict Security for Production

```toml
[ai]
security_level = "strict"
```

### 4. Document Stable Memory Schema

Keep `.most` files in version control for upgrade safety checks.

### 5. Set Appropriate Cycle Reserves

```toml
[deploy]
min_cycles = 1_000_000_000_000  # 1T minimum
```

---

## Comparison with Other Tools

| Feature | Nova Forge | DFX | Caffeine |
|---------|-----------|-----|----------|
| Mainnet only | ✅ | ❌ | ❌ |
| AI security scan | ✅ | ❌ | ❌ |
| Cycle estimation | ✅ | ❌ | ❌ |
| Upgrade safety | ✅ | Partial | ✅ |
| One-command deploy | ✅ | ❌ | ✅ |

---

## Troubleshooting

### "Config file not found"

Run `nova init` to create `nova.toml`.

### "Security scan failed"

Review the scan output and fix critical issues before deploying.

### "Insufficient cycles"

Top up your wallet or set `cycles = "auto"` for AI recommendations.

### "Deployment failed"

Check that you have:
- Valid identity configured
- Sufficient cycles
- Network connectivity to IC

---

## Contributing

Nova Forge is part of the EduAI project. Contributions welcome!

---

## License

MIT License - Use freely, deploy responsibly.

---

*Built with 💜 for the Internet Computer*
