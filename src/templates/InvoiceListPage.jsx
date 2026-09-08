import { ContentWrapper } from '../components/layout';
import { DataTable } from '../components/tables';
import { StatsCard } from '../components/cards';
import { Badge } from '../components/feedback';
import { Button, ActionButton } from '../components/buttons';
import { sampleRows } from '../data/sampleTableData';
import { formatCurrency, formatDate } from '../utils/format';

const statusMap = { Active: { label: 'Paid', variant: 'success' }, Pending: { label: 'Unpaid', variant: 'warning' }, Inactive: { label: 'Overdue', variant: 'danger' } };

const columns = [
  { key: 'id', label: 'Invoice', width: 110, render: (v) => <span className="fw-semibold">INV-{String(v).padStart(5, '0')}</span> },
  { key: 'name', label: 'Billed to' },
  { key: 'createdAt', label: 'Issued', render: (v) => formatDate(v) },
  { key: 'amount', label: 'Amount', align: 'right', total: 'sum', render: (v) => formatCurrency(v), formatTotal: (v) => formatCurrency(v) },
  { key: 'status', label: 'Status', align: 'center', render: (v) => <Badge variant={statusMap[v].variant} dot>{statusMap[v].label}</Badge> },
];

/** TEMPLATE — Invoice / billing list. */
export default function InvoiceListPage() {
  return (
    <ContentWrapper
      title="Invoices"
      subtitle="Billing documents and their payment status"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Invoices' }]}
      actions={<><Button tone="soft" icon="download">Export</Button><ActionButton action="create" label="New invoice" /></>}
    >
      <div className="row g-3 mb-1">
        <div className="col-6 col-xl-3"><StatsCard label="Total billed" value={formatCurrency(48210)} icon="receipt" variant="primary" /></div>
        <div className="col-6 col-xl-3"><StatsCard label="Paid" value={formatCurrency(31840)} icon="check2-circle" variant="success" /></div>
        <div className="col-6 col-xl-3"><StatsCard label="Unpaid" value={formatCurrency(12470)} icon="hourglass" variant="warning" /></div>
        <div className="col-6 col-xl-3"><StatsCard label="Overdue" value={formatCurrency(3900)} icon="exclamation-octagon" variant="danger" /></div>
      </div>

      <DataTable
        columns={columns}
        data={sampleRows}
        searchable
        pagination
        pageSize={10}
        selectable
        exportable
        showTotals
        filters={[{ key: 'status', label: 'Status', options: ['Active', 'Pending', 'Inactive'] }]}
        actions={[
          { icon: 'eye', label: 'View' },
          { icon: 'printer', label: 'Print' },
          { icon: 'send', label: 'Send', variant: 'info' },
        ]}
      />
    </ContentWrapper>
  );
}
