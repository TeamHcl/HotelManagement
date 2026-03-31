---
applyTo: "src/**/*.tsx"
description: "Use for frontend UI implementation and updates. Enforce shadcn/ui-first component selection and feature-folder composition rules."
---

# Frontend UI Instruction

- Consult `.github/references/shadcn-ui-components.md` before generating UI.
- Prefer existing shadcn primitives in `src/components/ui/`.
- If missing, add via `npx shadcn@latest add <component-name>`.
- Keep feature-specific compositions in `src/features/<feature-name>/components/`.
- Avoid ad-hoc utility duplication; use `cn` from `src/lib/utils.ts`.
- Preserve accessibility defaults (labels, keyboard support, focus-visible states).
