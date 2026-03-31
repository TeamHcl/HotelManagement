---
name: debug-issue
description: Use this skill when the user asks to analyze stack traces, fix bugs, resolve runtime/compilation errors, or debug unexpected behavior. For frontend UI bugs, follow shadcn/ui patterns and reference docs first.
---
# Objective
Systematically diagnose and resolve issues without violating the workspace's modular architecture or destabilizing shared components.

## Frontend UI Debug Rules
- For UI defects, first check `.github/references/shadcn-ui-components.md` and verify component usage matches official patterns.
- Keep shared primitive fixes in `src/components/ui/` and feature-specific fixes in `src/features/<feature-name>/components/`.
- Do not patch UI behavior with one-off overrides when an existing shadcn pattern solves the issue.

## Debugging Strategy
1. **Analyze:** Review the provided stack trace, error message, or bug description.
2. **Isolate:** Pinpoint exactly which module (e.g., admin, doctor, patient) and layer (controller, service, repository) contains the fault.
3. **Fix Local First:** Confine the fix entirely within the boundaries of the affected module.
4. **Escalate Configs:** If the root cause is in `src/common/` (config, security, utils), warn the user before suggesting changes, as it impacts the whole system.

## Strict Rules for Fixes
- **No Cross-Module Pollution:** DO NOT introduce cross-module dependencies just to bypass an issue. Feature A cannot directly call Feature B's database repository.
- **No Hacks:** Avoid temporary band-aids. Address the actual logical or architectural flaw.   
- **Isolate Side Effects:** Ensure the fix does not break existing, working endpoints.

## Output Format
1. **Root Cause:** A 1-2 sentence explanation of *why* it broke.
2. **The Fix:** The specific code to replace/add.
3. **Next Step:** Suggest adding a targeted log or test if the bug was highly edge-case.