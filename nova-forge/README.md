# 🧠 Nova Forge — AI-Native Agentic Deployment

## Sovereign ICP Mainnet Build & Deploy System

> *"If it's not on mainnet, it doesn't exist."*

Nova Forge is a **mainnet-first, AI-agentic deployment system** for the Internet Computer. No testnets. No local replicas. Autonomous AI agents reason about your code, collaborate to assess risk, and produce intelligent deployment decisions with full reasoning traces.

---

## 🔥 What Makes It Different

| Feature | Traditional CI/CD | Nova Forge Agentic |
|---------|------------------|-------------------|
| Security | Static linters | 🛡️ **SecurityAgent** reasons about threats with chain-of-thought |
| Cost | Manual estimates | 💰 **CostAgent** uses ML prediction with historical learning |
| Safety | Manual testing | ✅ **SafetyAgent** simulates upgrade scenarios autonomously |
| Decisions | Human-only | 🎯 **AdvisorAgent** produces go/no-go with confidence scores |
| Coordination | Scripts | 🧠 **Orchestrator** manages multi-agent pipeline with memory |
| Learning | None | Agents learn from every deployment outcome |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    🧠 ORCHESTRATOR AGENT                      │
│         Coordinates pipeline • Synthesizes decisions         │
│         Manages memory • Learns from outcomes                │
├───────────────┬───────────────┬───────────────┬─────────────┤
│  🛡️ SECURITY  │   💰 COST     │   ✅ SAFETY   │  🎯 ADVISOR │
│    AGENT      │    AGENT      │    AGENT      │    AGENT    │
├───────────────┼───────────────┼───────────────┼─────────────┤
│ • 12 threat   │ • ML-weighted │ • Schema      │ • Weighted  │
│   vectors     │   prediction  │   extraction  │   scoring   │
│ • Compound    │ • Historical  │ • Upgrade     │ • Multi-    │
│   detection   │   learning    │   simulation  │   factor    │
│ • CWE mapping │ • 6 optimize  │ • Rollback    │   decision  │
│ • Confidence  │   categories  │   analysis    │ • Natural   │
│   scoring     │ • Runway calc │ • Hook check  │   language  │
└───────────────┴───────────────┴───────────────┴─────────────┘
          ↕ Inter-Agent Messages ↕ Shared Memory ↕
```

---

## Agent System

### 🛡️ Security Agent
Performs **deep security analysis with reasoning chains** — not just pattern matching.

- **12 threat vectors** with CWE mappings (expanded from 8)
- **Compound threat detection** — finds vulnerabilities that only emerge from combinations
- **Context-aware confidence** — adjusts findings based on code structure
- **Historical learning** — past security failures inform future analysis
- **Exploit complexity** rating for prioritization

### 💰 Cost Agent
**ML-powered cycle prediction** that learns from your deployment history.

- **Feature extraction** — WASM size, complexity, async patterns, stable vars
- **Weighted ML model** — trained on IC deployment cost data
- **Historical adjustment** — compares with similar past deployments
- **6 optimization categories** — compute, storage, network, caching, architecture, batching
- **Runway prediction** — estimates months until wallet depletion

### ✅ Safety Agent
**Autonomous upgrade safety validation** through simulation.

- **Schema extraction** — maps all stable memory fields
- **Change detection** — identifies breaking vs. compatible changes
- **Upgrade simulation** — predicts traps, data loss, and downtime
- **Hook validation** — ensures preupgrade/postupgrade are present
- **Migration guidance** — actionable recommendations for safe upgrades

### 🎯 Advisor Agent
**Autonomous decision-maker** that synthesizes all agent findings.

- **Multi-factor scoring** — security (35%), safety (30%), cost (15%), history (10%), timing (10%)
- **5 decision levels** — GO, GO WITH CAUTION, HOLD, BLOCK, ABORT
- **Confidence scores** — quantified certainty in every recommendation
- **Condition checklist** — explicit pass/fail for each requirement
- **Alternatives** — suggested actions for any non-GO decision
- **Natural language** — human-readable explanations of reasoning

### 🧠 Orchestrator
**Pipeline coordinator** with episodic memory.

- **Deployment memory** — records outcomes and lessons from every deploy
- **Pattern recognition** — identifies recurring issues across deployments
- **Agent coordination** — manages message flow and stage progression
- **Episode learning** — adjusts agent behavior based on past results

---

## Quick Start

### 1. Initialize

```bash
nova init
```

### 2. Deploy (Full Agentic Pipeline)

```bash
nova deploy
```

This runs:
1. 🛡️ SecurityAgent → Deep vulnerability analysis
2. ✅ SafetyAgent → Stable memory validation
3. 💰 CostAgent → ML cost prediction
4. 🎯 AdvisorAgent → Go/no-go decision
5. Deploy to mainnet (if approved)

### 3. See Agent Reasoning

```bash
nova deploy --verbose
```

Shows full chain-of-thought for each agent's decisions.

---

## Commands

| Command | Description |
|---------|-------------|
| `nova init` | Initialize nova.toml with agent config |
| `nova build` | Compile all canisters |
| `nova scan` | Run 🛡️ SecurityAgent only |
| `nova estimate` | Run 💰 CostAgent only |
| `nova deploy` | Full agentic pipeline → mainnet |
| `nova status` | Check canister health |
| `nova history` | View deployment episodes (agent memory) |
| `nova dashboard` | Project overview with agent stats |

### Flags

| Flag | Effect |
|------|--------|
| `--verbose, -v` | Show agent reasoning traces with confidence bars |
| `--force, -f` | Override agent blocking decisions |
| `--confirm, -y` | Skip deployment confirmation prompt |

---

## Configuration

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
pre_deploy_scan = true          # 🛡️ SecurityAgent
cycle_optimization = true       # 💰 CostAgent
upgrade_safety_check = true     # ✅ SafetyAgent
security_level = "strict"       # strict | standard | minimal
agent_verbose = false           # Show reasoning traces by default
reasoning_depth = "standard"    # minimal | standard | deep
learn_from_history = true       # Agents learn from past deployments

[deploy]
confirm_required = true
min_cycles = 1_000_000_000_000
```

---

## Agent Decision Output

When you run `nova deploy`, you see:

```
  ┌────────────────────────────────────────────────────┐
  │         🧠 AGENTIC DEPLOYMENT PIPELINE             │
  └────────────────────────────────────────────────────┘

  🧠 [ORCHESTRATOR] Initializing pipeline for edu-ai v1.0.0
  🧠 [ORCHESTRATOR] Security level: strict | Network: ic (mainnet)
  🧠 [ORCHESTRATOR] Agent memory: 12 episodes, 10 successes (83% rate)

  ┌─ 🛡️ SECURITY AGENT ─────────────────────────────────┐
  │ Deep security analysis with chain-of-thought reasoning│
  └──────────────────────────────────────────────────────┘
  🛡️ [SECURITY] Scanning against 12 vulnerability patterns...
     ⚡ [HIGH] [NF-003] Unbounded collection growth (5 occurrences)
        → Mitigate: Add size limits | Implement pagination
     ⚡ [MEDIUM] [NF-004] Stable variable — verify migration path
        → Mitigate: Document migration strategy | Use versioned types
  🛡️ [SECURITY] Analysis complete: MODERATE risk | 4 findings

  ┌─ ✅ SAFETY AGENT ─────────────────────────────────────┐
  │ Stable memory validation and upgrade safety analysis  │
  └──────────────────────────────────────────────────────┘
  ✅ [SAFETY] Verdict: ✅ Safe to upgrade

  ┌─ 💰 COST AGENT ──────────────────────────────────────┐
  │ ML-powered cycle estimation and optimization         │
  └──────────────────────────────────────────────────────┘
  💰 [COST] Install: 112.4B | Monthly: 2.1B | Year 1: 137.6B
  💰 [COST] 3 optimizations available — potential savings: 8.4B/year

  ┌─ 🎯 ADVISOR AGENT ───────────────────────────────────┐
  │ Autonomous go/no-go decision with full reasoning     │
  └──────────────────────────────────────────────────────┘

  ┌────────────────────────────────────────────────────┐
  │         ⚠️ DEPLOYMENT DECISION: GO WITH CAUTION    │
  └────────────────────────────────────────────────────┘
  Confidence: 82% | Score: 71%
  Deploy possible but proceed with caution. 2 high-severity findings.

  Pre-deployment Checklist:
    ✅ No critical vulnerabilities
    ✅ Upgrade will not trap
    ⚠️ No high severity findings (strict) [BLOCKER]
    ✅ Rollback path available
    ✅ Cost model confidence > 70%
```

---

## File Structure

```
nova-forge/
├── agents/
│   ├── runtime.mo          # Agent framework, types, reasoning engine
│   ├── orchestrator.mo     # Pipeline coordination & synthesis
│   ├── security-agent.mo   # 🛡️ Deep security analysis
│   ├── cost-agent.mo       # 💰 ML cost prediction
│   ├── safety-agent.mo     # ✅ Upgrade safety validation
│   └── advisor-agent.mo    # 🎯 Autonomous decision-making
├── ai/
│   ├── scanner.mo          # Legacy scanner (wrapped by SecurityAgent)
│   ├── estimator.mo        # Legacy estimator (wrapped by CostAgent)
│   └── advisor.mo          # Legacy advisor (wrapped by AdvisorAgent)
├── cli/
│   ├── nova.ts             # Legacy CLI
│   └── nova-agent.ts       # 🧠 Agentic CLI with streaming output
├── core/
│   ├── builder.mo          # Build orchestration
│   ├── deployer.mo         # Mainnet deployment
│   ├── cycles.mo           # Cycle management
│   ├── history.mo          # Deployment history
│   └── webhooks.mo         # Webhook notifications
└── types/
    ├── config.mo           # Configuration types
    └── deployment.mo       # Deployment & webhook types
```

---

## Security Levels

### Strict (Recommended)
- All critical AND high issues block deployment
- Full reasoning traces required for override
- Agent must achieve >85% confidence for GO

### Standard
- Critical issues block
- High issues produce caution/warnings
- >65% confidence threshold

### Minimal
- Advisory only for emergencies
- No automatic blocking
- Use with `--force` for emergency deploys

---

## Agent Memory

Nova Forge agents **learn from every deployment**:

```bash
nova history
```

```
  ✅ 2025-01-15 14:32:00 | v1.2.0 | success
  🛡️❌ 2025-01-14 09:15:00 | v1.1.9 | failed_security
     Lessons: [NF-003] Unbounded array in session store
  ✅ 2025-01-13 16:45:00 | v1.1.8 | success
```

The `.nova-memory.json` file stores:
- **Episodes** — full audit trail of every deployment attempt
- **Patterns** — commonly occurring vulnerability categories
- **Lessons** — actionable insights from past failures

Agents use this memory to:
- Adjust confidence scores based on historical patterns
- Flag recurring issues with higher urgency
- Improve cost predictions from actual deployment data
- Recommend timing based on past success rates

---

## Comparison

| Feature | Nova Forge 2.0 | DFX | Other Tools |
|---------|---------------|-----|-------------|
| Mainnet-first | ✅ | ❌ | ❌ |
| AI agents | ✅ 4 autonomous agents | ❌ | ❌ |
| Chain-of-thought | ✅ Full reasoning traces | ❌ | ❌ |
| ML cost prediction | ✅ With historical learning | ❌ | ❌ |
| Upgrade simulation | ✅ Autonomous safety agent | Partial | ❌ |
| Deployment memory | ✅ Episodic learning | ❌ | ❌ |
| Compound threats | ✅ Cross-finding analysis | ❌ | ❌ |
| Decision confidence | ✅ Quantified with factors | ❌ | ❌ |

---

## Philosophy

Nova Forge operates on the principle that **mainnet is the only truth** and **AI agents are better than checklists**.

Instead of static rules, Nova Forge deploys autonomous agents that:
- **Reason** about your code with chain-of-thought
- **Collaborate** through structured inter-agent messages
- **Decide** with quantified confidence and explicit factors
- **Learn** from every deployment outcome
- **Explain** their decisions in natural language

The result: deployment confidence through intelligence, not through test environments that can never fully replicate production.

---

*Built with 💜 for the Internet Computer — Agentic AI meets Sovereign Infrastructure*
