# WANDERIFY — Design System

---

> **Avant-Garde Travel. Invisible Blockchain.**
> A premium, dark-first design language for the modern explorer.

---

## 1. Design Philosophy

### Core Tenets
| Principle | Manifestation |
|-----------|---------------|
| **Intentional Minimalism** | Every element earns its place. No decorative filler. |
| **Zero-Friction Web3** | Blockchain complexity is invisible. Feels like a travel app. |
| **Data-Dense, Visually Breathable** | Dense information without visual noise. |
| **Sci-Fi OS Aesthetic** | Holographic glass, subtle glow, depth layers. |

---

## 2. Color Palette

### Surface Colors (Dark Mode First)
| Token | Hex | Usage |
|-------|-----|-------|
| `surface-base` | `#0D0D0D` | Page backgrounds |
| `surface-card` | `#1A1A1A` | Card backgrounds |
| `surface-elevated` | `#242424` | Modals, dropdowns |
| `surface-hover` | `#2A2A2A` | Interactive hover states |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `accent-primary` | `#3B8BEB` | Primary CTAs, links |
| `accent-glow` | `#4A9EFF` | Glow effects, focus rings |
| `accent-success` | `#10B981` | Success states, Green Zone |
| `accent-warning` | `#F59E0B` | Orange Zone, caution |
| `accent-danger` | `#EF4444` | Red Zone, errors |

### Semantic Colors
```css
--color-text-primary: rgba(255, 255, 255, 0.95);
--color-text-secondary: rgba(255, 255, 255, 0.70);
--color-text-muted: rgba(255, 255, 255, 0.50);
--color-border: rgba(255, 255, 255, 0.08);
--color-border-hover: rgba(255, 255, 255, 0.15);
```

---

## 3. Typography

### Font Stack
| Type | Font | Weight | Usage |
|------|------|--------|-------|
| **Primary** | Inter | 400-700 | Body, UI text |
| **Monospace** | JetBrains Mono | 400-500 | Data, addresses, code |

### Scale
```css
--text-xs: 0.75rem;    /* 12px - Labels */
--text-sm: 0.875rem;   /* 14px - Secondary text */
--text-base: 1rem;     /* 16px - Body */
--text-lg: 1.125rem;   /* 18px - Subheadings */
--text-xl: 1.25rem;    /* 20px - Card titles */
--text-2xl: 1.5rem;    /* 24px - Section headers */
--text-3xl: 2rem;      /* 32px - Page titles */
--text-4xl: 2.5rem;    /* 40px - Hero headlines */
```

---

## 4. Spacing System

8px base grid.

| Token | Value |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |
| `space-16` | 64px |

---

## 5. Component Patterns

### Cards (Holographic Glass)
```css
.card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.01)
  );
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 
    0 4px 24px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

### Buttons
| Variant | Appearance |
|---------|------------|
| **Primary** | Solid `accent-primary`, white text, glow on hover |
| **Secondary** | Transparent, border `accent-primary`, blue text |
| **Ghost** | No border, subtle hover background |
| **Danger** | Solid `accent-danger` for destructive actions |

### Inputs
- Dark background (`surface-card`).
- Subtle border, focus ring with `accent-glow`.
- Placeholder text at 50% opacity.

---

## 6. Animation Guidelines

### Easing Functions
```css
--ease-standard: cubic-bezier(0.25, 1, 0.5, 1);    /* UI interactions */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);       /* Page transitions */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Success celebrations */
```

### Duration
| Type | Duration |
|------|----------|
| Micro-interactions | 150-200ms |
| Component transitions | 300ms |
| Page transitions | 500ms |
| Celebration animations | 800-1200ms |

### Patterns
- **Stagger**: List items animate in sequence (50ms delay).
- **Parallax**: Background layers move at different speeds on scroll.
- **Glow Pulse**: Subtle breathing effect on active elements.

---

## 7. Iconography

| Library | Stroke Width | Size |
|---------|--------------|------|
| Lucide React | 1.5px | 16px (sm), 20px (md), 24px (lg) |

Icons should be **outlined**, never filled. Maintain consistent optical balance.

---

## 8. Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large monitors |

**Mobile-first approach**: Base styles for mobile, layer up for larger screens.

---

## 9. Zone Visualization

Proximity zones for navigation UI:

| Zone | Color | Distance | Visual |
|------|-------|----------|--------|
| **Red** | `#EF4444` | >500m | Pulsing outer ring |
| **Blue** | `#3B8BEB` | 100-500m | Glowing mid ring |
| **Orange** | `#F59E0B` | 50-100m | Warming inner ring |
| **Green** | `#10B981` | ≤50m | Solid glow, "Check In" enabled |

---

## 10. Accessibility

- **Contrast**: Minimum 4.5:1 for body text, 3:1 for large text.
- **Focus States**: Visible `accent-glow` ring on all interactive elements.
- **Motion**: Respect `prefers-reduced-motion`.
- **ARIA**: All custom components use proper ARIA attributes.

---

<p align="center">
  <strong>WANDERIFY</strong><br>
  Design System v1.0 — January 2026
</p>