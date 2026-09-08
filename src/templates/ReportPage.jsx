import { useState } from 'react';
import { ContentWrapper } from '../components/layout';
import { Card, ChartCard, StatsCard } from '../components/cards';
import { BarChart, LineChart, PieChart } from '../components/charts';
import { DataTable } from '../components/tables';
import { SelectInput, DateRangePicker, MultiSelect } from '../components/forms';
import { Button } from '../components/buttons';
import { months, barDatasets, lineDatasets, pieLabels, pieData } from '../data/sampleChartData';
import { sampleRows, departmentOptions } from '../data/sampleTableData';
import { formatCurrency } from '../utils/format';

/** TEMPLATE — Report page: filter panel, charts and a totalled table. */
export default function ReportPage() {
  const [range, setRange] = useState({ from: '2026-01-01', to: '2026-08-31' });
  const [departments, setDepartments] = useState([]);

  return (
    <ContentWrapper
      title="Reports"
      subtitle="Filter, review and export"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Reports' }]}
      actions={<><Button tone="soft" icon="printer">Print</Button><Button icon="download">Export</Button></>}
    >
      <Card title="Filters" icon="funnel">
        <div className="row">
          <div className="col-md-4"><DateRangePicker label="Period" value={range} onChange={setRange} /></div>
          <div className="col-md-3"><SelectInput label="Report type" options={['Summary', 'Detailed', 'Comparison']} /></div>
          <div className="col-md-3"><MultiSelect label="Departments" options={departmentOptions} value={departments} onChange={setDepartments} /></div>
          <div className="col-md-2 d-flex align-items-end"><Button block className="mb-3" icon="search">Run report</Button></div>
        </div>
      </Card>

      <div className="row g-3">
        <div className="col-6 col-xl-3"><StatsCard label="Records" value="1,248" icon="collection" /></div>
        <div className="col-6 col-xl-3"><StatsCard label="Total value" value={formatCurrency(482150)} icon="cash" variant="success" /></div>
        <div className="col-6 col-xl-3"><StatsCard label="Average" value={formatCurrency(386)} icon="calculator" variant="info" /></div>
        <div className="col-6 col-xl-3"><StatsCard label="Departments" value="4" icon="building" variant="secondary" /></div>

        <div className="col-12 col-lg-8"><ChartCard title="By period" height={280}><BarChart labels={months} datasets={barDatasets} /></ChartCard></div>
        <div className="col-12 col-lg-4"><ChartCard title="Share" height={280}><PieChart labels={pieLabels} data={pieData} /></ChartCard></div>
        <div className="col-12"><ChartCard title="Trend" height={240}><LineChart labels={months} datasets={lineDatasets} area /></ChartCard></div>
      </div>

      <DataTable
        title="Detail"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'department', label: 'Department' },
          { key: 'createdAt', label: 'Date' },
          { key: 'amount', label: 'Amount', align: 'right', total: 'sum', render: (v) => formatCurrency(v), formatTotal: (v) => formatCurrency(v) },
        ]}
        data={sampleRows}
        pagination
        pageSize={8}
        exportable
        showTotals
      />
    </ContentWrapper>
  );
}
