import { ContentWrapper } from '../components/layout';
import { StatsCard, ChartCard, Card } from '../components/cards';
import { BarChart, PieChart } from '../components/charts';
import { DataTable } from '../components/tables';
import { Badge, Progress } from '../components/feedback';
import { Button } from '../components/buttons';
import { Avatar } from '../components/display';
import { months, barDatasets, pieLabels, pieData } from '../data/sampleChartData';
import { sampleRows } from '../data/sampleTableData';
import { formatCurrency } from '../utils/format';

const columns = [
  { key: 'name', label: 'Customer', render: (v, row) => (
      <div className="d-flex align-items-center gap-2">
        <Avatar name={v} size={30} />
        <div><div className="fw-semibold">{v}</div><div className="uikit-helper mt-0">{row.email}</div></div>
      </div>
    ) },
  { key: 'department', label: 'Channel' },
  { key: 'amount', label: 'Total', align: 'right', total: 'sum', render: (v) => formatCurrency(v), formatTotal: (v) => formatCurrency(v) },
  { key: 'status', label: 'Payment', align: 'center', render: (v) => (
      <Badge variant={{ Active: 'success', Pending: 'warning', Inactive: 'danger' }[v]} dot>{v === 'Active' ? 'Paid' : v === 'Pending' ? 'Pending' : 'Failed'}</Badge>
    ) },
];

/** TEMPLATE — Sales / POS dashboard. */
export default function SalesDashboard() {
  return (
    <ContentWrapper
      title="Sales"
      subtitle="Orders, revenue and payment status"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Sales' }]}
      actions={<Button icon="plus-lg">New order</Button>}
    >
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-3"><StatsCard layout="gradient" label="Revenue" value={formatCurrency(482150)} icon="cash-stack" trend={{ value: '+14.8%', direction: 'up', label: 'vs last month' }} /></div>
        <div className="col-12 col-sm-6 col-xl-3"><StatsCard label="Orders" value="1,284" icon="bag-check" variant="info" trend={{ value: '+92', direction: 'up' }} /></div>
        <div className="col-12 col-sm-6 col-xl-3"><StatsCard label="Avg. order" value={formatCurrency(375)} icon="receipt" variant="secondary" /></div>
        <div className="col-12 col-sm-6 col-xl-3"><StatsCard layout="ring" label="Target reached" value="68%" progress={68} variant="success" /></div>

        <div className="col-12 col-xl-8">
          <ChartCard title="Revenue by period" height={280}><BarChart labels={months} datasets={barDatasets} /></ChartCard>
        </div>
        <div className="col-12 col-xl-4">
          <ChartCard title="By channel" height={280}><PieChart labels={pieLabels} data={pieData} /></ChartCard>
        </div>

        <div className="col-12 col-lg-8">
          <DataTable title="Recent orders" columns={columns} data={sampleRows} pagination pageSize={6} searchable exportable showTotals />
        </div>
        <div className="col-12 col-lg-4">
          <Card title="Top products" icon="box-seam">
            {[
              { label: 'Item A', value: 68, amount: 128400 },
              { label: 'Item B', value: 52, amount: 96200 },
              { label: 'Item C', value: 37, amount: 71800 },
              { label: 'Item D', value: 24, amount: 42100 },
            ].map((item) => (
              <div className="mb-3" key={item.label}>
                <div className="d-flex justify-content-between small mb-1">
                  <span className="fw-semibold">{item.label}</span>
                  <span className="text-secondary-soft">{formatCurrency(item.amount)}</span>
                </div>
                <Progress value={item.value} />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
}
