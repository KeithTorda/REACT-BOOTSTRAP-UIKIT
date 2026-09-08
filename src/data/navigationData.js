/**
 * Sidebar configuration. Sidebar/NavMenu render entirely from this file —
 * swap it out per project, no JSX changes needed.
 *
 * Shape: [{ section, items: [{ label, icon, path, badge, children: [...] }] }]
 */
const navigationData = [
  {
    section: 'Overview',
    items: [
      { label: 'Overview', icon: 'speedometer2', path: '/' },
      { label: 'All Components', icon: 'grid', path: '/components' },
      { label: 'Templates', icon: 'layout-text-window-reverse', path: '/templates' },
    ],
  },
  {
    section: 'Components',
    items: [
      { label: 'Layout', icon: 'layout-sidebar', path: '/components/layout' },
      { label: 'Cards', icon: 'window-stack', path: '/components/cards' },
      { label: 'Forms', icon: 'input-cursor-text', path: '/components/forms' },
      { label: 'Tables', icon: 'table', path: '/components/tables' },
      { label: 'Buttons', icon: 'hand-index-thumb', path: '/components/buttons' },
      { label: 'Feedback', icon: 'chat-square-dots', path: '/components/feedback' },
      { label: 'Navigation', icon: 'signpost-split', path: '/components/navigation' },
      { label: 'Overlays', icon: 'layers', path: '/components/overlays' },
      { label: 'Charts', icon: 'bar-chart-line', path: '/components/charts' },
      { label: 'Data Display', icon: 'ui-checks-grid', path: '/components/display' },
      { label: 'Authentication', icon: 'shield-lock', path: '/components/auth' },
    ],
  },
  {
    section: 'Templates',
    items: [
      {
        label: 'Dashboards', icon: 'speedometer2',
        children: [
          { label: 'Analytics', path: '/templates/analytics' },
          { label: 'Sales', path: '/templates/sales' },
          { label: 'Project', path: '/templates/project' },
          { label: 'Minimal', path: '/templates/minimal' },
          { label: 'Monitoring', path: '/templates/monitoring' },
        ],
      },
      {
        label: 'CRUD', icon: 'table',
        children: [
          { label: 'List page', path: '/templates/list' },
          { label: 'Form page', path: '/templates/form' },
          { label: 'Detail page', path: '/templates/detail' },
          { label: 'Wizard', path: '/templates/wizard' },
        ],
      },
      {
        label: 'Records', icon: 'person-badge',
        children: [
          { label: 'Profile', path: '/templates/profile' },
          { label: 'Settings', path: '/templates/settings' },
          { label: 'Audit log', path: '/templates/audit' },
        ],
      },
      {
        label: 'Work', icon: 'kanban',
        children: [
          { label: 'Kanban board', path: '/templates/kanban' },
          { label: 'Calendar', path: '/templates/calendar' },
          { label: 'Inbox / chat', path: '/templates/inbox' },
          { label: 'File manager', path: '/templates/files' },
        ],
      },
      {
        label: 'Documents', icon: 'receipt',
        children: [
          { label: 'Invoice list', path: '/templates/invoices' },
          { label: 'Invoice view', path: '/templates/invoice-view' },
          { label: 'Report', path: '/templates/report' },
          { label: 'Pricing', path: '/templates/pricing' },
        ],
      },
      {
        label: 'Auth & errors', icon: 'shield-lock',
        children: [
          { label: 'Sign in', path: '/templates/sign-in' },
          { label: 'Sign up', path: '/templates/sign-up' },
          { label: '404', path: '/templates/404' },
          { label: '403', path: '/templates/403' },
          { label: '500', path: '/templates/500' },
          { label: 'Maintenance', path: '/templates/maintenance' },
        ],
      },
    ],
  },
  {
    section: 'Reference',
    items: [
      { label: 'Design Tokens', icon: 'palette', path: '/tokens' },
      { label: 'Cheatsheet', icon: 'journal-code', path: '/cheatsheet' },
      { label: 'Icons', icon: 'emoji-smile', path: '/icons' },
    ],
  },
];

export default navigationData;
