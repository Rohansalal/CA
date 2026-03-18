# Admin Panel Redesign: Style Guide & Design System

## 1. Visual Identity
The goal is to shift the admin panel's aesthetic from a "Cyber/Security" theme to a "Modern Financial/Enterprise" look. This involves more balanced typography, refined color usage, and a cleaner, data-centric layout.

---

## 2. Color Palette
Refined color palette focused on trust, stability, and professionalism.

| Category | Color Name | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Enterprise Blue | `#0F172A` | Sidebars, main headers, primary actions |
| **Secondary** | Indigo Glow | `#6366F1` | Active states, focus indicators, subtle accents |
| **Success** | Emerald Trust | `#10B981` | Positive trends, completed status |
| **Warning** | Amber Alert | `#F59E0B` | Pending tasks, warnings |
| **Danger** | Rose Red | `#F43F5E` | Errors, logout, destructive actions |
| **Background** | Slate Gray | `#F8FAFC` | Main app background |
| **Surface** | Pure White | `#FFFFFF` | Cards, tables, modals |
| **Border** | Slate 200 | `#E2E8F0` | Dividers, card borders, input strokes |

---

## 3. Typography (Font: Outfit)
| Level | Weight | Size | Usage |
| :--- | :--- | :--- | :--- |
| **H1** | 700 (Bold) | 2.25rem | Page Titles |
| **H2** | 600 (Semi-Bold) | 1.5rem | Section Headers |
| **H3** | 600 (Semi-Bold) | 1.125rem | Card Titles |
| **Body (LG)** | 400 (Regular) | 1rem | Main Content |
| **Body (SM)** | 400 (Regular) | 0.875rem | Small text, tables |
| **Label** | 500 (Medium) | 0.75rem | Uppercase metadata (tracking 0.1em) |

---

## 4. Spacing & Layout
- **Grid**: 12-column responsive grid.
- **Card Border Radius**: `12px` (standard) or `16px` (large components).
- **Outer Padding**: `p-6` (desktop), `p-4` (mobile).
- **Element Spacing**: Multiples of `4px` (Tailwind standard).

---

## 5. Interactive Elements
- **Buttons**:
    - **Primary**: Solid `#0F172A` with white text.
    - **Secondary**: Ghost or outline with indigo text.
    - **Action**: Indigo background with 10% opacity for "hover" and 20% for "active".
- **Inputs**:
    - Default: White background, Slate 200 border.
    - Focus: Slate 400 border with subtle Indigo ring.
- **Tables**:
    - Header: Slate 50 background, Semi-bold text.
    - Row Hover: Slate 50 background with a left-side Indigo border (2px).

---

## 6. Iconography
- **Library**: `lucide-react` (Stroke: 1.5px or 2px).
- **Style**: Thin-stroke, non-filled icons for a clean, professional look.
- **Consistency**: All icons within a component should share the same stroke width and color.

---

## 7. Accessibility Checklist (WCAG 2.1 AA)
- [ ] Contrast Ratio: Min 4.5:1 for body text, 3:1 for large text.
- [ ] Keyboard Navigation: Visible focus rings on all interactive elements.
- [ ] Semantic HTML: Use `<nav>`, `<main>`, `<footer>`, `<header>`, and `<section>` correctly.
- [ ] Form Labels: Every input must have an associated `<label>` or `aria-label`.
- [ ] Meaningful Links: Avoid "Click here", use descriptive link text.
