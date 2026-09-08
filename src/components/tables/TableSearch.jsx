import PropTypes from 'prop-types';
import SearchInput from '../forms/SearchInput';

/** Search box for a table toolbar (thin wrapper over SearchInput). */
export default function TableSearch({ value, onChange, placeholder = 'Search records…', width = 260, className }) {
  return (
    <SearchInput
      value={value}
      onChange={onChange}
      onClear={() => onChange?.('')}
      placeholder={placeholder}
      size="sm"
      width={width}
      className={className}
    />
  );
}

TableSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
