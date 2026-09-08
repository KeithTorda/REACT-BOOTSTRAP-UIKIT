<div align="center">

# React Bootstrap Admin UI Kit (v2)

**Enterprise-grade, themeable React + Bootstrap 5 admin component library with 26 production page templates.**

[![React Version](https://img.shields.io/badge/React-18%2B-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Bootstrap Version](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](#license)
[![Release](https://img.shields.io/badge/Release-v2.0.0-blue?style=flat-square)](#)

<p align="center">
  A production-ready UI kit designed for enterprise dashboards, SaaS backoffices, CRMs, POS, and ERP portals.<br />
  <strong>No Tailwind. No jQuery. 100% token-driven design system with zero styling bloat.</strong>
</p>

[Quick Start](#quick-start) •
[Key Capabilities](#key-capabilities) •
[Component Architecture](#component-architecture) •
[Page Templates](#page-templates) •
[Theming Engine](#theming-engine) •
[Showcase Application](#showcase-application)

---

</div>

## Quick Start

Installing and using the kit in any React project takes under 2 minutes.

### 1. Installation

Install the pre-built package tarball directly into your project:

```bash
# In your project folder:
npm install react react-dom react-router-dom
npm install "path/to/admin-ui-kit-2.0.0.tgz"
```

> **Direct Folder Alternative:**
> If you prefer installing from the local source folder rather than the tarball (`npm i ../react-bootstrap-admin-ui-kit`), add deduplication to your `vite.config.js` to ensure a single React instance:
> ```js
> resolve: { dedupe: ['react', 'react-dom', 'react-router-dom'] }
> ```

### 2. Add Stylesheet

Import the single unified stylesheet at the root of your application (`src/main.jsx`). This bundle includes Bootstrap 5, Bootstrap Icons, and all kit tokens:

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Single stylesheet covers all components, icons, and theme variables
import 'admin-ui-kit/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 3. Basic Dashboard Implementation

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, AdminLayout, StatsCard, Card, DataTable, Badge } from 'admin-ui-kit';

const navigation = [
  {
    section: 'Overview',
    items: [
      { label: 'Dashboard', icon: 'speedometer2', path: '/' },
      { label: 'Analytics', icon: 'graph-up-arrow', path: '/analytics' },
    ],
  },
  {
    section: 'Management',
    items: [
      { label: 'Orders', icon: 'bag', path: '/orders', badge: '12' },
      { label: 'Customers', icon: 'people', path: '/customers' },
    ],
  },
];

function DashboardOverview() {
  const columns = [
    { key: 'id', title: 'Order ID' },
    { key: 'customer', title: 'Customer' },
    { key: 'amount', title: 'Amount' },
    { key: 'status', title: 'Status' },
  ];

  const data = [
    { id: '#1001', customer: 'Keith Torda', amount: 'PHP 5,400', status: <Badge tone="success">Paid</Badge> },
    { id: '#1002', customer: 'Jane Smith', amount: 'PHP 3,150', status: <Badge tone="warning">Pending</Badge> },
  ];

  return (
    <div className="py-2">
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <StatsCard title="Total Revenue" value="PHP 128,450" icon="wallet2" tone="success" trend="+14.2%" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatsCard title="Active Users" value="1,420" icon="people" tone="primary" trend="+5.1%" />
        </div>
      </div>

      <Card title="Recent Orders" subtitle="Transactions recorded in the last 24 hours">
        <DataTable columns={columns} data={data} searchable pagination />
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultSettings={{ color: 'blue', mode: 'system' }}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AdminLayout
                brand="Enterprise Portal"
                navigation={navigation}
                user={{ name: 'Admin', role: 'Superadmin' }}
              />
            }
          >
            <Route index element={<DashboardOverview />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
```

---

## Key Capabilities

- **Runtime Theme Engine**: Switch between 8 brand color palettes (`green`, `blue`, `violet`, `indigo`, `orange`, `rose`, `teal`, `slate`) and auto/system dark mode with zero page reload.
- **Adaptive Layout Presets**: Sidebar variations (Classic, Dark, Floating, Icon-Rail, Gradient), Navbar styles, Content density (Comfortable / Compact), Corner radiuses, and native RTL support.
- **230+ Component Variants**: Over 100 enterprise components with dedicated variants across cards, forms, tables, overlays, feedback, navigation, and data visualization.
- **Dynamic Data Visualizations**: Integrated Chart.js charts with theme-aware palettes (Line, Bar, Doughnut, Pie, Radar, Polar, Scatter, and Sparklines).
- **Zero Bootstrap JS Dependency**: Modals, Drawers, Dropdowns, Tooltips, Accordions, Toasts, Command Palette (Ctrl+K), and Context Menus are pure React state (`useState`, `useRef`).
- **Production Page Templates**: 26 pre-built, copy-and-rename page templates covering dashboards, CRUD workflows, form wizards, authentication, settings, and file management.

---

## Component Architecture

| Category | Modules |
|---|---|
| **Theme** | `ThemeProvider`, `useTheme`, `ThemeCustomizer`, `ThemeToggle` |
| **Layout** | `AdminLayout`, `AuthLayout`, `BlankLayout`, `Sidebar`, `Navbar`, `Header`, `Footer`, `PageHeader`, `Breadcrumb`, `ContentWrapper` |
| **Cards** | `Card`, `StatsCard`, `InfoCard`, `ProfileCard`, `ChartCard`, `ActionCard` |
| **Data Tables** | `DataTable`, `TableToolbar`, `TableSearch`, `TableFilter`, `TablePagination`, `TableActions`, `exportCsv` |
| **Forms (30+)** | `TextInput`, `TextArea`, `RichTextArea`, `SelectInput`, `MultiSelect`, `Autocomplete`, `TagsInput`, `PasswordInput`, `OTPInput`, `NumberStepper`, `MaskedInput`, `RangeSlider`, `Rating`, `ColorPicker`, `DateInput`, `DateRangePicker`, `FileUpload`, `SearchInput`, `Checkbox`, `RadioGroup`, `Switch`, `RepeaterField`, `FormGroup`, `FormCard`, `FormWizard` |
| **Buttons** | `Button`, `IconButton`, `ActionButton`, `ButtonGroup`, `SplitButton`, `Fab`, `ToggleGroup`, `CopyButton`, `SocialButton` |
| **Feedback** | `Alert`, `Badge`, `StatusDot`, `Toast`, `Spinner`, `Skeleton`, `SkeletonPreset`, `Progress`, `CircularProgress`, `EmptyState`, `ErrorState` |
| **Overlays** | `Modal`, `ConfirmModal`, `Drawer`, `Dropdown`, `Tooltip`, `Popover`, `ContextMenu`, `CommandPalette`, `Lightbox` |
| **Navigation** | `Tabs`, `Accordion`, `Pagination`, `Stepper`, `NavMenu` |
| **Data Display** | `Avatar`, `AvatarGroup`, `DetailList`, `ListGroup`, `Timeline`, `ActivityFeed`, `MessageList`, `NotificationDropdown`, `CalendarWidget`, `InvoiceLayout`, `KanbanBoard`, `FileManager`, `ChatPanel`, `CommentThread`, `PricingCard`, `Gallery` |
| **Charts** | `LineChart`, `BarChart`, `PieChart`, `DoughnutChart`, `RadarChart`, `PolarChart`, `ScatterChart`, `Sparkline` |
| **Hooks** | `useToggle`, `useToasts`, `useMediaQuery`, `useClickOutside`, `useTableData` |

---

## Page Templates

Located in `src/templates/`, these complete page structures can be copied and customized directly:

- **Dashboards (5)**: Analytics Dashboard, Sales / POS Dashboard, Project Management, Minimalist Dashboard, Real-time System Monitoring.
- **CRUD Workflows (4)**: Data List View, Create/Edit Form, Record Detail Page, Multi-Step Form Wizard.
- **Record Management (3)**: Account Settings (Tabbed), User Profile, System Audit Trail / Activity Log.
- **Workspaces (4)**: Kanban Task Board, Interactive Calendar, Inbox & Chat Panel, File Manager.
- **Billing & Documents (4)**: Invoice List, Printable Invoice View, Filterable Analytics Report, Tiered Pricing Cards.
- **Authentication & Errors (6)**: Split-Screen Sign In, Sign Up, 404 Not Found, 403 Forbidden, 500 Error, Maintenance Screen.

---

## Theming Engine

The library exposes the reactive `useTheme()` hook for dynamic runtime changes:

```jsx
import { useTheme } from 'admin-ui-kit';

function ThemeControls() {
  const { settings, set, isDark, toggleMode } = useTheme();

  return (
    <div>
      <button onClick={() => set({ mode: isDark ? 'light' : 'dark' })}>
        Toggle Theme Mode
      </button>
      <button onClick={() => set({ color: 'violet' })}>
        Set Violet Palette
      </button>
      <button onClick={() => set({ layout: 'rail' })}>
        Switch to Rail Layout
      </button>
    </div>
  );
}
```

### Available Configuration Properties:
- `mode`: `'light'` | `'dark'` | `'system'`
- `color`: `'green'` | `'blue'` | `'violet'` | `'indigo'` | `'orange'` | `'rose'` | `'teal'` | `'slate'`
- `layout`: `'classic'` | `'horizontal'` | `'boxed'` | `'rail'` | `'stacked'`
- `sidebarStyle`: `'light'` | `'dark'` | `'floating'` | `'gradient'` | `'transparent'`
- `density`: `'comfortable'` | `'compact'`
- `radius`: `'sharp'` | `'default'` | `'rounded'` | `'pill'`
- `rtl`: `true` | `false`

All choices automatically synchronize with `localStorage`.

---

## Showcase Application

To run the interactive documentation catalog and component preview locally:

```bash
# Clone the repository
git clone https://github.com/KeithTorda/REACT-BOOTSTRAP-UIKIT.git
cd REACT-BOOTSTRAP-UIKIT

# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Rebuild package distribution & tarball
npm run build:lib
npm pack
```

---

## Responsive Breakpoints

| Breakpoint | Sidebar Behavior | Layout Configuration |
|---|---|---|
| **Desktop (>= 1200px)** | Fixed 270px width or active preset | Standard multi-column grid |
| **Tablet (992px - 1199px)** | Automatically collapses to 76px Icon Rail | Fluid container |
| **Mobile (< 992px)** | Off-canvas drawer with backdrop | Single-column stacked |

---

## License

This project is licensed under the [MIT License](LICENSE).
Designed and maintained for developers requiring high-performance, clean, and reliable admin user interfaces.