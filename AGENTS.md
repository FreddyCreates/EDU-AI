# Project Guidance

## User Preferences

- Sovereign architecture — all data stays inside EduAI, no external APIs except standards metadata
- Geometric consistency — all layouts follow PHI grid and Fibonacci spacing
- Multi-substrate readiness — new layers designed to run on ICP, Julia, and EduAI native runtimes
- Architecture council (COGT+META+AUTN) always answers with multiple paths + a novel answer
- Full glassmorphism across all pages — dark obsidian + gold, OKLCH colors
- Mobile-first for Student and Teacher portals, desktop-first for Admin/Principal/District/IT
- No demo accounts — Internet Identity only
- Parent and Counselor portals are mobile-first; District portal is desktop-only
- 7 total portals: Student, Teacher, Principal/Admin, IT/System, Parent, Counselor, District

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

### Motoko Backend Patterns
- `List.List` does not have `.vals()` or `.size()` — use `List.toArray(list)` to get an array first, then iterate
- `Map.foldLeft` has unusual type arg ordering — avoid it entirely; use `for` loops with `Map.entries()` instead
- `List.foldLeft` needs TWO type args: `List.foldLeft<ElementType, AccumulatorType>(list, init, func)` — both are required
- `Map` uses dot notation: `map.get(key)`, `map.add(key, val)`, `map.entries()` — not functional-style wrappers
- `list.add(item)` mutates in place and returns `unit` — do NOT capture its return value (it is not a new list)
- Motoko mixins: some are self-contained (`mixin()` with no params) while others take store params — always match the `include` call to the actual mixin function signature
- Prefer `Array.tabulate`, `Array.map`, `Array.filter` over manual for-loop accumulation when working with arrays
- When converting `List.List` to `[T]` for response: `List.toArray(myList)` — never try to iterate a List directly in a for-of loop

### Frontend Patterns
- All OKLCH color tokens must be defined in `:root` in `index.css` — never use raw `bg-white`, `bg-gray-*`, or inline styles
- Glassmorphism: `backdrop-blur-md bg-white/5 border border-white/10` pattern works across all card surfaces
- Mobile-first portals (Student, Teacher, Parent) use bottom navigation; desktop portals (IT, District) use sidebar nav
- PHI spacing scale: prefer Fibonacci pixel values (5, 8, 13, 21, 34, 55, 89) for padding/gap/margin
- `motion/react` (`whileInView` + `viewport={{ once: true }}`) for entrance animations; stagger children with `delay: index * 0.1`
- IAS layout state drives component density — STRUGGLE=calm/large, SOVEREIGN=minimal/dense
- Full platform memo lives at `src/frontend/public/MEMO.md` — update after every major build

### Architecture Council Rule
- COGT + META + AUTN always return multiple paths + one novel answer they generated autonomously
- Never return a single answer — the council law is enforced at the protocol level
- When the user says "architecture will answer" — produce 3+ paths and ship all of them
