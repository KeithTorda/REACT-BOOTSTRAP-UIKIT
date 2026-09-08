import { useState } from 'react';
import { ContentWrapper } from '@kit/components/layout';
import { ShowcaseSection } from '@kit/components/docs';
import { DataTable } from '@kit/components/tables';
import { Badge, EmptyState } from '@kit/components/feedback';
import { Button, ActionButton } from '@kit/components/buttons';
import { Avatar } from '@kit/components/display';
import { sampleRows, statusOptions, roleOptions, departmentOptions } from '@kit/data/sampleTableData';
import { formatCurrency, formatDate } from '@kit/utils/format';

const statusVariant = { Active: 'success', Pending: 'warning', Inactive: 'danger' };

const baseColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status', render: (value) => <Badge variant={statusVariant[value]} dot>{value}</Badge> },
];

const richColumns = [
  {
    key: 'name',
    label: 'Name',
    render: (value, row) => (
      <div className="d-flex align-items-center gap-2">
        <Avatar name={value} size={32} />
        <div>
          <div className="fw-semibold">{value}</div>
          <div className="uikit-helper mt-0">{row.email}</div>
        </div>
      </div>
    ),
  },
  { key: 'department', label: 'Department' },
  { key: 'role', label: 'Role' },
  { key: 'amount', label: 'Amount', align: 'right', render: (value) => formatCurrency(value) },
  { key: 'createdAt', label: 'Created', render: (value) => formatDate(value) },
  { key: 'status', label: 'Status', align: 'center', render: (value) => <Badge variant={statusVariant[value]} dot>{value}</Badge> },
];

export default function TableShowcase() {
  const [selected, setSelected] = useState([]);

  return (
    <ContentWrapper
      title="Tables"
      subtitle="One DataTable covers search, sort, filter, pagination, selection, row actions and empty states"
      breadcrumb={[{ label: 'Components', path: '/components' }, { label: 'Tables' }]}
    >
      <ShowcaseSection
        title="Basic Table"
        description="Columns and rows only — sorting is on by default."
        variants={['basic', 'striped', 'compact']}
        code={`const columns = [\n  { key: 'name',  label: 'Name' },\n  { key: 'email', label: 'Email' },\n  { key: 'status', label: 'Status',\n    render: value => <Badge>{value}</Badge> },\n];\n\n<DataTable columns={columns} data={rows} />`}
        props={[
          { name: 'columns', type: 'array', description: '{ key, label, render, align, width, sortable, searchable }' },
          { name: 'data', type: 'array', description: 'Any array of objects.' },
          { name: 'searchable', type: 'bool', default: 'false', description: 'Shows the toolbar search box.' },
          { name: 'filters', type: 'array', description: '{ key, label, options } select filters.' },
          { name: 'pagination', type: 'bool', default: 'false', description: 'Enables the pager and page-size select.' },
          { name: 'selectable', type: 'bool', default: 'false', description: 'Row checkboxes + `onSelectionChange`.' },
          { name: 'actions', type: 'array', description: '{ icon, label, variant, onClick } per-row actions.' },
          { name: 'actionsAs', type: "'buttons' | 'menu'", default: "'buttons'", description: 'Inline icons or a kebab menu.' },
          { name: 'loading / emptyState', type: 'bool / node', description: 'Loading and empty rendering.' },
        ]}
        muted
      >
        <DataTable columns={baseColumns} data={sampleRows.slice(0, 5)} className="mb-0" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Searchable, Filterable & Paginated"
        description="Toolbar search, config-driven select filters, page-size control — all client-side."
        variants={['search', 'filters', 'pagination', 'toolbar actions']}
        code={`<DataTable\n  title="Records"\n  columns={columns}\n  data={rows}\n  searchable\n  pagination\n  pageSize={5}\n  filters={[\n    { key: 'status', label: 'Status', options: statusOptions },\n    { key: 'role', label: 'Role', options: roleOptions },\n  ]}\n  toolbarActions={<ActionButton action="create" />}\n/>`}
        muted
      >
        <DataTable
          className="mb-0"
          title="Records"
          subtitle="Search, filter and page through generic data"
          columns={richColumns}
          data={sampleRows}
          searchable
          pagination
          pageSize={5}
          filters={[
            { key: 'status', label: 'Status', options: statusOptions },
            { key: 'role', label: 'Role', options: roleOptions },
            { key: 'department', label: 'Department', options: departmentOptions },
          ]}
          toolbarActions={<><ActionButton action="export" size="sm" /><ActionButton action="create" size="sm" /></>}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Selection & Row Actions"
        description="Checkbox selection with bulk actions, plus per-row action buttons or a kebab menu."
        variants={['selectable', 'bulk actions', 'menu actions']}
        code={`<DataTable\n  columns={columns} data={rows}\n  selectable onSelectionChange={setSelected}\n  bulkActions={<Button variant="danger" icon="trash3">Delete selected</Button>}\n  actions={[\n    { icon: 'eye', label: 'View', onClick: fn },\n    { icon: 'pencil', label: 'Edit', variant: 'info', onClick: fn },\n    { icon: 'trash3', label: 'Delete', variant: 'danger', onClick: fn },\n  ]}\n/>`}
        muted
      >
        <DataTable
          className="mb-0"
          title="Selectable Table"
          subtitle={selected.length ? `${selected.length} row(s) selected` : 'Tick rows to reveal bulk actions'}
          columns={baseColumns}
          data={sampleRows.slice(0, 6)}
          selectable
          onSelectionChange={setSelected}
          bulkActions={<><Button size="sm" variant="light" icon="download">Export</Button><Button size="sm" variant="danger" icon="trash3">Delete</Button></>}
          actions={[
            { icon: 'eye', label: 'View' },
            { icon: 'pencil', label: 'Edit', variant: 'info' },
            { icon: 'trash3', label: 'Delete', variant: 'danger' },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Loading & Empty States"
        description="Built in — no extra wiring needed."
        variants={['loading', 'empty', 'custom empty']}
        code={`<DataTable columns={columns} data={[]} loading />\n\n<DataTable columns={columns} data={[]}\n  emptyState={<EmptyState icon="folder2-open" title="No records"\n              action={{ label: 'Add', onClick: fn }} />} />`}
        muted
      >
        <div className="row g-3">
          <div className="col-lg-6">
            <DataTable className="mb-0" columns={baseColumns.slice(0, 3)} data={[]} loading />
          </div>
          <div className="col-lg-6">
            <DataTable
              className="mb-0"
              columns={baseColumns.slice(0, 3)}
              data={[]}
              emptyState={<EmptyState icon="folder2-open" title="No records yet" description="Create the first entry to get started." action={{ label: 'Add Record', icon: 'plus-lg' }} />}
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Table styles"
        description="Six visual treatments driven by props."
        variants={['basic', 'striped', 'bordered', 'dense', 'sticky header', 'card rows']}
        code={`<DataTable striped />\n<DataTable bordered />\n<DataTable variant="dense" />\n<DataTable stickyHeader maxHeight={300} />\n<DataTable variant="cards" />`}
        muted
      >
        <div className="row g-3">
          <div className="col-lg-6"><DataTable className="mb-0" title="Striped" striped columns={baseColumns.slice(0, 3)} data={sampleRows.slice(0, 4)} /></div>
          <div className="col-lg-6"><DataTable className="mb-0" title="Bordered + dense" bordered variant="dense" columns={baseColumns.slice(0, 3)} data={sampleRows.slice(0, 4)} /></div>
          <div className="col-lg-6"><DataTable className="mb-0" title="Sticky header" stickyHeader maxHeight={220} columns={baseColumns.slice(0, 3)} data={sampleRows} /></div>
          <div className="col-lg-6"><DataTable className="mb-0" title="Card rows" variant="cards" hover={false} columns={baseColumns.slice(0, 3)} data={sampleRows.slice(0, 4)} /></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Expandable rows, totals, column toggle & export"
        description="Turn each on with a single prop. Double-click a cell to edit when `editable` is set."
        variants={['expandable', 'totals', 'column toggle', 'CSV export', 'inline edit']}
        code={`<DataTable\n  expandable renderExpanded={row => <DetailList items={…} />}\n  showTotals columnToggle exportable\n  editable onCellEdit={(row, key, value) => save(row, key, value)}\n/>\n\n// column totals: { key:'amount', total:'sum' | 'count' | 'avg' | fn }`}
        muted
      >
        <DataTable
          className="mb-0"
          title="Full-feature table"
          subtitle="Expand a row, hide a column, export to CSV, double-click a cell to edit"
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'department', label: 'Department' },
            { key: 'amount', label: 'Amount', align: 'right', total: 'sum', render: (v) => formatCurrency(v), formatTotal: (v) => formatCurrency(v) },
            { key: 'status', label: 'Status', align: 'center', sortable: false, render: (v) => <Badge variant={statusVariant[v]} dot>{v}</Badge> },
          ]}
          data={sampleRows}
          searchable pagination pageSize={6}
          expandable columnToggle exportable showTotals editable stickyHeader
          renderExpanded={(row) => (
            <div className="row">
              <div className="col-md-6"><strong className="d-block mb-2">Contact</strong><div className="small text-secondary-soft">{row.email}</div></div>
              <div className="col-md-6"><strong className="d-block mb-2">Created</strong><div className="small text-secondary-soft">{row.createdAt}</div></div>
            </div>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Server-side mode"
        description="Pass `serverSide`, `total` and `onQueryChange` and the table stops filtering locally — it just reports what the user asked for."
        code={`const [rows, setRows] = useState([]);\nconst [total, setTotal] = useState(0);\n\n<DataTable\n  serverSide\n  data={rows}\n  total={total}\n  pagination searchable\n  onQueryChange={async ({ page, pageSize, query, sort, filters }) => {\n    const res = await api.list({ page, pageSize, q: query, sort, filters });\n    setRows(res.rows); setTotal(res.total);\n  }}\n/>`}
      >
        <p className="text-secondary-soft mb-0">
          The callback fires whenever the page, page size, search text, sort or filters change — wire it straight to your API.
        </p>
      </ShowcaseSection>

    </ContentWrapper>
  );
}
