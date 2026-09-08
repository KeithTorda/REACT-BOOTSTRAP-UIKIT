import { useState } from 'react';
import { ContentWrapper } from '@kit/components/layout';
import { ShowcaseSection } from '@kit/components/docs';
import { Tabs, Accordion, Pagination } from '@kit/components/navigation';
import { Card } from '@kit/components/cards';
import { Badge } from '@kit/components/feedback';
import { Stepper } from '@kit/components/navigation';

export default function NavigationShowcase() {
  const [page, setPage] = useState(3);
  const steps = [
    { key: 's1', label: 'Details', icon: 'person', description: 'Who is applying' },
    { key: 's2', label: 'Documents', icon: 'paperclip', description: 'Supporting files' },
    { key: 's3', label: 'Review', icon: 'check2-circle', description: 'Confirm and submit' },
  ];

  const tabItems = [
    { key: 'overview', label: 'Overview', icon: 'grid', content: <p className="mb-0 text-secondary-soft">Generic overview panel content.</p> },
    { key: 'details', label: 'Details', icon: 'list-ul', content: <p className="mb-0 text-secondary-soft">Detail panel content.</p> },
    { key: 'history', label: 'History', icon: 'clock-history', badge: <Badge variant="primary" tone="soft">3</Badge>, content: <p className="mb-0 text-secondary-soft">History panel content.</p> },
    { key: 'disabled', label: 'Disabled', disabled: true, content: null },
  ];

  const accordionItems = [
    { key: 'a', title: 'First section', icon: 'info-circle', content: 'Accordion bodies accept any node — text, forms, tables.' },
    { key: 'b', title: 'Second section', icon: 'gear', content: 'Only one section opens at a time unless allowMultiple is set.' },
    { key: 'c', title: 'Third section', icon: 'shield-check', content: 'Fully React-state driven — no Bootstrap collapse JS.' },
  ];

  return (
    <ContentWrapper
      title="Navigation"
      subtitle="Tabs, Accordion, Pagination and the config-driven NavMenu"
      breadcrumb={[{ label: 'Components', path: '/components' }, { label: 'Navigation' }]}
    >
      <ShowcaseSection
        title="Tabs"
        description="Config-driven, controlled or uncontrolled, underline or pill styling."
        variants={['underline', 'pills', 'with icons', 'with badge']}
        code={`<Tabs\n  items={[\n    { key: 'overview', label: 'Overview', icon: 'grid', content: <Panel /> },\n    { key: 'details',  label: 'Details',  content: <Details /> },\n  ]}\n  variant="underline"\n  onChange={key => …}\n/>`}
        props={[
          { name: 'items', type: 'array', description: '{ key, label, icon, badge, content, disabled }' },
          { name: 'activeKey', type: 'string', description: 'Controlled mode.' },
          { name: 'defaultActiveKey', type: 'string', description: 'Uncontrolled initial tab.' },
          { name: 'variant', type: "'underline' | 'pills'", default: "'underline'", description: 'Visual style.' },
        ]}
      >
        <Card className="mb-3"><Tabs items={tabItems} /></Card>
        <Card className="mb-0"><Tabs items={tabItems} variant="pills" /></Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="Accordion"
        description="Collapsible sections; set allowMultiple to open several."
        variants={['single', 'multiple', 'with icons']}
        code={`<Accordion\n  items={[{ key: 'a', title: 'First section', icon: 'info-circle', content: '…' }]}\n  defaultOpenKeys={['a']}\n  allowMultiple\n/>`}
      >
        <div className="row g-3">
          <div className="col-md-6"><Accordion items={accordionItems} defaultOpenKeys={['a']} /></div>
          <div className="col-md-6"><Accordion items={accordionItems} allowMultiple defaultOpenKeys={['a', 'b']} /></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Pagination"
        description="Ellipsis-aware pager, used standalone or inside a DataTable."
        variants={['default', 'sm', 'lg']}
        code={`<Pagination page={page} totalPages={12} onChange={setPage} />`}
      >
        <div className="d-flex flex-column gap-3 align-items-start">
          <Pagination page={page} totalPages={12} onChange={setPage} />
          <Pagination page={page} totalPages={12} onChange={setPage} size="sm" />
          <Pagination page={2} totalPages={3} onChange={() => {}} size="lg" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="NavMenu"
        description="The recursive, config-driven menu the Sidebar renders. It reads the same array shape as src/data/navigationData.js — nested children collapse and expand automatically, and the active route highlights itself."
        variants={['sections', 'nested', 'collapsed']}
        code={`const menuItems = [\n  { label: 'Dashboard', icon: 'speedometer2', path: '/' },\n  {\n    label: 'Components', icon: 'grid',\n    children: [\n      { label: 'Cards',  path: '/components/cards' },\n      { label: 'Tables', path: '/components/tables' },\n    ],\n  },\n];\n\n<NavMenu items={menuItems} />`}
      >
        <p className="text-secondary-soft mb-0">
          The sidebar on the left of this page <strong>is</strong> <code>NavMenu</code>, rendered from{' '}
          <code>src/data/navigationData.js</code>. Replace that file to re-skin navigation for a new system — no JSX changes.
        </p>
      </ShowcaseSection>

      <ShowcaseSection
        title="Tab variants"
        description="Five looks from one component."
        variants={['underline', 'pills', 'boxed', 'vertical', 'icons']}
        code={`<Tabs items={items} variant="boxed" />\n<Tabs items={items} variant="vertical" />\n<Tabs items={items} variant="icons" />`}
        muted
      >
        <div className="row g-3">
          {['underline', 'pills', 'boxed', 'icons'].map((variant) => (
            <div className="col-lg-6" key={variant}>
              <Card className="mb-0" subtitle={variant}><Tabs items={tabItems.slice(0, 3)} variant={variant} /></Card>
            </div>
          ))}
          <div className="col-12">
            <Card className="mb-0" subtitle="vertical"><Tabs items={tabItems.slice(0, 3)} variant="vertical" /></Card>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Stepper"
        description="Progress through a multi-step flow — four presentations."
        variants={Stepper.VARIANTS}
        code={`<Stepper steps={steps} current={1} variant="horizontal" />\n<Stepper steps={steps} current={1} variant="vertical" />\n<Stepper steps={steps} current={1} variant="dots" />\n<Stepper steps={steps} current={1} variant="progress" />`}
        muted
      >
        <div className="row g-3">
          <div className="col-12"><Card className="mb-0" subtitle="horizontal"><Stepper steps={steps} current={1} /></Card></div>
          <div className="col-md-6"><Card className="mb-0 h-100" subtitle="vertical"><Stepper steps={steps} current={1} variant="vertical" /></Card></div>
          <div className="col-md-6">
            <Card className="mb-0 h-100" subtitle="dots & progress">
              <Stepper steps={steps} current={1} variant="dots" />
              <hr />
              <Stepper steps={steps} current={1} variant="progress" />
            </Card>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Pagination variants"
        description="Numbered pager, a simple prev/next and a load-more button."
        variants={['numbered', 'simple', 'load-more']}
        code={`<Pagination page={p} totalPages={12} onChange={setPage} />\n<Pagination variant="simple" page={p} totalPages={12} onChange={setPage} />\n<Pagination variant="load-more" hasMore loading={busy} onLoadMore={fetchMore} />`}
      >
        <div className="d-flex flex-column gap-3">
          <Pagination page={page} totalPages={12} onChange={setPage} />
          <Pagination variant="simple" page={page} totalPages={12} onChange={setPage} />
          <Pagination variant="load-more" hasMore onLoadMore={() => {}} />
        </div>
      </ShowcaseSection>

    </ContentWrapper>
  );
}
