import { useId } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import FormGroup from './FormGroup';

/**
 * <SelectInput label="Status" options={[{ value:'active', label:'Active' }]}
 *              value={v} onChange={fn} placeholder="Choose…" />
 * Options may also be plain strings.
 */
export default function SelectInput({
  id, label, options = [], value, onChange, placeholder = 'Select an option',
  required = false, disabled = false, error, helperText, size = 'md',
  multiple = false, horizontal = false, floating = false, inline = false, className, ...rest
}) {
  const autoId = useId();
  const inputId = id || `select-${autoId}`;
  const normalized = options.map((option) =>
    typeof option === 'object' ? option : { value: option, label: option }
  );

  return (
    <FormGroup id={inputId} label={label} required={required} error={error} helperText={helperText} horizontal={horizontal} floating={floating} inline={inline}>
      <select
        id={inputId}
        className={cn('form-select', size !== 'md' && `form-select-${size}`, error && 'is-invalid', className)}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        multiple={multiple}
        {...rest}
      >
        {!multiple && <option value="">{placeholder}</option>}
        {normalized.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </FormGroup>
  );
}

SelectInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.node,
  helperText: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  multiple: PropTypes.bool,
  horizontal: PropTypes.bool,
  floating: PropTypes.bool,
  inline: PropTypes.bool,
  className: PropTypes.string,
};
