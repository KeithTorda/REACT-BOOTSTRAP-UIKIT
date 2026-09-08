import { ContentWrapper } from '@kit/components/layout';
import { ShowcaseSection } from '@kit/components/docs';
import { Card, StatsCard, InfoCard, ProfileCard, ChartCard, ActionCard } from '@kit/components/cards';
import { Button, IconButton } from '@kit/components/buttons';
import { Badge } from '@kit/components/feedback';
import { Dropdown } from '@kit/components/overlays';
import { BarChart } from '@kit/components/charts';
import { months, barDatasets } from '@kit/data/sampleChartData';
import { Sparkline } from '@kit/components/charts';

export default function CardShowcase() {
  return (
    <ContentWrapper
      title="Cards"
      subtitle="Surfaces: Card, StatsCard, InfoCard, ProfileCard, ChartCard, ActionCard"
      breadcrumb={[{ label: 'Components', path: '/components' }, { label: 'Cards' }]}
    >
      <ShowcaseSection
        title="Card"
        description="The base surface — header, body, footer, all optional."
        variants={['default', 'hoverable', 'flush', 'no-padding']}
        code={`<Card title="Panel Title" subtitle="Optional subtitle"\n      icon="window-stack"\n      actions={<IconButton icon="three-dots" />}\n      footer={<Button size="sm">Action</Button>}>\n  Body content\n</Card>`}
        props={[
          { name: 'title / subtitle', type: 'node', description: 'Header text. Header is hidden if both are absent.' },
          { name: 'actions', type: 'node', description: 'Right side of the header.' },
          { name: 'footer', type: 'node', description: 'Footer strip.' },
          { name: 'padded', type: 'bool', default: 'true', description: 'Set false for flush content such as tables.' },
          { name: 'hoverable', type: 'bool', default: 'false', description: 'Lift + deeper shadow on hover.' },
        ]}
        muted
      >
        <div className="row g-3">
          <div className="col-md-4">
            <Card title="Basic Card" subtitle="With subtitle" icon="window-stack" className="mb-0 h-100">
              <p className="mb-0 text-secondary-soft">Any content goes in the body.</p>
            </Card>
          </div>
          <div className="col-md-4">
            <Card title="With Actions" actions={<IconButton icon="three-dots-vertical" size="sm" label="More" />}
              footer={<Button size="sm" variant="light">Footer action</Button>} className="mb-0 h-100">
              <p className="mb-0 text-secondary-soft">Header actions and a footer strip.</p>
            </Card>
          </div>
          <div className="col-md-4">
            <Card hoverable className="mb-0 h-100">
              <h6>Hoverable</h6>
              <p className="mb-0 text-secondary-soft">No header — just a plain surface.</p>
            </Card>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="StatsCard"
        description="KPI tile with icon, value and optional trend."
        variants={['primary', 'success', 'warning', 'danger', 'info']}
        code={`<StatsCard\n  label="Total Records"\n  value="12,480"\n  icon="collection"\n  variant="primary"\n  trend={{ value: '+12.5%', direction: 'up', label: 'vs last month' }}\n/>`}
        muted
      >
        <div className="row g-3">
          {[
            { label: 'Total Records', value: '12,480', icon: 'collection', variant: 'primary', trend: { value: '+12.5%', direction: 'up', label: 'vs last month' } },
            { label: 'Approved', value: '8,214', icon: 'check2-circle', variant: 'success', trend: { value: '+4.1%', direction: 'up' } },
            { label: 'Pending', value: '326', icon: 'hourglass-split', variant: 'warning', trend: { value: '-2.4%', direction: 'down' } },
            { label: 'Rejected', value: '48', icon: 'x-octagon', variant: 'danger' },
          ].map((stat) => (
            <div className="col-12 col-sm-6 col-xl-3" key={stat.label}>
              <StatsCard {...stat} className="mb-0" />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="InfoCard & ProfileCard"
        description="Label/value summaries and person/entity cards."
        variants={['info', 'profile']}
        code={`<InfoCard title="Summary" items={[{ label: 'Reference', value: 'REF-0042' }]} />\n\n<ProfileCard\n  name="Jane Smith" role="Operations Lead" status="Active"\n  stats={[{ label: 'Items', value: 24 }]}\n  actions={<Button size="sm">Message</Button>}\n/>`}
        muted
      >
        <div className="row g-3">
          <div className="col-md-7">
            <InfoCard
              title="Record Summary"
              icon="info-circle"
              className="mb-0"
              items={[
                { label: 'Reference', value: 'REF-000482', icon: 'hash' },
                { label: 'Category', value: 'Category A', icon: 'tag' },
                { label: 'Owner', value: 'John Doe', icon: 'person' },
                { label: 'Status', value: <Badge variant="success" dot>Active</Badge>, icon: 'activity' },
                { label: 'Created', value: 'Jan 12, 2026', icon: 'calendar3' },
              ]}
            />
          </div>
          <div className="col-md-5">
            <ProfileCard
              className="mb-0"
              name="Jane Smith"
              role="Operations Lead"
              status="Active"
              meta={[{ label: 'email', icon: 'envelope', value: 'jane.smith@example.com' }, { label: 'phone', icon: 'telephone', value: '+1 555 0134' }]}
              stats={[{ label: 'Items', value: 24 }, { label: 'Teams', value: 3 }, { label: 'Reports', value: 12 }]}
              actions={<><Button size="sm" icon="chat-dots">Message</Button><Button size="sm" variant="light" icon="pencil">Edit</Button></>}
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="ChartCard & ActionCard"
        description="A card sized for a chart, and a call-to-action tile."
        variants={['chart', 'action', 'action-horizontal']}
        code={`<ChartCard title="Volume" toolbar={<Dropdown …/>} height={240}>\n  <BarChart labels={months} datasets={datasets} />\n</ChartCard>\n\n<ActionCard icon="folder-plus" title="New Folder"\n  description="Create a container"\n  action={{ label: 'Create', onClick: fn }} />`}
        muted
      >
        <div className="row g-3">
          <div className="col-lg-7">
            <ChartCard
              className="mb-0"
              title="Volume"
              subtitle="Generic series"
              height={240}
              toolbar={<Dropdown size="sm" label="This year" items={[{ label: 'This year' }, { label: 'Last year' }]} />}
            >
              <BarChart labels={months} datasets={barDatasets} />
            </ChartCard>
          </div>
          <div className="col-lg-5">
            <div className="row g-3">
              <div className="col-6">
                <ActionCard className="mb-0 h-100" icon="folder-plus" title="New Folder" description="Create a container" variant="primary" />
              </div>
              <div className="col-6">
                <ActionCard className="mb-0 h-100" icon="upload" title="Import" description="Upload a data file" variant="info" />
              </div>
              <div className="col-12">
                <ActionCard className="mb-0" horizontal icon="file-earmark-arrow-down" title="Export Data" description="Download the current view as a file" variant="secondary" action={{ label: 'Export', icon: 'download' }} />
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Card variants"
        description="Eight surface treatments — same component, one prop."
        variants={Card.VARIANTS}
        code={`<Card variant="elevated" title="Panel">…</Card>\n<Card variant="accent" accentColor="var(--info)">…</Card>\n<Card variant="gradient" title="Highlighted">…</Card>`}
        muted
      >
        <div className="row g-3">
          {Card.VARIANTS.filter((v) => v !== 'overlay').map((variant) => (
            <div className="col-6 col-lg-3" key={variant}>
              <Card variant={variant} title={variant} className="mb-0 h-100" accentColor={variant === 'accent' ? 'var(--info)' : undefined}>
                <p className="mb-0 small text-secondary-soft">Surface treatment</p>
              </Card>
            </div>
          ))}
          <div className="col-6 col-lg-3">
            <Card ribbon="New" className="mb-0 h-100" title="With ribbon"><p className="mb-0 small text-secondary-soft">Corner ribbon</p></Card>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="StatsCard layouts"
        description="Nine KPI layouts, all driven by the `layout` prop."
        variants={StatsCard.LAYOUTS}
        code={`<StatsCard layout="progress" label="Storage" value="68 GB" progress={68} icon="hdd" />\n<StatsCard layout="spark" label="Sessions" value="48,215" spark={<Sparkline data={data} />} />\n<StatsCard layout="split" label="Open" value="42" secondary={{ label: 'Closed', value: 126 }} />`}
        muted
      >
        <div className="row g-3">
          {StatsCard.LAYOUTS.map((layout, index) => (
            <div className="col-12 col-md-6 col-xl-4" key={layout}>
              <StatsCard
                className="mb-0"
                layout={layout}
                label={layout}
                value={['12,480', '8,214', '326', '48', '₱482k', '68 GB', '72%', '4,182', '42'][index]}
                icon={['collection', 'check2-circle', 'hourglass', 'x-octagon', 'cash', 'hdd', 'speedometer2', 'activity', 'inbox'][index]}
                variant={['primary', 'success', 'warning', 'danger', 'primary', 'info', 'success', 'secondary', 'primary'][index]}
                progress={68}
                trend={{ value: '+12.5%', direction: 'up' }}
                secondary={{ label: 'Closed', value: '126' }}
                spark={<Sparkline data={[12, 18, 15, 24, 21, 30, 28, 36]} />}
              />
            </div>
          ))}
        </div>
      </ShowcaseSection>

    </ContentWrapper>
  );
}
