# Navigation Bar Design Documentation

## Overview

This document describes the professional navigation bar design used in the ProTech Planner website. The navbar features a sticky positioning, glassmorphism effect, mega-menu dropdowns, and full mobile responsiveness. The design uses Tailwind CSS for styling.

---

## Color Palette (CSS Variables)

| Color Name | Hex Code | Usage |
|------------|-----------|-------|
| Primary | `#213959` | Headings, buttons, active states |
| Primary Hover | `#285eca` | Button hover states |
| Accent | `#215ACD` | CTA buttons (Get Started) |
| Accent Hover | `#1a49a8` | CTA button hover |
| Background | `white` / `rgba(255,255,255,0.95)` | Navbar background |
| Border | `#e2e8f0` | Subtle borders |
| Text | `black` | Navigation links |
| Text Muted | `#64748b` | Descriptions |

### Customizing Colors

To change colors for other products, modify these values in your CSS:

```css
:root {
  --nav-primary: #213959;       /* Your primary brand color */
  --nav-primary-hover: #285eca; /* Primary hover state */
  --nav-accent: #215ACD;        /* CTA button color */
  --nav-accent-hover: #1a49a8;  /* CTA hover state */
  --nav-text: black;            /* Navigation link color */
  --nav-text-muted: #64748b;   /* Secondary text */
  --nav-border: #e2e8f0;        /* Border color */
}
```

---

## Structure

```
Navigation Component
├── Logo (left)
├── Desktop Menu (center)
│   ├── Home
│   ├── Services (Mega Menu)
│   │   ├── Services List (40%)
│   │   └── Subpages Panel (60%)
│   ├── Industries (Dropdown)
│   ├── About
│   ├── Blog
│   └── Contact
├── CTA Button (right)
└── Mobile Menu (hidden on desktop)
    ├── Toggle Button
    ├── Collapsible Links
    └── Mobile CTA
```

---

## Desktop Navigation

### Container

```css
max-w-8xl        /* Maximum width */
mx-auto          /* Center horizontally */
px-6 sm:px-8 lg:px-10  /* Responsive padding */
h-20            /* Height: 80px */
```

### Navbar Shell

```css
sticky top-0           /* Sticks to top on scroll */
z-50                   /* High z-index */
bg-white/95            /* Semi-transparent white */
backdrop-blur          /* Glassmorphism blur effect */
border-b border-slate-100  /* Bottom border */
```

### Navigation Links

```css
/* Base Link Style */
px-4 py-3              /* Padding around links */
rounded-md             /* Rounded corners */
transition-colors      /* Smooth color transitions */
hover:bg-slate-50      /* Hover background */

/* Text Style */
color: black
font-size: 16px
font-family: 'Inter'
font-weight: 400
```

### Dropdown Arrow (Chevron)

```css
/* Inline SVG using clipPath */
width: 24px, height: 24px
/* Triangle using polygon clipPath */
clipPath: polygon(0 0, 100% 0, 50% 100%)
```

---

## Mega Menu (Services Dropdown)

### Trigger

The mega menu appears on hover over the "Services" link using CSS group-hover:

```css
.group       /* Parent container */
group-hover: /* Child dropdown visibility */
```

### Dropdown Container

```css
/* Position */
absolute top-full
left-1/2 transform -translate-x-1/2

/* Size */
width: 900px

/* Appearance */
bg-white
border border-slate-100
rounded-2xl
shadow-2xl

/* Animation */
opacity-0 invisible          /* Hidden by default */
group-hover:opacity-100     /* Show on hover */
group-hover:visible
transition-all duration-200
```

### Left Panel - Services List (40% width)

```css
width: 2/5
bg-gradient-to-b from-[#213959]/5 to-[#213959]/10
rounded-l-2xl
p-4
```

#### Service Item (Hover State)

```css
/* Default State */
border-l-2 border-transparent
hover:bg-[#011880]/10
hover:text-[#011880]
text-slate-700

/* Hover Active State */
bg-[#011880]/20
text-[#011880]
border-[#011880]
font-semibold
shadow-sm
```

#### Arrow Animation

```css
/* Arrow slides in from left */
opacity-0 -translate-x-2     /* Hidden position */
opacity-100 translate-x-0   /* Visible on hover */
transition-all duration-200
```

### Right Panel - Subpages (60% width)

```css
width: 3/5
bg-white
rounded-r-2xl
min-h-[400px]
```

#### Subpage Card (Grid)

```css
/* Grid Layout */
grid grid-cols-2
gap-3

/* Card Style */
p-3 rounded-lg
bg-[#285eca]           /* Blue background */
border border-[#285eca]
hover:bg-[#1e4cb8]     /* Darker on hover */
hover:border-[#1e4cb8]
transition-all duration-200
shadow-sm
```

#### CTA Button

```css
/* Inside subpages panel */
bg-[#213959]
hover:bg-[#285eca]
text-white
h-9 (height: 36px)
text-xs font-semibold
```

---

## Industries Dropdown

Simpler than Services mega menu:

```css
/* Container */
absolute top-full
left-0
width: 320px (w-80)
rounded-xl
shadow-2xl

/* Each Item */
flex items-start gap-3
p-3 rounded-lg
hover:bg-slate-50

/* Icon Container */
w-8 h-8 rounded-lg
bg-[#213959]/5
text-[#213959]
group-hover:bg-[#213959]
group-hover:text-white
```

---

## CTA Button (Get Started)

```css
/* Container */
padding: 10px 16px
background: #215ACD
border-radius: 4px

/* Text */
color: white
font-size: 14px
font-family: 'Inter'
font-weight: 500
```

---

## Mobile Navigation

### Mobile Toggle Button

```css
/* Visible only on lg breakpoint and below */
lg:hidden

/* Button Style */
h-12 w-12
text-slate-700
hover:bg-slate-100
```

### Mobile Menu Container

```css
/* Animation */
animate-in
slide-in-from-top-2
duration-200

/* Container */
bg-white rounded-2xl
mt-2 shadow-xl
border border-slate-100
```

### Mobile Accordion

```css
/* Chevron rotation */
rotate-180           /* When open */
transition-transform
```

---

## Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| sm | 640px | Padding increases to px-8 |
| lg | 1024px | Desktop menu shows, mobile hides |
| max-w | 8xl (1536px) | Max container width |

---

## Animation Summary

| Animation | Duration | Easing |
|-----------|----------|--------|
| Dropdown fade | 200ms | ease-out |
| Subpage arrow slide | 200ms | ease-out |
| Mobile menu slide | 200ms | ease-out |
| Color transitions | 150ms | cubic-bezier(0.4, 0, 0.2, 1) |

---

## Component Dependencies

- **React**: useState for menu toggles
- **Next.js**: Link component for routing
- **Lucide React**: Icons (Menu, X, ChevronDown, ArrowRight)
- **Tailwind CSS**: All styling
- **CSS Backdrop Filter**: Glassmorphism effect

---

## Quick Color Change Template

To adapt this navbar for another product:

1. Replace all `#213959` with your primary color
2. Replace all `#215ACD` with your accent/CTA color
3. Replace all `#285eca` with your primary hover color
4. Update logo path in the Image component
5. Update navigation data in `/lib/navigation-data.ts`

```tsx
// Replace in navigation.tsx
const BRAND_COLORS = {
  primary: '#YOUR_PRIMARY',
  primaryHover: '#YOUR_PRIMARY_HOVER',
  accent: '#YOUR_ACCENT',
  accentHover: '#YOUR_ACCENT_HOVER',
}
```

---

## File Structure

```
/components
  navigation.tsx      # Main navigation component
  navigation-loading.tsx  # Loading state
/ui
  navigation-menu.tsx # Shadcn/ui navigation menu
/lib
  navigation-data.ts  # Services & industries data
```

---

## Accessibility Notes

- Uses semantic `<nav>` element
- Keyboard navigation supported via Next.js Link
- Proper ARIA attributes can be added for enhanced accessibility
- Mobile menu closes on link click
- Focus states can be enhanced with `focus-visible` styles
