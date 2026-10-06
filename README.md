# CrosX Internal Panel (frontend only)

1. `npx create-next-app@latest crosx-panel --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`
2. `cd crosx-panel && npm i @tanstack/react-query @tanstack/react-table lucide-react next-themes clsx tailwind-merge`
3. Delete `src/app/favicon.ico`, copy `src/` and `public/` from this folder over the generated ones, then `npm run dev`.

- `src/lib/api.ts` is the only data integration point. Swap each function body for a real `fetch`; hooks and UI stay as they are.
- `src/app/globals.css` holds the design tokens (light and dark). Names match shadcn/ui, so `npx shadcn@latest add ...` inherits the theme.
- `public/brand/` has transparent cut-outs of the official logo (dark ink for light mode, light ink for dark mode, plus the X mark used as favicon).
- Currency and date formats live in `src/lib/utils.ts`.
