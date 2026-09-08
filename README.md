<div align="center">

# ⚡ React Bootstrap Admin UI Kit (v2)

**Enterprise-grade, themeable React + Bootstrap 5 admin component library and full dashboard starter.**

[![React Version](https://img.shields.io/badge/React-18%2B-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Bootstrap Version](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](#license)
[![Version](https://img.shields.io/badge/Release-v2.0.0-blue?style=for-the-badge)](#)

<p align="center">
  A production-ready UI kit designed for modern enterprise dashboards, SaaS backoffices, CRMs, POS, and ERP portals.<br />
  <strong>No Tailwind. No jQuery. Zero external styling bloat. 100% token-driven design system.</strong>
</p>

[Key Features](#-key-features) •
[Quick Start](#-quick-start) •
[Component Architecture](#-component-architecture) •
[Page Templates](#-26-ready-to-use-page-templates) •
[Runtime Theming](#-runtime-theming-engine) •
[Showcase App](#-running-the-showcase)

---

</div>

## 🌟 Key Features

- 🎨 **Runtime Theme Engine**: Switch between 8 curated color presets (`green`, `blue`, `violet`, `indigo`, `orange`, `rose`, `teal`, `slate`) and auto/system dark mode with zero page reload.
- 📐 **Adaptive Layout Presets**: Sidebar variations (Classic, Dark, Floating, Icon-Rail, Gradient), Navbar styles, Content density (Comfortable / Compact), Corner radiuses, and RTL support.
- 🧩 **230+ Component Variants**: Over 100 enterprise components with dedicated variants across cards, forms, tables, overlays, feedback, navigation, and charts.
- 📊 **Dynamic Data Visualizations**: Chart.js integration with theme-aware palettes (Line, Bar, Doughnut, Pie, Radar, Polar, Scatter, and Sparklines).
- 🚀 **Zero Dependency on Bootstrap JS**: Modals, Drawers, Dropdowns, Tooltips, Accordions, Toasts, Command Palette (⌘K), and Context Menus are pure React state (`useState`, `useRef`).
- 📦 **Standalone Package Bundle**: Ships pre-bundled as `admin-ui-kit-2.0.0.tgz` ready to be installed in any React application with a single stylesheet import.
- 📑 **26 Production Page Templates**: Full-featured dashboards, CRUD tables, form wizards, authentication suites, user profiles, invoices, and file managers.

---

## ⚡ Quick Start

### 1. Install the Package

Install the pre-built tarball into your React project:

```bash
# In your existing or new Vite React project
npm install react react-dom react-router-dom
npm install "path/to/admin-ui-kit-2.0.0.tgz"
```

### 2. Global Stylesheet Setup

Include the single compiled stylesheet in your application's entry point (`main.jsx` or `index.js`). This bundles Bootstrap 5, Bootstrap Icons, and all kit tokens:

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Single stylesheet import handles all styles, tokens, and icons
import 'admin-ui-kit/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 3. Build a Dashboard in Seconds

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
    { id: '#1001', customer: 'Keith Torda', amount: '₱5,400', status: <Badge tone="success">Paid</Badge> },
    { id: '#1002', customer: 'Jane Smith', amount: '₱3,150', status: <Badge tone="warning">Pending</Badge> },
  ];

  return (
    <div className="py-2">
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <StatsCard title="Total Revenue" value="₱128,450" icon="wallet2" tone="success" trend="+14.2%" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatsCard title="Active Users" value="1,420" icon="people" tone="primary" trend="+5.1%" />
        </div>
      </div>

      <Card title="Recent Orders" subtitle="Transactions from the last 24 hours">
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

## 🏛 Component Architecture

| Category | Available Modules |
|---|---|
| **Theme** | `ThemeProvider`, `useTheme`, `ThemeCustomizer`, `ThemeToggle` |
| **Layout** | `AdminLayout`, `AuthLayout`, `BlankLayout`, `Sidebar`, `Navbar`, `Header`, `Footer`, `PageHeader`, `Breadcrumb`, `ContentWrapper` |
| **Cards** | `Card`, `StatsCard`, `InfoCard`, `ProfileCard`, `ChartCard`, `ActionCard` |
| **Data Tables** | `DataTable`, `TableToolbar`, `TableSearch`, `TableFilter`, `TablePagination`, `TableActions`, `exportCsv` |
| **Forms (30+)** | `TextInput`, `TextArea`, `RichTextArea`, `SelectInput`, `MultiSelect`, `Autocomplete`, `TagsInput`, `PasswordInput`, `OTPInput`, `NumberStepper`, `MaskedInput`, `RangeSlider`, `Rating`, `ColorPicker`, `DateInput`, `DateRangePicker`, `FileUpload`, `SearchInput`, `Checkbox`, `RadioGroup`, `Switch`, `RepeaterField`, `FormGroup`, `FormCard`, `FormWizard` |
| **Buttons** | `Button`, `IconButton`, `ActionButton`, `ButtonGroup`, `SplitButton`, `Fab`, `ToggleGroup`, `CopyButton`, `SocialButton` |
| **Feedback** | `Alert`, `Badge`, `StatusDot`, `Toast`, `Spinner`, `Skeleton`, `SkeletonPreset`, `Progress`, `CircularProgress`, `EmptyState`, `ErrorState` |
| **Overlays** | `Modal`, `ConfirmModal`, `Drawer`, `Dropdown`, `Tooltip`, `Popover`, `ContextMenu`, `CommandPalette` (⌘K), `Lightbox` |
| **Navigation** | `Tabs`, `Accordion`, `Pagination`, `Stepper`, `NavMenu` |
| **Data Display** | `Avatar`, `AvatarGroup`, `DetailList`, `ListGroup`, `Timeline`, `ActivityFeed`, `MessageList`, `NotificationDropdown`, `CalendarWidget`, `InvoiceLayout`, `KanbanBoard`, `FileManager`, `ChatPanel`, `CommentThread`, `PricingCard`, `Gallery` |
| **Charts** | `LineChart`, `BarChart`, `PieChart`, `DoughnutChart`, `RadarChart`, `PolarChart`, `ScatterChart`, `Sparkline` |
| **Hooks** | `useToggle`, `useToasts`, `useMediaQuery`, `useClickOutside`, `useTableData` |

---

## 📑 26 Ready-to-Use Page Templates

Located under `src/templates/`, these pages are copy-paste ready and decouple business logic from UI design:

- **Dashboards (5)**: Analytics Dashboard, Sales / POS Dashboard, Project Management, Minimalist Dashboard, Real-time System Monitoring.
- **CRUD Suites (4)**: Data List View, Create/Edit Forms, Record Detail Page, Multi-step Form Wizard.
- **Record Management (3)**: Account Settings (Tabbed), User Profile, System Audit Trail / Activity Log.
- **Productivity & Workspaces (4)**: Kanban Task Board, Interactive Calendar, Inbox & Chat Panel, Cloud File Manager.
- **Billing & Documents (4)**: Invoice List, Printable Invoice View, Filterable Analytics Report, Tiered Pricing Cards.
- **Authentication & Errors (6)**: Split-Screen Sign In, Sign Up, 404 Not Found, 403 Forbidden, 500 Error, Maintenance / Coming Soon.

---

## 🎨 Runtime Theming Engine

The library exposes a reactive hook `useTheme()` for full control over the UI aesthetics:

```jsx
import { useTheme } from 'admin-ui-kit';

function SettingsBar() {
  const { settings, set, isDark, toggleMode } = useTheme();

  return (
    <div>
      <button onClick={() => set({ mode: isDark ? 'light' : 'dark' })}>
        Toggle Dark Mode
      </button>
      <button onClick={() => set({ color: 'violet' })}>
        Set Violet Theme
      </button>
      <button onClick={() => set({ layout: 'rail' })}>
        Compact Rail Layout
      </button>
    </div>
  );
}
```

### Supported Runtime Settings:
- **`mode`**: `'light'` | `'dark'` | `'system'`
- **`color`**: `'green'` | `'blue'` | `'violet'` | `'indigo'` | `'orange'` | `'rose'` | `'teal'` | `'slate'`
- **`layout`**: `'classic'` | `'horizontal'` | `'boxed'` | `'rail'` | `'stacked'`
- **`sidebarStyle`**: `'light'` | `'dark'` | `'floating'` | `'gradient'` | `'transparent'`
- **`density`**: `'comfortable'` | `'compact'`
- **`radius`**: `'sharp'` | `'default'` | `'rounded'` | `'pill'`
- **`rtl`**: `true` | `false`

All options are persisted automatically in `localStorage`.

---

## 🖥 Running the Showcase

To run the full component interactive catalog and documentation app locally:

```bash
# Clone the repository
git clone https://github.com/KeithTorda/REACT-BOOTSTRAP-UIKIT.git
cd REACT-BOOTSTRAP-UIKIT

# Install dependencies
npm install

# Start Vite showcase server
npm run dev

# Rebuild package distribution & tarball
npm run build:lib
npm pack
```

---

## 📱 Responsive Breakpoints

| Viewport | Sidebar Behavior | Content Layout |
|---|---|---|
| **≥ 1200px (Desktop)** | Fixed 270px width or selected preset | Full grid with custom gutters |
| **992px – 1199px (Tablet)** | Automatically transitions to 76px Icon Rail | Fluid responsiveness |
| **< 992px (Mobile)** | Off-canvas sliding drawer with dark backdrop | Single-column stacked |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Built with ❤️ for modern web developers who demand clean, maintainable, and high-performance admin interfaces.