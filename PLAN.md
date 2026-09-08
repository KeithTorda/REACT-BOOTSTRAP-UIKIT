# React Bootstrap Admin UI Kit — Build Plan

**Goal:** a reusable React + Vite + Bootstrap 5 component library that carries the *visual language* of
`StarCodeKh/School-Admin-Template-Bootstrap` but contains **zero** school business logic, school data, or
school-specific pages. Copy components out of it to start Inventory / HR / Accounting / COMELEC / POS /
CRM / DMS / Asset / GIS dashboards.

---

## 1. Design language extracted from the reference

Read from `assets/css/style.css` of the reference template:

| Aspect | Reference value | Token |
|---|---|---|
| Accent (primary) | `#2FDF84` (green) | `--primary` |
| Secondary accent | `#8944D7` (purple) | `--secondary` |
| Success | `#22C571` | `--success` |
| Danger | `#F73164` | `--danger` |
| Warning | `#F8D62B` | `--warning` |
| Info | `#009CE7` | `--info` |
| Surface / panels | `#FFFFFF` | `--surface` |
| Border | `#D5DBE1` | `--border` |
| Text primary | `#333333` (headings `#000`) | `--text-primary` |
| Text secondary | `#777777` | `--text-secondary` |
| Card | `border 1px #d5dbe1; radius 10px; shadow 0 6px 15px rgba(36,37,38,.08)` | `--border-radius`, `--card-shadow` |
| Sidebar | white, fixed, `270px`, inset `10px`, rounded, uppercase 14px links | `--sidebar-width` |
| Header | white, fixed, `60px` tall, rounded, offset by sidebar | `--navbar-height` |
| Page header | bordered panel, title with 5px gradient left bar `#2FDF84 → #8944D7` | `--gradient-accent` |
| Font | Roboto, base `0.875rem` | `--font-sans` |

**Signature look:** floating white rounded panels on a light ground, thin grey borders, soft shadow,
green→purple gradient accents. That is what the kit reproduces — nothing else from the template.

## 2. Stack

React 18 · Vite · JavaScript (JSX) · Bootstrap 5 (CSS) · React Router DOM · Bootstrap Icons ·
Chart.js + react-chartjs-2 · PropTypes. **No Tailwind. No backend. No database.**

Bootstrap's jQuery-era JS is *not* used — modals, dropdowns, tabs, accordions, toasts and the off-canvas
sidebar are re-implemented with `useState` / `useEffect` / `useRef`.

## 3. Structure

```
src/
  assets/css/       tokens.css · theme.css
  components/
    layout/         Sidebar Navbar Header Footer PageHeader Breadcrumb ContentWrapper
    cards/          Card StatsCard InfoCard ProfileCard ChartCard ActionCard
    tables/         DataTable TableToolbar TableSearch TableFilter TablePagination TableActions
    forms/          TextInput TextArea SelectInput Checkbox Radio Switch DateInput FileUpload
                    SearchInput FormGroup FormCard
    buttons/        Button IconButton ActionButton ButtonGroup
    feedback/       Alert Badge Toast Spinner Skeleton EmptyState ErrorState
    overlays/       Modal ConfirmModal Dropdown Tooltip
    navigation/     Tabs Pagination Accordion NavMenu
    charts/         LineChart BarChart PieChart DoughnutChart
    display/        Avatar AvatarGroup Timeline ActivityFeed DetailList NotificationDropdown
                    MessageList CalendarWidget InvoiceLayout
    auth/           LoginCard RegisterCard ForgotPasswordCard
    docs/           ShowcaseSection Preview CodeBlock  (powers the documentation pages)
  layouts/          AdminLayout AuthLayout BlankLayout
  pages/            Overview + one showcase page per category
  data/             navigationData.js sampleTableData.js sampleChartData.js
  hooks/            useToggle useToasts useMediaQuery useClickOutside useTableData
  utils/            cn.js format.js
  index.js          barrel export of the whole library
```

## 4. Rules the build follows

1. **No duplicate components.** Every new component checks for an existing one first; higher-level
   components compose lower-level ones (`StatsCard` → `Card`; `DataTable` → `TableToolbar` +
   `TablePagination` + `EmptyState`).
2. **Props, not hardcoding.** Every component takes `variant`, `size`, `className`, `children` where
   meaningful; forms take `label / placeholder / value / onChange / required / disabled / error /
   helperText / size`.
3. **Config-driven navigation.** The sidebar renders from `data/navigationData.js` — never JSX lists.
4. **Generic sample data only.** John Doe, Jane Smith, Alex Morgan. No student/teacher/exam records.
5. **Centralised tokens.** Colors, radii, shadows and metrics live in `tokens.css`; components reference
   `var(--…)` or Bootstrap utility classes only.
6. **Runnable after every phase.**

## 5. Build phases

1. Scaffold + tokens + theme (app boots, empty shell).
2. Primitives: buttons, feedback, forms, overlays, navigation.
3. Composites: cards, tables, charts, display components, auth cards.
4. Layouts (responsive: fixed sidebar → collapsible → off-canvas) + config-driven Sidebar/Navbar.
5. Showcase pages with preview + variants + usage snippet per component.
6. `npm run build` verification, README, delivery.

## 6. Responsive behaviour

| Breakpoint | Sidebar | Content |
|---|---|---|
| ≥ 1200px | fixed 270px | offset by sidebar |
| 992–1199px | collapsed to 70px icon rail (toggleable) | offset by rail |
| < 992px | off-canvas drawer + backdrop | full width |

## 7. Out of scope (explicitly)

Student/teacher/parent management, attendance, exams, fees/payments, school settings, any backend, any
database, any auth logic beyond the visual cards.
