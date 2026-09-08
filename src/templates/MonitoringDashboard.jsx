import { ContentWrapper } from '../components/layout';
import { StatsCard, Card, ChartCard } from '../components/cards';
import { LineChart, Sparkline } from '../components/charts';
import { CircularProgress, Progress, Badge, Alert, StatusDot } from '../components/feedback';
import { ListGroup, Timeline } from '../components/display';
import { months, lineDatasets } from '../data/sampleChartData';

const services = [
  { title: 'API gateway', subtitle: 'p95 128 ms', variant: 'success', status: 'Operational' },
  { title: 'Worker queue', subtitle: 'p95 340 ms', variant: 'success', status: 'Operational' },
  { title: 'Report builder', subtitle: 'p95 1.9 s', variant: 'warning', status: 'Degraded' },
  { title: 'File storage', subtitle: 'p95 96 ms', variant: 'success', status: 'Operational' },
];

/** TEMPLATE — System / uptime monitoring. */
export default function MonitoringDashboard() {
  return (
    <ContentWrapper title="System status" subtitle="Live health of the services you run" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Monitoring' }]}>
      <Alert variant="warning" title="One service is degraded">Report builder latency is above the 1.5 s threshold.</Alert>

      <div className="row g-3">
        <div className="col-12 col-md-6 col-xl-3">
          <Card className="text-center"><CircularProgress value={99.4} label="Uptime 30d" className="mx-auto" size={120} /></Card>
        </div>
        <div className="col-12 col-md-6 col-xl-3"><StatsCard layout="spark" label="Requests / min" value="4,182" icon="activity" variant="info" spark={<Sparkline data={[20, 26, 22, 30, 28, 34, 31, 38]} />} /></div>
        <div className="col-12 col-md-6 col-xl-3"><StatsCard layout="progress" label="CPU" value="46%" progress={46} icon="cpu" variant="primary" /></div>
        <div className="col-12 col-md-6 col-xl-3"><StatsCard layout="progress" label="Memory" value="71%" progress={71} icon="memory" variant="warning" /></div>

        <div className="col-12 col-lg-8">
          <ChartCard title="Latency" subtitle="p50 vs p95 (ms)" height={280}><LineChart labels={months} datasets={lineDatasets} /></ChartCard>
        </div>
        <div className="col-12 col-lg-4">
          <Card title="Services" icon="hdd-network">
            <ListGroup
              items={services.map((service) => ({
                title: service.title, subtitle: service.subtitle,
                badge: <Badge variant={service.variant} tone="soft"><StatusDot variant={service.variant} pulse /> {service.status}</Badge>,
              }))}
            />
          </Card>
        </div>

        <div className="col-12 col-lg-6">
          <Card title="Storage" icon="hdd">
            <Progress className="mb-3" label="Database" value={62} showLabel />
            <Progress className="mb-3" label="Object storage" value={88} variant="danger" showLabel />
            <Progress label="Backups" value="34" variant="info" showLabel />
          </Card>
        </div>
        <div className="col-12 col-lg-6">
          <Card title="Incident log" icon="clock-history">
            <Timeline
              items={[
                { title: 'Latency alert raised', description: 'Report builder p95 1.9 s', time: '09:41', variant: 'warning' },
                { title: 'Auto-scaled workers', description: '4 → 6 instances', time: '09:44', variant: 'info' },
                { title: 'Latency recovering', description: 'p95 back under 1.5 s', time: '10:02', variant: 'success' },
              ]}
            />
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
}
