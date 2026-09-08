import { useState } from 'react';
import { ContentWrapper } from '../components/layout';
import { DataTable } from '../components/tables';
import { Badge } from '../components/feedback';
import { Button, ActionButton } from '../components/buttons';
import { ConfirmModal } from '../components/overlays';
import { Avatar } from '../components/display';
import { sampleRows, statusOptions, roleOptions, departmentOptions } from '../data/sampleTableData';
import { formatDate } from '../utils/format';

const statusVariant = { Active: 'success', Pending: 'warning', Inactive: 'danger' };

/** TEMPLATE — Standard CRUD list page: search, filters, bulk actions, row actions. */
export default function ListPage() {
  const [rows, setRows] = useState(sampleRows);
  const [pendingDelete, setPendingDelete] = useState(null);

  const columns = [
    {
      key: 'name', label: 'Name',
      render: (value, row) => (
        <div className="d-flex align-items-center gap-2">
          <Avatar name={value} size={32} />
          <div><div className="fw-semibold">{value}</div><div className="uikit-helper mt-0">{row.email}</div></div>
        </div>
      ),
    },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department' },
    { key: 'createdAt', label: 'Created', render: (v) => formatDate(v) },
    { key: 'status', label: 'Status', align: 'center', render: (v) => <Badge variant={statusVariant[v]} dot>{v}</Badge> },
  ];

  return (
    <ContentWrapper
      title="Records"
      subtitle="Browse, filter and manage entries"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Records' }]}
      actions={<><Button tone="soft" icon="upload">Import</Button><ActionButton action="create" /></>}
    >
      <DataTable
        columns={columns}
        data={rows}
        searchable
        pagination
        pageSize={8}
        selectable
        columnToggle
        exportable
        stickyHeader
        filters={[
          { key: 'status', label: 'Status', options: statusOptions },
          { key: 'role', label: 'Role', options: roleOptions },
          { key: 'department', label: 'Department', options: departmentOptions },
        ]}
        bulkActions={<><Button size="sm" tone="soft" icon="download">Export</Button><Button size="sm" variant="danger" icon="trash3">Delete</Button></>}
        actions={[
          { icon: 'eye', label: 'View' },
          { icon: 'pencil', label: 'Edit', variant: 'info' },
          { icon: 'trash3', label: 'Delete', variant: 'danger', onClick: (row) => setPendingDelete(row) },
        ]}
      />

      <ConfirmModal
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => { setRows((list) => list.filter((r) => r.id !== pendingDelete.id)); setPendingDelete(null); }}
        title={`Delete ${pendingDelete?.name}?`}
        message="This record will be removed from the list."
        confirmLabel="Delete"
      />
    </ContentWrapper>
  );
}
