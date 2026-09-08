import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** Compact search field used by toolbars and the DataTable. */
export default function SearchInput({
  value, onChange, placeholder = 'Search…', size = 'md', width, onClear, className, ...rest
}) {
  return (
    <div className={cn('input-group', size !== 'md' && `input-group-${size}`, className)} style={width ? { width } : undefined}>
      <span className="input-group-text bg-white border-end-0">
        <i className="bi bi-search text-secondary-soft" aria-hidden="true" />
      </span>
      <input
        type="search"
        className="form-control border-start-0 ps-0"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value, event)}
        aria-label={placeholder}
        {...rest}
      />
      {value && onClear && (
        <button type="button" className="btn btn-light border" onClick={onClear} aria-label="Clear search">
          <i className="bi bi-x-lg" />
        </button>
      )}
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClear: PropTypes.func,
  className: PropTypes.string,
};
