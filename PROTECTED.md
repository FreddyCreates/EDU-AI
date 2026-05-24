# 🛡️ PROTECTED FILES - DO NOT DELETE

## Purpose
This document defines files and directories that are **PROTECTED** and must **NEVER** be deleted by automated tools, agents, or pull requests.

## Protected Paths

| Path | Reason |
|------|--------|
| `src/frontend/dist/` | Production build output - deployed application |
| `dist/` | Build artifacts |
| `build/` | Build artifacts |

## Rules

### ❌ NEVER
- Delete files from protected paths
- Remove entire protected directories
- "Clean up" build folders without rebuilding

### ✅ ALLOWED
- Add new files to protected paths
- Update files (modification, not deletion)
- Replace files (delete + add in same commit with rebuild)

## Protection Mechanisms

1. **GitHub Workflow** (`.github/workflows/protect-deployed.yml`)
   - Runs on every PR to main/master
   - Blocks merge if protected files are deleted

2. **CODEOWNERS** (`.github/CODEOWNERS`)
   - Requires @FreddyCreates approval for protected path changes

3. **Pre-commit Hook** (`.husky/pre-commit`)
   - Blocks local commits that delete protected files

## History

- **2026-05-24**: Protection system created after Copilot deleted 114,000+ lines from `src/frontend/dist/`

---

**THIS FILE IS PART OF THE PROTECTION SYSTEM. DO NOT DELETE.**
