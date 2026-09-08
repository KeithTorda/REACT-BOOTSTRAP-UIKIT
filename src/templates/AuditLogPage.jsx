import { ContentWrapper } from '../components/layout';
import { DataTable } from '../components/tables';
import { Badge } from '../components/feedback';
import { DetailList, Avatar } from '../components/display';
import { auditLog } from '../data/sampleAppData';

const actionVariant = { created: 'success', updated: 'info', deleted: 'danger', exported: 'secondary' };

const columns = [
  { key: 'at', label: 'When', width: 170 },
  { key: 'actor', label: 'Who', render: (v) => (<span className="d-inline-flex align-items-center gap-2"><Avatar name={v} size={26} />{v}</span>) },
  { key: 'action', label: 'Action', render: (v) => <Badge variant={actionVariant[v] || 'secondary'} tone="soft">{v}</Badge> },
  { key: 'entity', label: 'Target' },
  { key: 'field', label: 'Field' },
];

/** TEMPLATE — Audit trail with expandable before/after rows. */
export default function AuditLogPage() {
  return (
    <ContentWrapper title="Audit log" subtitle="Every change, who made it and when" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Audit log' }]}>
      <DataTable
        columns={columns}
        data={auditLog}
        searchable
        pagination
        pageSize={10}
        exportable
        stickyHeader
        expandable
        filters={[{ key: 'action', label: 'Action', options: ['created', 'updated', 'deleted', 'exported'] }]}
        renderExpanded={(row) => (
          <DetailList
            items={[
              { label: 'Entry', value: `#${row.id}` },
              { label: 'Previous value', value: row.from },
              { label: 'New value', value: row.to },
              { label: 'Recorded at', value: row.at },
            ]}
          />
        )}
      />
    </ContentWrapper>
  );
}
