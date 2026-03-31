---
name: commit-code
description: Use this skill to automatically analyze changes and execute the git commit in the terminal. For frontend UI work, keep commits aligned with shadcn/ui conventions.
---
# Objective
Analyze workspace changes and execute a git commit autonomously.

## Frontend UI Commit Rules
- If changes include `src/components/ui/` or feature UI compositions, ensure they follow `.github/references/shadcn-ui-components.md` guidance.
- Prefer scoped commit messages such as `feat(ui): ...` or `refactor(ui): ...` for shadcn-related work.
- Keep generated shadcn primitives and feature-level compositions logically separated when possible.

## Execution Steps (USE TERMINAL TOOL)
You must use your terminal execution tool to run these commands sequentially:
1. Run `git status` and `git diff` to analyze the changes.
2. Group the changes logically.
3. Generate a Conventional Commit message (e.g., `feat(auth): add login route`).
4. Execute `git add .`
5. Execute `git commit -m "<your generated message>"`

Do not just suggest the commands in chat. You must execute them in the terminal.