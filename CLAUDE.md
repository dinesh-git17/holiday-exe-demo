# CLAUDE.md — Engineering Contract

**Project:** Holiday EXE Demo (Showcase Site)
**Stack:** Next.js 16+ (App Router), TypeScript 5+ (strict), Tailwind CSS 4+, Framer Motion
**Domain:** holiday-exe.dineshd.dev

---

## 1. Non-Negotiable Rules

### 1.1 TypeScript

- `strict: true` is immutable — no silencing errors via config
- `any` is banned — use `unknown` if type genuinely unknown
- All functions: explicit return types and parameter types
- Props interfaces: exported and named `{ComponentName}Props`
- `as` assertions require inline comment justification — never use `as any`

### 1.2 Code Cleanliness

- **No console.log** — ESLint will fail (except in explicit debug builds)
- **No inline styles** — Tailwind or Framer Motion `style` prop only
- **No commented-out code** — delete it, git history exists
- **No magic numbers** — use Tailwind scale, named constants, or config variables

### 1.3 Scroll & Animation UX

- **Scroll-driven animations:** Use Framer Motion scroll triggers or GSAP ScrollTrigger
- **Performance:** Animate `transform` and `opacity` only. Avoid layout properties
- **Mobile-first:** All designs start mobile, scale up
- **Touch Targets:** Interactive elements min 44x44px

### 1.4 Assets & Performance

- **Asset Loading:** Lazy load videos and heavy assets
- **Image Optimization:** Use `next/image` for static assets
- **Bundle limits:** Keep initial load lightweight
- **Video placeholders:** Show loading state while videos buffer

### 1.5 AI Attribution (Strictly Forbidden)

- Never mention "Claude", "AI", "assistant", "generated", "Anthropic" in commits, PRs, or code
- Write commit messages as human developer — no AI attribution comments
- Pre-commit hooks enforce this

---

## 2. Git Workflow

### 2.1 Branch Flow

```bash
git checkout main && git pull origin main    # Always start fresh
# Make changes, then create branch BEFORE committing:
git checkout -b feature/descriptive-name
```

### 2.2 Commit Format (Conventional Commits)

```
<type>(<scope>): <subject>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
**Scopes:** `hero`, `showcase`, `phone`, `scroll`, `ui`, `assets`, `config`

```bash
git commit -m "feat(showcase): implement scroll-driven phase transitions"
```

### 2.3 Branch Naming

| Prefix      | Purpose                |
| ----------- | ---------------------- |
| `feature/`  | New functionality      |
| `fix/`      | Bug fixes              |
| `assets/`   | Asset updates (videos) |
| `refactor/` | Code refactoring       |

Rules: lowercase, hyphens, descriptive (not `feature/update`)

### 2.4 Branch Protection

- PR required, 1 reviewer (Self-review acceptable if solo), squash merge only
- CI must pass (lint, type-check, build)
- Never commit/force-push to main

---

## 3. Code Quality

### 3.1 Automated Checks

**Pre-commit:** ESLint, Prettier, TypeScript (staged files)
**CI:** ESLint (zero warnings), type-check, build

### 3.2 Rules

- Zero ESLint warnings in CI — no `eslint-disable` without justification
- Prettier config is immutable — run `npm run format` before commit
- No `@ts-ignore` without inline justification
- Build must pass locally before push

---

## 4. Component Standards

### 4.1 Structure

```typescript
import { motion } from 'framer-motion';

export interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className }: PhoneFrameProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("relative", className)}
    >
       {children}
    </motion.div>
  );
}
```

### 4.2 Rules

- **Framer Motion:** Use for all scroll animations and transitions
- **Composition:** Keep components small and focused
- Colocate related files: `components/showcase/PhaseCard.tsx`

---

## 5. Styling

- **Tailwind only** — no CSS modules or styled-components
- **Design Tokens:** Define colors in tailwind config (`matrix-green`, `showcase-dark`)
- **Z-Index Management:** Use a strict z-index scale
- **Class Order:** layout → box model → typography → visual → misc
- Use `prettier-plugin-tailwindcss` for automatic sorting

---

## 6. Naming Conventions

| Type             | Convention    | Example             |
| ---------------- | ------------- | ------------------- |
| Components       | PascalCase    | `PhoneFrame.tsx`    |
| Utilities        | camelCase     | `scrollProgress.ts` |
| Constants        | UPPER_SNAKE   | `PHASE_COUNT`       |
| Assets           | snake_case    | `phase_1_video.mp4` |
| Props interfaces | `{Name}Props` | `PhoneFrameProps`   |

---

## 7. Directory Structure

```
app/           # Next.js App Router
components/    # React components
  ui/          # Generic UI (Button, Modal)
  showcase/    # Showcase-specific (PhoneFrame, PhaseCard)
  effects/     # Visual effects (MatrixRain, ScrollProgress)
lib/           # Utilities, constants
public/        # Static assets
  assets/      # iPhone mockup, backgrounds
  videos/      # Phase walkthrough videos
```

- Use absolute imports: `@/components/showcase`
- Components: UI & Interaction only
- Utilities: Pure functions

---

## 8. Error Handling

- **Graceful Degradation:** If video fails to load, show fallback image
- **Asset Failures:** Show placeholder, don't crash
- **User-facing messages:** Themed errors

---

## 9. Enforcement

- CI failures block merge — no override
- Code must be reviewed (even self-reviewed)
- Verify scroll animations are smooth (60fps) on Chrome DevTools

---

**END OF DOCUMENT**

This is the engineering contract for the Holiday EXE Demo project. When in doubt, prioritize smooth scroll animations and visual polish.
