import { ContentWrapper } from '../components/layout';
import { StatsCard, ChartCard, Card } from '../components/cards';
import { LineChart, BarChart, DoughnutChart, Sparkline } from '../components/charts';
import { ActivityFeed, ListGroup } from '../components/display';
import { Button, ToggleGroup } from '../components/buttons';
import { Badge, Progress } from '../components/feedback';
import { months, lineDatasets, barDatasets, doughnutLabels, doughnutData } from '../data/sampleChartData';
import { sampleActivity } from '../data/sampleTableData';

/** TEMPLATE — Analytics dashboard. Copy, rename, replace the data source. */
export default function AnalyticsDashboard() {
  return (
    <ContentWrapper
      title="Analytics"
      subtitle="Traffic, conversion and engagement at a glance"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Analytics' }]}
      actions={<><ToggleGroup options={['7d', '30d', '90d']} defaultValue="30d" /><Button icon="download" tone="soft">Export</Button></>}
    >
      <div className="row g-3">
        {[
          { label: 'Sessions', value: '48,215', icon: 'graph-up', variant: 'primary', trend: { value: '+18.2%', direction: 'up' }, spark: [12, 18, 15, 24, 21, 30, 28, 36] },
          { label: 'Users', value: '12,480', icon: 'people', variant: 'info', trend: { value: '+6.4%', direction: 'up' }, spark: [8, 10, 9, 14, 13, 16, 18, 21] },
          { label: 'Conversion', value: '3.8%', icon: 'bullseye', variant: 'success', trend: { value: '+0.6pt', direction: 'up' }, spark: [2, 3, 2.5, 3.1, 3.4, 3.2, 3.6, 3.8] },
          { label: 'Bounce rate', value: '41.2%', icon: 'arrow-return-left', variant: 'danger', trend: { value: '-2.1pt', direction: 'down' }, spark: [50, 48, 47, 45, 44, 43, 42, 41] },
        ].map((stat) => (
          <div className="col-12 col-sm-6 col-xl-3" key={stat.label}>
            <StatsCard {...stat} layout="spark" spark={<Sparkline data={stat.spark} />} />
          </div>
        ))}

        <div className="col-12 col-xl-8">
          <ChartCard title="Traffic over time" subtitle="Sessions vs users" height={300}>
            <LineChart labels={months} datasets={lineDatasets} area />
          </ChartCard>
        </div>
        <div className="col-12 col-xl-4">
          <ChartCard title="Channels" height={300}>
            <DoughnutChart labels={doughnutLabels} data={doughnutData} centerValue="48.2k" centerLabel="Sessions" />
          </ChartCard>
        </div>

        <div className="col-12 col-lg-7">
          <ChartCard title="Acquisition by period" height={260}>
            <BarChart labels={months} datasets={barDatasets} />
          </ChartCard>
        </div>
        <div className="col-12 col-lg-5">
          <Card title="Top pages" icon="file-earmark">
            <ListGroup
              items={[
                { title: '/overview', subtitle: '12,204 views', meta: <Badge variant="success" tone="soft">+12%</Badge> },
                { title: '/records', subtitle: '8,981 views', meta: <Badge variant="success" tone="soft">+6%</Badge> },
                { title: '/reports', subtitle: '5,410 views', meta: <Badge variant="danger" tone="soft">-3%</Badge> },
                { title: '/settings', subtitle: '2,118 views', meta: <Badge variant="success" tone="soft">+1%</Badge> },
              ]}
            />
          </Card>
        </div>

        <div className="col-12 col-lg-5">
          <Card title="Goals" icon="flag">
            <Progress className="mb-3" label="Sign-ups" value={72} showLabel />
            <Progress className="mb-3" label="Activated" value={48} variant="info" showLabel />
            <Progress className="mb-3" label="Retained" value={31} variant="warning" showLabel />
            <Progress label="Referred" value={12} variant="secondary" showLabel />
          </Card>
        </div>
        <div className="col-12 col-lg-7">
          <Card title="Recent activity" icon="activity">
            <ActivityFeed items={sampleActivity} maxHeight={260} />
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
}
