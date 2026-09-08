import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

function buildRange(current, total, siblings = 1) {
  const pages = new Set([1, total]);
  for (let i = current - siblings; i <= current + siblings; i += 1) {
    if (i > 0 && i <= total) pages.add(i);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) result.push('…');
    result.push(page);
  });
  return result;
}

/** <Pagination page={2} totalPages={9} onChange={setPage} /> */
export default function Pagination({
  page = 1, totalPages = 1, onChange, size, siblings = 1,
  variant = 'numbered', hasMore = false, loading = false, onLoadMore, loadMoreLabel = 'Load more',
  className,
}) {
  if (variant === 'load-more') {
    if (!hasMore) return null;
    return (
      <div className={cn('text-center py-3', className)}>
        <button type="button" className="btn btn-light" disabled={loading} onClick={onLoadMore}>
          {loading ? <span className="spinner-border spinner-border-sm me-2" /> : <i className="bi bi-arrow-down-circle me-2" />}
          {loadMoreLabel}
        </button>
      </div>
    );
  }

  if (variant === 'simple') {
    return (
      <div className={cn('d-flex align-items-center justify-content-between gap-3', className)}>
        <button type="button" className="btn btn-light btn-sm" disabled={page === 1} onClick={() => onChange?.(page - 1)}>
          <i className="bi bi-chevron-left me-1" />Previous
        </button>
        <span className="small text-secondary-soft">Page {page} of {totalPages}</span>
        <button type="button" className="btn btn-light btn-sm" disabled={page === totalPages} onClick={() => onChange?.(page + 1)}>
          Next<i className="bi bi-chevron-right ms-1" />
        </button>
      </div>
    );
  }

  if (totalPages <= 1) return null;
  const go = (target) => target >= 1 && target <= totalPages && target !== page && onChange?.(target);

  return (
    <nav aria-label="Pagination">
      <ul className={cn('pagination mb-0', size && `pagination-${size}`, className)}>
        <li className={cn('page-item', page === 1 && 'disabled')}>
          <button type="button" className="page-link" onClick={() => go(page - 1)} aria-label="Previous">
            <i className="bi bi-chevron-left" />
          </button>
        </li>
        {buildRange(page, totalPages, siblings).map((item, index) =>
          item === '…' ? (
            <li className="page-item disabled" key={`gap-${index}`}>
              <span className="page-link">…</span>
            </li>
          ) : (
            <li className={cn('page-item', item === page && 'active')} key={item}>
              <button type="button" className="page-link" onClick={() => go(item)}>{item}</button>
            </li>
          )
        )}
        <li className={cn('page-item', page === totalPages && 'disabled')}>
          <button type="button" className="page-link" onClick={() => go(page + 1)} aria-label="Next">
            <i className="bi bi-chevron-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'lg']),
  siblings: PropTypes.number,
  variant: PropTypes.oneOf(['numbered', 'simple', 'load-more']),
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  onLoadMore: PropTypes.func,
  loadMoreLabel: PropTypes.string,
  className: PropTypes.string,
};
