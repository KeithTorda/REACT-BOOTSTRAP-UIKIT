import PropTypes from 'prop-types';
import TableSearch from './TableSearch';
import TableFilter from './TableFilter';
import { cn } from '../../utils/cn';

/** Header strip of a table: title, search, filters, actions. */
export default function TableToolbar({
  title, subtitle, search, onSearch, searchPlaceholder,
  filters = [], filterValues, onFilterChange, actions, selectedCount = 0, bulkActions, className,
}) {
  return (
    <div className={cn('uikit-table-toolbar', className)}>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div className="me-auto">
          {title && <h5 className="uikit-card__title">{title}</h5>}
          {subtitle && <p className="uikit-card__subtitle">{subtitle}</p>}
          {selectedCount > 0 && (
            <p className="uikit-card__subtitle">{selectedCount} selected</p>
          )}
        </div>
        {selectedCount > 0 && bulkActions ? (
          <div className="d-flex gap-2">{bulkActions}</div>
        ) : (
          <>
            {onSearch && <TableSearch value={search} onChange={onSearch} placeholder={searchPlaceholder} />}
            <TableFilter filters={filters} values={filterValues} onChange={onFilterChange} />
            {actions && <div className="d-flex gap-2">{actions}</div>}
          </>
        )}
      </div>
    </div>
  );
}

TableToolbar.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  search: PropTypes.string,
  onSearch: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  filters: PropTypes.array,
  filterValues: PropTypes.object,
  onFilterChange: PropTypes.func,
  actions: PropTypes.node,
  selectedCount: PropTypes.number,
  bulkActions: PropTypes.node,
  className: PropTypes.string,
};
