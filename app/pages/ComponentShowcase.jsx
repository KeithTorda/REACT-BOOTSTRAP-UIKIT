import { Link } from 'react-router-dom';
import { ContentWrapper } from '@kit/components/layout';
import { Card } from '@kit/components/cards';
import { Badge } from '@kit/components/feedback';

const CATEGORIES = [
  { title: 'Layout', icon: 'layout-sidebar', path: '/components/layout', count: 9, variants: 26, items: ['Sidebar', 'Navbar', 'Header', 'Breadcrumb', 'PageHeader', 'ContentWrapper', 'Footer', 'ThemeCustomizer', 'ThemeToggle'] },
  { title: 'Cards', icon: 'window-stack', path: '/components/cards', count: 6, variants: 24, items: ['Card', 'StatsCard', 'InfoCard', 'ProfileCard', 'ChartCard', 'ActionCard'] },
  { title: 'Forms', icon: 'input-cursor-text', path: '/components/forms', count: 25, variants: 34, items: ['TextInput', 'TextArea', 'RichTextArea', 'SelectInput', 'MultiSelect', 'Autocomplete', 'TagsInput', 'PasswordInput', 'OTPInput', 'NumberStepper', 'MaskedInput', 'RangeSlider', 'Rating', 'ColorPicker', 'DateInput', 'DateRangePicker', 'FileUpload', 'RepeaterField', 'FormWizard'] },
  { title: 'Tables', icon: 'table', path: '/components/tables', count: 6, variants: 18, items: ['DataTable', 'TableToolbar', 'TableSearch', 'TableFilter', 'TablePagination', 'TableActions'] },
  { title: 'Buttons', icon: 'hand-index-thumb', path: '/components/buttons', count: 9, variants: 22, items: ['Button', 'IconButton', 'ActionButton', 'ButtonGroup', 'SplitButton', 'Fab', 'ToggleGroup', 'CopyButton', 'SocialButton'] },
  { title: 'Feedback', icon: 'chat-square-dots', path: '/components/feedback', count: 11, variants: 23, items: ['Alert', 'Badge', 'StatusDot', 'Toast', 'Spinner', 'Skeleton', 'SkeletonPreset', 'Progress', 'CircularProgress', 'EmptyState', 'ErrorState'] },
  { title: 'Navigation', icon: 'signpost-split', path: '/components/navigation', count: 5, variants: 18, items: ['Tabs', 'Accordion', 'Pagination', 'Stepper', 'NavMenu'] },
  { title: 'Overlays', icon: 'layers', path: '/components/overlays', count: 9, variants: 16, items: ['Modal', 'ConfirmModal', 'Drawer', 'Dropdown', 'Tooltip', 'Popover', 'ContextMenu', 'CommandPalette', 'Lightbox'] },
  { title: 'Charts', icon: 'bar-chart-line', path: '/components/charts', count: 8, variants: 14, items: ['LineChart', 'BarChart', 'PieChart', 'DoughnutChart', 'RadarChart', 'PolarChart', 'ScatterChart', 'Sparkline'] },
  { title: 'Data Display', icon: 'ui-checks-grid', path: '/components/display', count: 16, variants: 20, items: ['Avatar', 'AvatarGroup', 'DetailList', 'ListGroup', 'Timeline', 'ActivityFeed', 'MessageList', 'NotificationDropdown', 'CalendarWidget', 'InvoiceLayout', 'KanbanBoard', 'FileManager', 'ChatPanel', 'CommentThread', 'PricingCard', 'Gallery'] },
  { title: 'Authentication', icon: 'shield-lock', path: '/components/auth', count: 7, variants: 10, items: ['AuthCard', 'LoginCard', 'RegisterCard', 'ForgotPasswordCard', 'ResetPasswordCard', 'OTPVerifyCard', 'LockScreenCard'] },
  { title: 'Page Templates', icon: 'layout-text-window-reverse', path: '/templates', count: 26, variants: 26, items: ['Dashboards', 'CRUD', 'Profile', 'Settings', 'Kanban', 'Calendar', 'Inbox', 'Files', 'Invoices', 'Reports', 'Auth', 'Errors'] },
  { title: 'Design Tokens', icon: 'palette', path: '/tokens', count: 40, variants: 8, items: ['Colours', 'Dark mode', '8 themes', 'Typography', 'Radii', 'Shadows', 'Metrics', 'Density'] },
  { title: 'Cheatsheet', icon: 'journal-code', path: '/cheatsheet', count: 100, variants: 0, items: ['Every component', 'One-line usage', 'Copy button', 'Searchable'] },
];

/** Index of the whole library. */
export default function ComponentShowcase() {
  const total = CATEGORIES.reduce((sum, category) => sum + category.count, 0);
  const variants = CATEGORIES.reduce((sum, category) => sum + (category.variants || 0), 0);

  return (
    <ContentWrapper
      title="Component Showcase"
      subtitle={`${total} components and ~${variants} variants across ${CATEGORIES.length} categories — every one previewed with copyable usage`}
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Components' }]}
    >
      <div className="row g-3">
        {CATEGORIES.map((category) => (
          <div className="col-12 col-md-6 col-xl-4" key={category.title}>
            <Link to={category.path} className="text-decoration-none">
              <Card hoverable className="h-100">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="uikit-stats__icon" style={{ width: 44, height: 44, fontSize: 18, background: 'var(--primary-soft)', color: 'var(--primary-dark)' }}>
                    <i className={`bi bi-${category.icon}`} aria-hidden="true" />
                  </span>
                  <div className="flex-grow-1">
                    <h6 className="mb-0">{category.title}</h6>
                    <span className="uikit-helper mt-0">{category.count} components{category.variants ? ` · ${category.variants} variants` : ''}</span>
                  </div>
                  <i className="bi bi-arrow-right text-secondary-soft" aria-hidden="true" />
                </div>
                <div className="d-flex flex-wrap gap-1">
                  {category.items.slice(0, 6).map((item) => (
                    <Badge key={item} tone="soft" variant="secondary">{item}</Badge>
                  ))}
                  {category.items.length > 6 && <Badge tone="soft" variant="light">+{category.items.length - 6}</Badge>}
                </div>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </ContentWrapper>
  );
}
