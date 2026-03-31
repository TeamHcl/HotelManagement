---
name: generate-feature
description: Use this skill when generating new code, frontend features, or architectural components. Enforce modular boundaries and prefer shadcn/ui components for UI work.
---
# Objective
Enforce strict modular architecture, minimize merge conflicts, and generate consistent frontend features using shadcn/ui by default.

## Global System Rules
- Never push directly to the main.
- Always use feature branches.
- Always follow the modular architecture defined below.
- Avoid modifying shared files unnecessarily.
- Prefer additive changes over destructive ones.

## Architecture Rules
- Each feature owns its folder.
- No cross-module edits.
- Feature → common is allowed.
- Feature → feature is NOT allowed.
- Shared configs should be edited cautiously.

## Code Generation Guidelines
- Always create files inside the relevant feature module (for frontend: `src/features/<feature-name>/...`).
- UI primitives belong in `src/components/ui/`; feature-specific compositions belong in `src/features/<feature-name>/components/`.
- Avoid modifying existing shared files when a new feature-local file is sufficient.
- Separate folders per feature to reduce merge conflicts.

## Frontend UI Rule (shadcn/ui First)
- For UI generation tasks, prefer shadcn/ui components over custom one-off UI.
- Always consult `.github/references/shadcn-ui-components.md` before creating or selecting a component.
- Reuse existing files in `src/components/ui/` before creating duplicates.
- If a requested component is missing, add it with shadcn CLI and keep naming consistent with shadcn defaults.
- Use `cn` utility patterns from `src/lib/utils.ts` for class composition.

## shadcn/ui Workflow
1. Check component availability in `.github/references/shadcn-ui-components.md`.
2. Add required components using shadcn CLI:
   - `npx shadcn@latest add <component-name>`
   - For batch setup: `npx shadcn@latest add button input label textarea card dialog dropdown-menu table tabs`
3. Keep generated component files under `src/components/ui/`.
4. Build feature-specific wrappers/compositions inside feature folders, not inside shared `ui` files.

## Quality Gates for Generated Frontend Features
- Maintain accessibility basics: proper labels, button types, keyboard support, and focus visibility.
- Ensure dark/light token compatibility with existing theme variables.
- Pass `npm run lint` and `npm run build` before finishing.