import PropTypes from 'prop-types';
import Pagination from '../navigation/Pagination';
import { cn } from '../../utils/cn';

/** Footer strip: "showing x–y of z", page-size selector and pager. */
export default function TablePagination({
  page = 1, pageSize = 10, total = 0, totalPages = 1,
  onPageChange, onPageSizeChange, pageSizeOptions = [10, 25, 50, 100], className,
}) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className={cn('d-flex flex-wrap align-items-center justify-content-between gap-2 px-3 py-3 border-top', className)}>
      <div className="d-flex align-items-center gap-2 small text-secondary-soft">
        <span>Showing {from}–{to} of {total}</span>
        {onPageSizeChange && (
          <select
            className="form-select form-select-sm"
            style={{ width: 78 }}
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            aria-label="Rows per page"
          >
            {pageSizeOptions.map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} size="sm" />
    </div>
  );
}

TablePagination.propTypes = {
  page: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  pageSizeOptions: PropTypes.array,
  className: PropTypes.string,
};
