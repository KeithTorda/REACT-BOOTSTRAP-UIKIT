import { ContentWrapper } from '../components/layout';
import { StatsCard, Card } from '../components/cards';
import { DataTable } from '../components/tables';
import { Badge } from '../components/feedback';
import { sampleRows } from '../data/sampleTableData';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status', render: (v) => <Badge variant={{ Active: 'success', Pending: 'warning', Inactive: 'danger' }[v]} dot>{v}</Badge> },
];

/** TEMPLATE — Minimal dashboard: four numbers and one table. */
export default function MinimalDashboard() {
  return (
    <ContentWrapper title="Dashboard" subtitle="A deliberately small starting point">
      <div className="row g-3 mb-1">
        {[
          { label: 'Records', value: '1,248', icon: 'collection' },
          { label: 'Active', value: '824', icon: 'check2-circle', variant: 'success' },
          { label: 'Pending', value: '96', icon: 'hourglass', variant: 'warning' },
          { label: 'Archived', value: '328', icon: 'archive', variant: 'secondary' },
        ].map((stat) => (
          <div className="col-6 col-xl-3" key={stat.label}>
            <StatsCard layout="icon-top" {...stat} />
          </div>
        ))}
      </div>
      <DataTable title="Records" columns={columns} data={sampleRows} searchable pagination pageSize={8} />
      <Card title="Notes"><p className="text-secondary-soft mb-0">Replace this block with whatever the system needs.</p></Card>
    </ContentWrapper>
  );
}
