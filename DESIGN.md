# Design System

## Color Palette

OKLCH throughout. No hex values.

### Light Mode (Default)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `oklch(1.000 0.000 0)` | Page background — pure white |
| `--surface` | `oklch(0.985 0.002 355)` | Cards, panels, elevated sections |
| `--ink` | `oklch(0.145 0.012 355)` | Body text — near-black with brand warmth |
| `--ink-secondary` | `oklch(0.450 0.015 355)` | Secondary text, captions |
| `--primary` | `oklch(0.636 0.218 355)` | Brand red — CTAs, accents, emphasis |
| `--primary-hover` | `oklch(0.580 0.218 355)` | Hover state — deeper red |
| `--accent` | `oklch(0.650 0.150 250)` | Electric blue — links, badges, tech accent |
| `--muted` | `oklch(0.650 0.020 355)` | Muted text — 3.5:1 contrast minimum |
| `--border` | `oklch(0.920 0.005 355)` | Subtle borders, dividers |

### Dark Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `oklch(0.080 0.000 0)` | Page background — near-black |
| `--surface` | `oklch(0.130 0.005 355)` | Cards, panels |
| `--ink` | `oklch(0.950 0.005 355)` | Body text — near-white |
| `--ink-secondary` | `oklch(0.650 0.015 355)` | Secondary text |
| `--primary` | `oklch(0.700 0.218 355)` | Brand red — slightly brighter for dark bg |
| `--primary-hover` | `oklch(0.750 0.218 355)` | Hover state |
| `--accent` | `oklch(0.750 0.150 250)` | Electric blue — brighter for dark bg |
| `--muted` | `oklch(0.550 0.020 355)` | Muted text |
| `--border` | `oklch(0.220 0.010 355)` | Borders |

### Color Strategy

**Committed** — The primary red carries 30-40% of brand identity. Used for CTAs, section accents, hover states, and emphasis. The electric blue accent provides tech credibility and visual variety without competing.

### Text on Color Rules

- White text on `--primary` fills (L 0.636, chroma 0.218) — saturated mid-luminance
- White text on `--accent` fills (L 0.650, chroma 0.150) — saturated mid-luminance
- `--ink` text on `--surface` backgrounds — high contrast
- Never use dark text on saturated fills

## Typography

### Font Stack

| Role | Font | Fallback |
|------|------|----------|
| Display | `Geist` | `Inter`, system-ui, sans-serif |
| Body | `Geist` | `Inter`, system-ui, sans-serif |
| Mono | `Geist Mono` | `JetBrains Mono`, monospace |

**Why Geist:** Clean, modern, excellent for both Chinese and Latin characters. Neutral enough for technical content, distinctive enough for display.

### Scale

| Level | Size | Weight | Tracking | Line Height |
|-------|------|--------|----------|-------------|
| Display H1 | `clamp(2.5rem, 5vw, 4.5rem)` | 800 | `-0.03em` | 1.1 |
| H2 | `clamp(1.75rem, 3vw, 2.75rem)` | 700 | `-0.02em` | 1.2 |
| H3 | `clamp(1.25rem, 2vw, 1.75rem)` | 600 | `-0.01em` | 1.3 |
| Body | `1rem` (16px) | 400 | `0` | 1.6 |
| Small | `0.875rem` (14px) | 400 | `0` | 1.5 |
| Mono | `0.875rem` | 400 | `0` | 1.6 |

### Heading Rules

- Use `text-wrap: balance` on h1-h3
- Use `text-pretty` on body paragraphs
- Max 2 lines for hero headline
- Max 20 words for hero subtext
- No all-caps except short labels (≤4 words)

## Spacing Scale

| Token | Value |
|-------|-------|
| `--space-xs` | `0.25rem` (4px) |
| `--space-sm` | `0.5rem` (8px) |
| `--space-md` | `1rem` (16px) |
| `--space-lg` | `1.5rem` (24px) |
| `--space-xl` | `2rem` (32px) |
| `--space-2xl` | `3rem` (48px) |
| `--space-3xl` | `4rem` (64px) |
| `--space-4xl` | `6rem` (96px) |
| `--space-section` | `clamp(4rem, 8vw, 8rem)` |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Small elements, badges |
| `--radius-md` | `12px` | Cards, inputs, buttons |
| `--radius-lg` | `16px` | Large cards, modals |
| `--radius-full` | `9999px` | Pills, avatar circles |

**Consistency:** All interactive elements use `--radius-md`. All cards use `--radius-lg`. No mixing.

## Shadows

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 1px 2px oklch(0 0 0 / 0.05)` |
| `--shadow-md` | `0 4px 12px oklch(0 0 0 / 0.08)` |
| `--shadow-lg` | `0 8px 24px oklch(0 0 0 / 0.12)` |
| `--shadow-xl` | `0 16px 48px oklch(0 0 0 / 0.16)` |

All shadows tinted toward brand hue in dark mode.

## Motion

### Principles

- **Intentional:** Every animation communicates hierarchy, storytelling, or feedback
- **Respectful:** Honor `prefers-reduced-motion` — degrade to crossfade or instant
- **Hardware-only:** Animate only `transform` and `opacity`

### Timing

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `150ms` | Hover states, button press |
| `--duration-normal` | `300ms` | Page transitions, reveals |
| `--duration-slow` | `500ms` | Complex orchestrations |

### Easing

- Entrance: `ease-out` with cubic-bezier(0.16, 1, 0.3, 1)
- Exit: `ease-in` with cubic-bezier(0.7, 0, 0.84, 0)
- Spring (for playful): `type: "spring", stiffness: 100, damping: 20`

### Animation Library

- **Framer Motion** (`motion/react`) for React components
- **GSAP** for complex scroll-triggered animations (pinned sections, horizontal scroll)
- CSS transitions for simple hover states

## Icons

- **Library:** `@phosphor-icons/react`
- **Stroke width:** 1.5 (consistent)
- **Size scale:** 16px, 20px, 24px, 32px
- **Usage:** Icon-only buttons require `aria-label`

## Z-Index Scale

| Level | Value | Usage |
|-------|-------|-------|
| `--z-base` | `0` | Default |
| `--z-dropdown` | `100` | Dropdowns, popovers |
| `--z-sticky` | `200` | Sticky navigation |
| `--z-modal-backdrop` | `300` | Modal overlays |
| `--z-modal` | `400` | Modal content |
| `--z-toast` | `500` | Toast notifications |
| `--z-tooltip` | `600` | Tooltips |

No arbitrary z-index values.

## Layout

- Max content width: `1400px`
- Container padding: `clamp(1rem, 4vw, 2rem)`
- Section spacing: `clamp(4rem, 8vw, 8rem)`
- Grid: CSS Grid for 2D layouts, Flexbox for 1D
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`

## Component Patterns

### Buttons

```
Primary: bg --primary, text white, radius --radius-md, padding 12px 24px
Secondary: border --primary, text --primary, bg transparent
Ghost: text --ink, hover bg --surface
```

### Cards

```
bg --surface, border 1px --border, radius --radius-lg, padding --space-xl
Hover: shadow --shadow-lg, translate-y -2px
```

### Inputs

```
bg --bg, border 1px --border, radius --radius-md, padding 12px 16px
Focus: border --primary, ring 2px --primary/20
Label: above input, text --ink-secondary
Error: below input, text --primary
```
