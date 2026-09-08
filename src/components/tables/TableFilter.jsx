import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * Config-driven select filters.
 * <TableFilter filters={[{ key:'status', label:'Status', options:[…] }]} values={v} onChange={fn} />
 */
export default function TableFilter({ filters = [], values = {}, onChange, className }) {
  if (!filters.length) return null;
  return (
    <div className={cn('d-flex flex-wrap gap-2', className)}>
      {filters.map((filter) => (
        <select
          key={filter.key}
          className="form-select form-select-sm"
          style={{ width: filter.width || 160 }}
          value={values[filter.key] ?? ''}
          onChange={(event) => onChange?.(filter.key, event.target.value)}
          aria-label={filter.label}
        >
          <option value="">{filter.placeholder || `All ${filter.label}`}</option>
          {filter.options.map((option) => {
            const item = typeof option === 'object' ? option : { value: option, label: option };
            return <option key={item.value} value={item.value}>{item.label}</option>;
          })}
        </select>
      ))}
    </div>
  );
}

TableFilter.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  values: PropTypes.object,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
