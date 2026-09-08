import { ContentWrapper, PageHeader, Breadcrumb, Footer } from '@kit/components/layout';
import { ShowcaseSection } from '@kit/components/docs';
import { Card } from '@kit/components/cards';
import { Button, ActionButton } from '@kit/components/buttons';
import { useTheme } from '@kit/theme';
import { LAYOUT_PRESETS, SIDEBAR_STYLES, NAVBAR_STYLES } from '@kit/theme/themes';
import { cn } from '@kit/utils/cn';

export default function LayoutShowcase() {
  const { settings, set } = useTheme();

  return (
    <ContentWrapper
      title="Layout"
      subtitle="Sidebar, Navbar, PageHeader, Breadcrumb, ContentWrapper and Footer — the shell you are looking at"
      breadcrumb={[{ label: 'Components', path: '/components' }, { label: 'Layout' }]}
    >
      <ShowcaseSection
        title="AdminLayout"
        description="The responsive shell: fixed sidebar on desktop, an icon rail on tablet, an off-canvas drawer under 992px."
        variants={['fixed', 'collapsed rail', 'off-canvas']}
        code={`<BrowserRouter>\n  <Routes>\n    <Route element={\n      <AdminLayout\n        navigation={navigationData}\n        brand="Admin UI Kit"\n        user={{ name: 'John Doe', role: 'Administrator' }}\n        userMenu={[{ label: 'Profile', icon: 'person' }]}\n        notifications={notifications}\n      />\n    }>\n      <Route index element={<Overview />} />\n    </Route>\n  </Routes>\n</BrowserRouter>`}
        props={[
          { name: 'navigation', type: 'array', description: 'Sidebar config — see src/data/navigationData.js.' },
          { name: 'brand / brandIcon', type: 'node / string', description: 'Sidebar branding.' },
          { name: 'user / userMenu', type: 'object / array', description: 'Navbar profile dropdown.' },
          { name: 'notifications / messages', type: 'array', description: 'Navbar dropdowns; hidden when empty.' },
          { name: 'onSearch', type: 'func', description: 'Shows the navbar search field when provided.' },
        ]}
      >
        <p className="text-secondary-soft mb-2">
          This page is rendered inside <code>AdminLayout</code>. Use the toggle in the top-left to collapse the sidebar,
          and narrow the window below 992px to see it become an off-canvas drawer.
        </p>
        <div className="row g-3 mt-1">
          {[
            { icon: 'layout-sidebar-inset', title: 'Sidebar', text: 'Config-driven, collapsible, off-canvas on mobile.' },
            { icon: 'window', title: 'Navbar', text: 'Search, notifications, messages, profile menu.' },
            { icon: 'square-half', title: 'ContentWrapper', text: 'PageHeader + fluid or constrained container.' },
          ].map((item) => (
            <div className="col-md-4" key={item.title}>
              <Card className="mb-0 h-100">
                <i className={`bi bi-${item.icon} fs-4 text-secondary-soft`} />
                <h6 className="mt-2 mb-1">{item.title}</h6>
                <p className="text-secondary-soft small mb-0">{item.text}</p>
              </Card>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="PageHeader"
        description="Page title with the gradient accent bar, optional subtitle, breadcrumb and action buttons."
        variants={['title only', 'with breadcrumb', 'with actions']}
        code={`<PageHeader\n  title="Data Tables"\n  subtitle="Manage your records"\n  breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Tables' }]}\n  actions={<ActionButton action="create" />}\n/>`}
        muted
      >
        <PageHeader title="Simple Page Title" />
        <PageHeader
          title="With Everything"
          subtitle="Subtitle, breadcrumb and actions"
          breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Section', path: '/components' }, { label: 'Current' }]}
          actions={<><Button variant="light" icon="download">Export</Button><ActionButton action="create" /></>}
          className="mb-0"
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Breadcrumb"
        description="Router-aware trail; the last item renders as plain text."
        variants={['two level', 'three level']}
        code={`<Breadcrumb items={[\n  { label: 'Home', path: '/' },\n  { label: 'Components', path: '/components' },\n  { label: 'Layout' },\n]} />`}
      >
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Layout' }]} />
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Components', path: '/components' }, { label: 'Layout' }]} />
      </ShowcaseSection>

      <ShowcaseSection
        title="ContentWrapper & Footer"
        description="Page body container (it can render the PageHeader for you) and the layout footer."
        variants={['fluid', 'constrained']}
        code={`<ContentWrapper title="Page" subtitle="…" breadcrumb={[…]} actions={…}>\n  {children}\n</ContentWrapper>\n\n<Footer brand="Admin UI Kit" version="1.0.0"\n        links={[{ label: 'Docs', href: '#' }]} />`}
        muted
      >
        <Card className="mb-0" padded={false}>
          <Footer brand="Admin UI Kit" version="1.0.0" links={[{ label: 'Documentation' }, { label: 'Support' }]} className="px-3" />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="Layout presets"
        description="Switch the whole shell from the settings drawer — or set it once in ThemeProvider."
        variants={LAYOUT_PRESETS}
        code={`<ThemeProvider defaultSettings={{ layout: 'horizontal', sidebarStyle: 'dark' }}>\n  <AdminLayout navigation={nav} />\n</ThemeProvider>\n\n// or at runtime\nconst { set } = useTheme();\nset({ layout: 'rail', sidebarStyle: 'gradient' });`}
        muted
      >
        <div className="row g-3">
          {LAYOUT_PRESETS.map((preset) => (
            <div className="col-6 col-lg-4 col-xl-2" key={preset}>
              <Card
                className={cn('mb-0 h-100 text-center cursor-pointer', settings.layout === preset && 'border-primary')}
                hoverable
                onClick={() => set({ layout: preset })}
              >
                <div className="uikit-layout-preview" data-preset={preset}>
                  <span className="uikit-layout-preview__side" />
                  <span className="uikit-layout-preview__top" />
                  <span className="uikit-layout-preview__body" />
                </div>
                <div className="fw-semibold mt-2" style={{ fontSize: '.75rem' }}>{preset}</div>
              </Card>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sidebar & navbar styles"
        description="Five sidebar treatments and three navbar treatments — click to apply."
        variants={[...SIDEBAR_STYLES, ...NAVBAR_STYLES]}
        code={`set({ sidebarStyle: 'gradient', navbarStyle: 'dark' });`}
      >
        <div className="mb-3">
          <div className="form-label">Sidebar</div>
          <div className="d-flex flex-wrap gap-2">
            {SIDEBAR_STYLES.map((style) => (
              <Button key={style} tone={settings.sidebarStyle === style ? 'solid' : 'soft'} onClick={() => set({ sidebarStyle: style })}>{style}</Button>
            ))}
          </div>
        </div>
        <div>
          <div className="form-label">Navbar</div>
          <div className="d-flex flex-wrap gap-2">
            {NAVBAR_STYLES.map((style) => (
              <Button key={style} variant="secondary" tone={settings.navbarStyle === style ? 'solid' : 'soft'} onClick={() => set({ navbarStyle: style })}>{style}</Button>
            ))}
          </div>
        </div>
      </ShowcaseSection>

    </ContentWrapper>
  );
}
