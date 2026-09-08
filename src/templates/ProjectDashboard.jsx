import { ContentWrapper } from '../components/layout';
import { StatsCard, Card, ChartCard } from '../components/cards';
import { LineChart } from '../components/charts';
import { Timeline, AvatarGroup, ListGroup, CalendarWidget } from '../components/display';
import { Progress, Badge } from '../components/feedback';
import { Button } from '../components/buttons';
import { months, lineDatasets } from '../data/sampleChartData';
import { sampleTimeline, sampleRows } from '../data/sampleTableData';

/** TEMPLATE — Project / team dashboard. */
export default function ProjectDashboard() {
  return (
    <ContentWrapper
      title="Project overview"
      subtitle="Progress, workload and upcoming milestones"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Projects' }]}
      actions={<Button icon="plus-lg">New task</Button>}
    >
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-3"><StatsCard label="Open tasks" value="42" icon="list-check" variant="primary" /></div>
        <div className="col-12 col-sm-6 col-xl-3"><StatsCard label="In review" value="8" icon="eye" variant="warning" /></div>
        <div className="col-12 col-sm-6 col-xl-3"><StatsCard label="Completed" value="126" icon="check2-circle" variant="success" /></div>
        <div className="col-12 col-sm-6 col-xl-3"><StatsCard layout="progress" label="Sprint progress" value="64%" progress={64} icon="speedometer2" variant="info" /></div>

        <div className="col-12 col-lg-8">
          <ChartCard title="Burn-up" subtitle="Completed vs planned" height={280}>
            <LineChart labels={months} datasets={lineDatasets} />
          </ChartCard>
        </div>
        <div className="col-12 col-lg-4">
          <Card title="Team" icon="people" actions={<AvatarGroup users={sampleRows.slice(0, 5)} size={28} />}>
            <ListGroup
              variant="avatar"
              items={sampleRows.slice(0, 5).map((row) => ({
                title: row.name, subtitle: row.role,
                badge: <Badge variant={row.status === 'Active' ? 'success' : 'warning'} tone="soft">{row.status}</Badge>,
              }))}
            />
          </Card>
        </div>

        <div className="col-12 col-lg-4">
          <Card title="Milestones" icon="flag"><Timeline items={sampleTimeline} /></Card>
        </div>
        <div className="col-12 col-lg-4">
          <Card title="Schedule" icon="calendar3"><CalendarWidget /></Card>
        </div>
        <div className="col-12 col-lg-4">
          <Card title="Workload" icon="bar-chart-steps">
            {sampleRows.slice(0, 5).map((row, index) => (
              <Progress key={row.id} className="mb-3" label={row.name} value={[82, 64, 48, 35, 22][index]} showLabel />
            ))}
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
}
