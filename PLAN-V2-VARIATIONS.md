# Admin UI Kit — v2: Variations, Theming & Page Templates

> **Status: BUILT.** Everything below is implemented and verified — the kit is now an installable
> package (`admin-ui-kit-2.0.0.tgz`) with a runtime theme engine, ~230 component variants and
> 26 page templates. See `README.md` for install and usage.

**Problem with v1:** every component has exactly one look. That makes it a *style demo*, not a kit.
You cannot drop it into a real system because there is no dark mode, no colour theme switching, no
layout options, and no ready-made pages — only isolated components.

**Goal of v2:** every component becomes a *family* of variants, the whole kit re-themes at runtime, and
you get complete page templates you can copy and rename. Target: **~66 components → ~230 variants +
26 page templates + 8 themes.**

---

## Phase 1 — Theme engine (do this first; everything else depends on it)

This is the single biggest reason v1 "doesn't feel like a kit".

| Feature | Detail |
|---|---|
| Dark mode | Full dark palette; `data-bs-theme` + our own token overrides. Light / Dark / System. |
| Colour presets | 8 swappable brand themes: Green (default), Blue, Violet, Indigo, Orange, Rose, Teal, Slate. |
| Layout presets | Sidebar style (light / dark / boxed / rail / floating), navbar style (light / dark / transparent), content width (fluid / boxed). |
| Density | Comfortable / Compact — changes paddings, row heights, font size via tokens. |
| Radius | Sharp (4px) / Default (10px) / Rounded (16px) / Pill. |
| RTL | `dir="rtl"` support with logical CSS properties. |
| Settings drawer | Floating gear button → offcanvas panel to switch all of the above live. Persists to `localStorage`. |

**New files:** `src/theme/ThemeProvider.jsx`, `src/theme/themes.js`, `src/theme/useTheme.js`,
`src/components/layout/ThemeCustomizer.jsx`, `src/assets/css/themes.css`, `src/assets/css/dark.css`.

> Every token in `tokens.css` gets a dark counterpart. No component changes — that's the point of tokens.

---

## Phase 2 — Component variations

### Layout (7 → 26)
- **Sidebar** ×6: light, dark, floating/boxed, icon-rail, gradient-brand, mini+flyout panel
- **Sidebar active styles** ×4: soft-fill, left-bar, pill, gradient
- **Navbar** ×5: default, dark, transparent, centered-search, navbar-with-tabs
- **AdminLayout presets** ×5: classic sidebar, horizontal top-nav (no sidebar), dual sidebar, boxed, stacked
- **PageHeader** ×4: gradient-bar (current), plain, with tabs, with stats row
- **Breadcrumb** ×4: chevron, slash, dot, with icons
- **Footer** ×3: simple, with links columns, sticky

### Cards (6 → 24)
- **Card** ×9: bordered, elevated, flat, gradient-header, coloured left border, image-top, overlay, glass, ribbon corner
- **StatsCard** ×8: icon-left, icon-right, icon-top, big-number, + sparkline, + progress bar, + mini donut, gradient-filled
- **ProfileCard** ×4: cover, compact, horizontal, team-member
- **ActionCard / InfoCard** ×3 each

### Buttons (4 → 22)
- Sizes ×5: xs, sm, md, lg, xl
- Styles ×6: solid, outline, **soft**, **ghost**, link, **gradient**
- Shapes ×3: default, pill, square
- New: **SplitButton**, **FAB (floating action button)**, **ToggleButtonGroup**, **SocialButton**, **CopyButton**

### Forms (11 → 34)
- **Layouts** ×5: vertical, horizontal, inline, **floating labels**, sectioned
- **New inputs** ×13: PasswordInput (show/hide + strength meter), **Autocomplete**, **TagsInput**,
  **MultiSelect**, **OTPInput**, **RangeSlider**, **Rating**, **ColorPicker**, **NumberStepper**,
  **MaskedInput** (phone/currency), **RichTextArea** (basic toolbar), **RepeaterField** (add/remove rows),
  **DateRangePicker**
- **FormWizard** ×2: horizontal stepper, vertical stepper — with validation per step
- Validation states: default / valid / invalid / warning, for every control

### Tables (6 → 18)
- **Styles** ×6: basic, bordered, striped, hover, **dense**, **card-rows**
- **Features** ×8: expandable rows, grouped/tree rows, **sticky header**, sticky first column,
  **column visibility toggle**, **inline editable cell**, footer totals row, drag-to-reorder rows
- **Modes** ×2: client-side (current) + **server-side** (`onQueryChange` for API paging/sorting)
- **Export** ×2: CSV + print view

### Feedback (7 → 23)
- **Alert** ×6: solid, soft, outline, with-icon, with-actions, full-width banner
- **Toast** ×6: 4 positions + with progress bar + with action button
- **Skeleton presets** ×5: card, table, list, profile, chart
- **EmptyState** ×3: plain, illustrated (inline SVG), with-filters-hint
- **ProgressBar / CircularProgress** ×3

### Overlays (4 → 16)
- **Modal** ×6: sm/md/lg/xl, **fullscreen**, vertically-centered, scrollable, form-modal, **image lightbox**
- **Drawer / Offcanvas** ×4: left, right, top, bottom
- **Popover** ×4 placements
- **ContextMenu** (right-click) + **CommandPalette (⌘K)** — the two that make an admin feel modern

### Navigation (4 → 18)
- **Tabs** ×6: underline, pills, boxed, vertical, icon-only, with badge
- **Stepper** ×4: horizontal, vertical, dotted, progress
- **Pagination** ×4: numbered, simple prev/next, load-more, infinite-scroll hook
- **Timeline** ×4: vertical, horizontal, alternating, with-avatars

### Charts (4 → 14)
- Add: stacked area, multi-axis, **radar**, polar area, bubble, scatter, **sparkline**,
  **gauge / progress ring**, **mini-chart** (for stat cards), heatmap grid
- Every chart gets a dark-mode aware palette (reads the theme tokens)

### Data display (9 → 20)
- **Lists** ×5: simple, with-actions, with-avatar, checklist, sortable
- **KanbanBoard** (drag between columns)
- **FileManager** ×2: grid + list
- **ChatPanel** (message bubbles, composer)
- **CommentThread** (nested replies)
- **PricingCards** ×2
- **Gallery / Lightbox grid**
- **StatList, DataGrid tile, MapPlaceholder**

### Auth (4 → 10)
- Login ×4 shells: centered card, **split-screen with image**, full-width, dark boxed
- Register, Forgot, **Reset password**, **OTP verify**, **Lock screen**, **Two-factor**

---

## Phase 3 — Page templates (the part that makes it actually usable)

Complete, copy-and-rename pages under `src/templates/`. This is what turns the kit into a system starter.

| Group | Templates |
|---|---|
| Dashboards ×5 | Analytics, Sales/POS, Project, Minimal, Monitoring |
| CRUD set ×4 | List page, Create/Edit form page, Detail page, Delete/confirm flow |
| Records ×4 | Profile page, Settings page (tabbed), Activity log, Audit trail |
| Work ×4 | Kanban board, Calendar/schedule, Chat/inbox, File manager |
| Documents ×3 | Invoice list, Invoice view/print, Report page with filters |
| Errors ×4 | 404, 500, 403, Maintenance / Coming soon |
| Auth ×2 | Full sign-in page, Full register page (using AuthLayout) |

Each template is **self-contained** and uses only kit components — copy the file, rename it, swap the
data source. That is how you spin up Inventory / HR / Accounting / COMELEC / POS in a day.

---

## Phase 4 — Kit infrastructure

1. **Variant gallery pages** — each showcase page becomes a matrix: every variant side by side, with a
   variant switcher and copy-code per variant (not one example per component like v1).
2. **`<VariantGrid />`** doc component so adding a variant to the docs is 3 lines.
3. **Cheatsheet page** — one long page listing every component + one-line usage. Ctrl+F and go.
4. **Snippets folder** (`/snippets`) — plain `.jsx` files you can copy without running the app.
5. **`AppShell` prop presets** — `<AdminLayout preset="dark-rail" theme="blue" density="compact" />`.
6. **Icon browser page** — searchable Bootstrap Icons grid with click-to-copy name.
7. **Starter script** — `npm run new-page <Name>` scaffolds a page from a template.

---

## Build order — all delivered

| ✔ | Step |
|---|---|
| ✔ | Theme engine: dark mode, 8 colour themes, layout/sidebar/navbar presets, density, radius, RTL, settings drawer |
| ✔ | Buttons, badges, cards, stats variants (+ SplitButton, Fab, ToggleGroup, CopyButton, SocialButton, StatusDot, Progress, CircularProgress) |
| ✔ | Forms: 13 new inputs, 4 label layouts, FormWizard + Stepper |
| ✔ | Tables: 6 styles, expandable rows, sticky header, column toggle, inline edit, totals, CSV export, server-side mode |
| ✔ | Overlays: Drawer, Popover, ContextMenu, CommandPalette (⌘K), Lightbox; nav + feedback variants |
| ✔ | Charts: theme-aware palette + Radar, Polar, Scatter/Bubble, Sparkline |
| ✔ | Data display: ListGroup, KanbanBoard, FileManager, ChatPanel, CommentThread, PricingCard, Gallery |
| ✔ | Layout presets, 4 AuthLayout shells, 3 new auth cards |
| ✔ | 26 page templates in `src/templates/` |
| ✔ | Variant galleries, Templates gallery, Cheatsheet, Icon browser |
| ✔ | Packaged as `admin-ui-kit` — one CSS import, verified by installing it into a clean project |

## Original build order & effort

| Step | Scope | Why this order |
|---|---|---|
| 1 | Theme engine + dark mode + customizer drawer | Unblocks everything; instantly makes it feel like a kit |
| 2 | Buttons, badges, cards, stats variants | Highest-reuse, fastest visible win |
| 3 | Forms: new inputs + layouts + wizard | Biggest real-world gap in v1 |
| 4 | Tables: styles + features + server-side mode | The workhorse of every admin system |
| 5 | Overlays, navigation, feedback variants | Rounds out interaction patterns |
| 6 | Charts + data display (kanban, chat, files) | Dashboard-grade widgets |
| 7 | Layout presets + auth shells | Whole-app look options |
| 8 | 26 page templates | The "just copy it" layer |
| 9 | Variant galleries, cheatsheet, snippets, icon browser | Makes it findable and usable |

Runnable and buildable after **every** step. No component is duplicated — variants are props
(`variant`, `tone`, `shape`, `layout`, `density`), not new files, except where the markup genuinely
differs (e.g. `SplitButton`, `KanbanBoard`).

---

## Rules kept from v1

- No Tailwind, no backend, no database, no jQuery.
- All colour/shape/metric values stay in tokens — a variant never hardcodes a colour.
- Generic placeholder data only (John Doe, Jane Smith, Alex Morgan).
- Config objects over JSX lists.
- Check for an existing component before creating one.
