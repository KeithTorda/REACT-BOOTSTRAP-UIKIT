/**
 * Page templates — complete screens built only from kit components.
 * Copy the file into your project, rename it, and swap the data source.
 */
export { default as AnalyticsDashboard } from './AnalyticsDashboard';
export { default as SalesDashboard } from './SalesDashboard';
export { default as ProjectDashboard } from './ProjectDashboard';
export { default as MinimalDashboard } from './MinimalDashboard';
export { default as MonitoringDashboard } from './MonitoringDashboard';
export { default as ListPage } from './ListPage';
export { default as FormPage } from './FormPage';
export { default as DetailPage } from './DetailPage';
export { default as WizardPage } from './WizardPage';
export { default as ProfilePage } from './ProfilePage';
export { default as SettingsPage } from './SettingsPage';
export { default as AuditLogPage } from './AuditLogPage';
export { default as KanbanPage } from './KanbanPage';
export { default as CalendarPage } from './CalendarPage';
export { default as InboxPage } from './InboxPage';
export { default as FileManagerPage } from './FileManagerPage';
export { default as InvoiceListPage } from './InvoiceListPage';
export { default as InvoiceViewPage } from './InvoiceViewPage';
export { default as ReportPage } from './ReportPage';
export { default as PricingPage } from './PricingPage';
export { default as ErrorPage } from './ErrorPage';
export { default as SignInPage } from './SignInPage';
export { default as SignUpPage } from './SignUpPage';

/** Manifest used by the showcase's Templates gallery. */
export const TEMPLATES = [
  { key: 'analytics', name: 'Analytics Dashboard', group: 'Dashboards', icon: 'graph-up', path: '/templates/analytics', file: 'AnalyticsDashboard.jsx' },
  { key: 'sales', name: 'Sales Dashboard', group: 'Dashboards', icon: 'cash-stack', path: '/templates/sales', file: 'SalesDashboard.jsx' },
  { key: 'project', name: 'Project Dashboard', group: 'Dashboards', icon: 'kanban', path: '/templates/project', file: 'ProjectDashboard.jsx' },
  { key: 'minimal', name: 'Minimal Dashboard', group: 'Dashboards', icon: 'square', path: '/templates/minimal', file: 'MinimalDashboard.jsx' },
  { key: 'monitoring', name: 'Monitoring Dashboard', group: 'Dashboards', icon: 'activity', path: '/templates/monitoring', file: 'MonitoringDashboard.jsx' },
  { key: 'list', name: 'List Page', group: 'CRUD', icon: 'table', path: '/templates/list', file: 'ListPage.jsx' },
  { key: 'form', name: 'Create / Edit Form', group: 'CRUD', icon: 'input-cursor-text', path: '/templates/form', file: 'FormPage.jsx' },
  { key: 'detail', name: 'Detail Page', group: 'CRUD', icon: 'file-earmark-text', path: '/templates/detail', file: 'DetailPage.jsx' },
  { key: 'wizard', name: 'Wizard / Stepper', group: 'CRUD', icon: 'signpost-split', path: '/templates/wizard', file: 'WizardPage.jsx' },
  { key: 'profile', name: 'Profile Page', group: 'Records', icon: 'person-badge', path: '/templates/profile', file: 'ProfilePage.jsx' },
  { key: 'settings', name: 'Settings Page', group: 'Records', icon: 'gear', path: '/templates/settings', file: 'SettingsPage.jsx' },
  { key: 'audit', name: 'Audit Log', group: 'Records', icon: 'clock-history', path: '/templates/audit', file: 'AuditLogPage.jsx' },
  { key: 'kanban', name: 'Kanban Board', group: 'Work', icon: 'kanban', path: '/templates/kanban', file: 'KanbanPage.jsx' },
  { key: 'calendar', name: 'Calendar / Schedule', group: 'Work', icon: 'calendar3', path: '/templates/calendar', file: 'CalendarPage.jsx' },
  { key: 'inbox', name: 'Inbox / Chat', group: 'Work', icon: 'chat-dots', path: '/templates/inbox', file: 'InboxPage.jsx' },
  { key: 'files', name: 'File Manager', group: 'Work', icon: 'folder', path: '/templates/files', file: 'FileManagerPage.jsx' },
  { key: 'invoices', name: 'Invoice List', group: 'Documents', icon: 'receipt', path: '/templates/invoices', file: 'InvoiceListPage.jsx' },
  { key: 'invoice-view', name: 'Invoice View', group: 'Documents', icon: 'file-earmark-ruled', path: '/templates/invoice-view', file: 'InvoiceViewPage.jsx' },
  { key: 'report', name: 'Report Page', group: 'Documents', icon: 'bar-chart-line', path: '/templates/report', file: 'ReportPage.jsx' },
  { key: 'pricing', name: 'Pricing Page', group: 'Documents', icon: 'tags', path: '/templates/pricing', file: 'PricingPage.jsx' },
  { key: 'signin', name: 'Sign In', group: 'Auth', icon: 'box-arrow-in-right', path: '/templates/sign-in', file: 'SignInPage.jsx' },
  { key: 'signup', name: 'Sign Up', group: 'Auth', icon: 'person-plus', path: '/templates/sign-up', file: 'SignUpPage.jsx' },
  { key: 'error-404', name: '404 Not Found', group: 'Errors', icon: 'compass', path: '/templates/404', file: 'ErrorPage.jsx' },
  { key: 'error-403', name: '403 Forbidden', group: 'Errors', icon: 'shield-lock', path: '/templates/403', file: 'ErrorPage.jsx' },
  { key: 'error-500', name: '500 Server Error', group: 'Errors', icon: 'exclamation-octagon', path: '/templates/500', file: 'ErrorPage.jsx' },
  { key: 'maintenance', name: 'Maintenance', group: 'Errors', icon: 'tools', path: '/templates/maintenance', file: 'ErrorPage.jsx' },
];
