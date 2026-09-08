import { ContentWrapper } from '@kit/components/layout';
import { StatsCard, ChartCard, Card, ActionCard } from '@kit/components/cards';
import { LineChart, DoughnutChart } from '@kit/components/charts';
import { ActivityFeed, Timeline, CalendarWidget } from '@kit/components/display';
import { DataTable } from '@kit/components/tables';
import { Badge } from '@kit/components/feedback';
import { Button } from '@kit/components/buttons';
import { months, lineDatasets, doughnutLabels, doughnutData } from '@kit/data/sampleChartData';
import { sampleRows, sampleActivity, sampleTimeline } from '@kit/data/sampleTableData';

const statusVariant = { Active: 'success', Pending: 'warning', Inactive: 'danger' };

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'department', label: 'Department' },
  {
    key: 'status',
    label: 'Status',
    render: (value) => <Badge variant={statusVariant[value]} dot>{value}</Badge>,
  },
];

/**
 * Demonstrates how the kit's pieces compose into a dashboard.
 * The data is generic placeholder data — there is no domain logic here.
 */
export default function Overview() {
  return (
    <ContentWrapper
      title="Overview"
      subtitle="A dashboard assembled entirely from the kit's reusable components"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Overview' }]}
      actions={<Button icon="plus-lg">Add Record</Button>}
    >
      <div className="row g-3 mb-1">
        {[
          { label: 'Total Records', value: '12,480', icon: 'collection', variant: 'primary', trend: { value: '+12.5%', direction: 'up', label: 'vs last month' } },
          { label: 'Active Items', value: '8,214', icon: 'check2-circle', variant: 'success', trend: { value: '+4.1%', direction: 'up', label: 'vs last month' } },
          { label: 'Pending Review', value: '326', icon: 'hourglass-split', variant: 'warning', trend: { value: '-2.4%', direction: 'down', label: 'vs last month' } },
          { label: 'Issues Raised', value: '48', icon: 'exclamation-octagon', variant: 'danger', trend: { value: '-8.9%', direction: 'down', label: 'vs last month' } },
        ].map((stat) => (
          <div className="col-12 col-sm-6 col-xl-3" key={stat.label}>
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-8">
          <ChartCard title="Trend" subtitle="Two generic series over eight periods" height={300}>
            <LineChart labels={months} datasets={lineDatasets} area />
          </ChartCard>
        </div>
        <div className="col-12 col-xl-4">
          <ChartCard title="Distribution" height={300}>
            <DoughnutChart labels={doughnutLabels} data={doughnutData} centerValue="100%" centerLabel="Total" />
          </ChartCard>
        </div>

        <div className="col-12 col-xl-8">
          <DataTable
            title="Latest Records"
            subtitle="DataTable with search and pagination"
            columns={columns}
            data={sampleRows}
            searchable
            pagination
            pageSize={5}
            actions={[
              { icon: 'eye', label: 'View' },
              { icon: 'pencil', label: 'Edit', variant: 'info' },
            ]}
          />
        </div>

        <div className="col-12 col-md-6 col-xl-4">
          <Card title="Recent Activity" icon="activity">
            <ActivityFeed items={sampleActivity} maxHeight={300} />
          </Card>
        </div>

        <div className="col-12 col-md-6 col-xl-4">
          <Card title="Process Timeline" icon="clock-history">
            <Timeline items={sampleTimeline} />
          </Card>
        </div>

        <div className="col-12 col-md-6 col-xl-4">
          <Card title="Calendar" icon="calendar3">
            <CalendarWidget events={{ [`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-12`]: 2 }} />
          </Card>
        </div>

        <div className="col-12 col-md-6 col-xl-4">
          <div className="row g-3">
            <div className="col-6">
              <ActionCard icon="folder-plus" title="New Folder" variant="primary" />
            </div>
            <div className="col-6">
              <ActionCard icon="upload" title="Import" variant="info" />
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
