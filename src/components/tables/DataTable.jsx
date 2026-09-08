import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import { getValue } from '../../utils/format';
import useTableData from '../../hooks/useTableData';
import useColumnVisibility from './useColumnVisibility';
import { downloadCsv } from './exportCsv';
import TableToolbar from './TableToolbar';
import TablePagination from './TablePagination';
import TableActions from './TableActions';
import EmptyState from '../feedback/EmptyState';
import SkeletonPreset from '../feedback/SkeletonPreset';
import Dropdown from '../overlays/Dropdown';
import IconButton from '../buttons/IconButton';

/**
 * Generic, configuration-driven table — the workhorse of the kit.
 *
 * const columns = [
 *   { key: 'name',  label: 'Name' },
 *   { key: 'email', label: 'Email' },
 *   { key: 'status', label: 'Status', align: 'center',
 *     render: (value, row) => <Badge>{value}</Badge> },
 *   { key: 'amount', label: 'Amount', align: 'right', total: 'sum' },
 * ];
 *
 * <DataTable columns={columns} data={rows} searchable sortable pagination selectable
 *            expandable renderExpanded={row => <Detail row={row} />}
 *            stickyHeader columnToggle exportable
 *            actions={[{ icon:'pencil', label:'Edit', onClick: fn }]} />
 *
 * Server-side: pass `serverSide` + `total` + `onQueryChange({page,pageSize,query,sort,filters})`
 * and DataTable stops filtering locally.
 */
export default function DataTable({
  columns = [],
  data = [],
  rowKey = 'id',
  title, subtitle,
  variant = 'default',
  searchable = false,
  searchPlaceholder,
  filters = [],
  sortable = true,
  pagination = false,
  pageSize = 10,
  selectable = false,
  onSelectionChange,
  expandable = false,
  renderExpanded,
  actions = [],
  actionsAs = 'buttons',
  actionsLabel = 'Actions',
  toolbarActions,
  bulkActions,
  loading = false,
  striped = false,
  hover = true,
  compact = false,
  bordered = false,
  stickyHeader = false,
  maxHeight,
  columnToggle = false,
  exportable = false,
  exportFilename = 'export.csv',
  showTotals = false,
  editable = false,
  onCellEdit,
  serverSide = false,
  total: serverTotal,
  onQueryChange,
  emptyState,
  onRowClick,
  className,
}) {
  const table = useTableData(serverSide ? [] : data, columns, { pageSize });
  const { visible: visibleColumns, hidden, toggle: toggleColumn } = useColumnVisibility(columns);
  const [selected, setSelected] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!serverSide) return;
    onQueryChange?.({
      page: table.page, pageSize: table.pageSize, query: table.query,
      sort: table.sort, filters: table.filters,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverSide, table.page, table.pageSize, table.query, table.sort, table.filters]);

  const rows = serverSide ? data : pagination ? table.rows : table.allFilteredRows;
  const rowTotal = serverSide ? (serverTotal ?? data.length) : table.total;
  const totalPages = serverSide ? Math.max(1, Math.ceil(rowTotal / table.pageSize)) : table.totalPages;
  const keyOf = (row, index) => getValue(row, rowKey) ?? index;

  const emit = (next) => {
    setSelected(next);
    onSelectionChange?.(next, data.filter((row, index) => next.includes(keyOf(row, index))));
  };
  const toggleRow = (key) => emit(selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key]);
  const visibleKeys = rows.map(keyOf);
  const allSelected = visibleKeys.length > 0 && visibleKeys.every((key) => selected.includes(key));
  const toggleAll = () => emit(allSelected ? selected.filter((k) => !visibleKeys.includes(k)) : [...new Set([...selected, ...visibleKeys])]);
  const toggleExpand = (key) => setExpanded((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]));

  const extraToolbar = (
    <>
      {toolbarActions}
      {columnToggle && (
        <Dropdown
          align="end"
          trigger={<IconButton icon="layout-three-columns" size="sm" variant="light" label="Columns" />}
          header="Columns"
        >
          {columns.map((column) => (
            <label key={column.key} className="uikit-dropdown__item mb-0" style={{ cursor: 'pointer' }}>
              <input type="checkbox" className="form-check-input m-0" checked={!hidden.includes(column.key)} onChange={() => toggleColumn(column.key)} />
              <span className="flex-grow-1">{column.label}</span>
            </label>
          ))}
        </Dropdown>
      )}
      {exportable && (
        <IconButton
          icon="download" size="sm" variant="light" label="Export CSV"
          onClick={() => downloadCsv(serverSide ? data : table.allFilteredRows, visibleColumns, exportFilename)}
        />
      )}
    </>
  );

  const showToolbar = Boolean(title || subtitle || searchable || filters.length || toolbarActions || columnToggle || exportable);
  const leadingCols = (selectable ? 1 : 0) + (expandable ? 1 : 0);
  const colSpan = visibleColumns.length + leadingCols + (actions.length ? 1 : 0);

  const totalsRow = showTotals && (
    <tr className="fw-semibold" style={{ background: 'var(--surface-muted)' }}>
      {Array.from({ length: leadingCols }).map((_, i) => <td key={`lead-${i}`} />)}
      {visibleColumns.map((column, index) => {
        const source = serverSide ? data : table.allFilteredRows;
        let content = index === 0 && !column.total ? 'Total' : '';
        if (column.total === 'sum') content = source.reduce((sum, row) => sum + (Number(getValue(row, column.key)) || 0), 0);
        if (column.total === 'count') content = source.length;
        if (column.total === 'avg') content = source.length ? (source.reduce((s, r) => s + (Number(getValue(r, column.key)) || 0), 0) / source.length).toFixed(2) : 0;
        if (typeof column.total === 'function') content = column.total(source);
        return <td key={column.key} style={{ textAlign: column.align }}>{column.formatTotal ? column.formatTotal(content) : content}</td>;
      })}
      {actions.length > 0 && <td />}
    </tr>
  );

  return (
    <div className={cn('uikit-card', className)}>
      {showToolbar && (
        <TableToolbar
          title={title}
          subtitle={subtitle}
          search={searchable ? table.query : undefined}
          onSearch={searchable ? table.search : undefined}
          searchPlaceholder={searchPlaceholder}
          filters={filters}
          filterValues={table.filters}
          onFilterChange={table.setFilter}
          actions={extraToolbar}
          selectedCount={selected.length}
          bulkActions={bulkActions}
        />
      )}

      <div
        className={cn('table-responsive', stickyHeader && 'uikit-table--sticky')}
        style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
      >
        <table
          className={cn(
            'table uikit-table',
            striped && 'table-striped',
            hover && 'table-hover',
            (compact || variant === 'dense') && 'table-sm',
            bordered && 'table-bordered',
            variant === 'cards' && 'uikit-table--cards'
          )}
        >
          <thead>
            <tr>
              {expandable && <th style={{ width: 44 }} />}
              {selectable && (
                <th style={{ width: 44 }}>
                  <input type="checkbox" className="form-check-input" checked={allSelected} onChange={toggleAll} aria-label="Select all rows" />
                </th>
              )}
              {visibleColumns.map((column) => {
                const isSorted = table.sort.key === column.key;
                const canSort = sortable && column.sortable !== false;
                return (
                  <th
                    key={column.key}
                    style={{ width: column.width, textAlign: column.align }}
                    className={cn(canSort && 'uikit-table__sortable', isSorted && 'is-sorted')}
                    onClick={canSort ? () => table.toggleSort(column.key) : undefined}
                  >
                    {column.label}
                    {canSort && <i className={`bi bi-${isSorted ? (table.sort.direction === 'asc' ? 'sort-up' : 'sort-down') : 'arrow-down-up'}`} />}
                  </th>
                );
              })}
              {actions.length > 0 && <th className="text-end" style={{ width: actionsAs === 'menu' ? 60 : 40 * actions.length + 24 }}>{actionsLabel}</th>}
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr><td colSpan={colSpan} className="p-3"><SkeletonPreset preset="table" rows={4} /></td></tr>
            )}

            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={colSpan}>
                  {emptyState || <EmptyState icon="inbox" title="No records found" description="Try adjusting your search or filters." />}
                </td>
              </tr>
            )}

            {!loading && rows.map((row, index) => {
              const key = keyOf(row, index);
              const isOpen = expanded.includes(key);
              return [
                <tr key={key} className={cn(onRowClick && 'cursor-pointer')} onClick={onRowClick ? () => onRowClick(row) : undefined}>
                  {expandable && (
                    <td onClick={(event) => event.stopPropagation()}>
                      <IconButton
                        icon={isOpen ? 'chevron-down' : 'chevron-right'}
                        size="sm" variant="light" label={isOpen ? 'Collapse' : 'Expand'}
                        onClick={() => toggleExpand(key)}
                      />
                    </td>
                  )}
                  {selectable && (
                    <td onClick={(event) => event.stopPropagation()}>
                      <input type="checkbox" className="form-check-input" checked={selected.includes(key)} onChange={() => toggleRow(key)} aria-label="Select row" />
                    </td>
                  )}
                  {visibleColumns.map((column) => {
                    const cellValue = getValue(row, column.key);
                    const canEdit = editable && column.editable !== false && !column.render;
                    const isEditing = editing?.key === key && editing?.column === column.key;
                    return (
                      <td
                        key={column.key}
                        style={{ textAlign: column.align }}
                        onDoubleClick={canEdit ? () => setEditing({ key, column: column.key }) : undefined}
                        className={cn(canEdit && 'uikit-table__editable')}
                      >
                        {isEditing ? (
                          <input
                            autoFocus
                            className="form-control form-control-sm"
                            defaultValue={cellValue ?? ''}
                            onBlur={(event) => { onCellEdit?.(row, column.key, event.target.value); setEditing(null); }}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') event.currentTarget.blur();
                              if (event.key === 'Escape') setEditing(null);
                            }}
                            onClick={(event) => event.stopPropagation()}
                          />
                        ) : column.render ? column.render(cellValue, row, index) : (cellValue ?? '—')}
                      </td>
                    );
                  })}
                  {actions.length > 0 && (
                    <td onClick={(event) => event.stopPropagation()}>
                      <TableActions row={row} actions={actions} as={actionsAs} />
                    </td>
                  )}
                </tr>,
                expandable && isOpen && (
                  <tr key={`${key}-expanded`} className="uikit-table__expanded">
                    <td colSpan={colSpan}>{renderExpanded?.(row)}</td>
                  </tr>
                ),
              ];
            })}

            {!loading && rows.length > 0 && totalsRow}
          </tbody>
        </table>
      </div>

      {pagination && !loading && rowTotal > 0 && (
        <TablePagination
          page={table.page}
          pageSize={table.pageSize}
          total={rowTotal}
          totalPages={totalPages}
          onPageChange={table.setPage}
          onPageSizeChange={table.setPageSize}
        />
      )}
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.node,
    render: PropTypes.func,
    align: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sortable: PropTypes.bool,
    searchable: PropTypes.bool,
    editable: PropTypes.bool,
    hidden: PropTypes.bool,
    total: PropTypes.oneOfType([PropTypes.oneOf(['sum', 'count', 'avg']), PropTypes.func]),
  })),
  data: PropTypes.array,
  rowKey: PropTypes.string,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'dense', 'cards']),
  searchable: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  filters: PropTypes.array,
  sortable: PropTypes.bool,
  pagination: PropTypes.bool,
  pageSize: PropTypes.number,
  selectable: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  expandable: PropTypes.bool,
  renderExpanded: PropTypes.func,
  actions: PropTypes.array,
  actionsAs: PropTypes.oneOf(['buttons', 'menu']),
  actionsLabel: PropTypes.node,
  toolbarActions: PropTypes.node,
  bulkActions: PropTypes.node,
  loading: PropTypes.bool,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  compact: PropTypes.bool,
  bordered: PropTypes.bool,
  stickyHeader: PropTypes.bool,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  columnToggle: PropTypes.bool,
  exportable: PropTypes.bool,
  exportFilename: PropTypes.string,
  showTotals: PropTypes.bool,
  editable: PropTypes.bool,
  onCellEdit: PropTypes.func,
  serverSide: PropTypes.bool,
  total: PropTypes.number,
  onQueryChange: PropTypes.func,
  emptyState: PropTypes.node,
  onRowClick: PropTypes.func,
  className: PropTypes.string,
};
