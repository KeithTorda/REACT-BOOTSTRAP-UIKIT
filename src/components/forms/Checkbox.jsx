import { useId } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** <Checkbox label="Remember me" checked={v} onChange={fn} /> */
export default function Checkbox({
  id, label, checked, onChange, name, value, required = false, disabled = false,
  error, helperText, inline = false, className, ...rest
}) {
  const autoId = useId();
  const inputId = id || `check-${autoId}`;
  return (
    <div className={cn('form-check', inline && 'form-check-inline', className)}>
      <input
        id={inputId}
        type="checkbox"
        className={cn('form-check-input', error && 'is-invalid')}
        checked={checked}
        onChange={onChange}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        {...rest}
      />
      {label && (
        <label className="form-check-label" htmlFor={inputId}>
          {label}
          {required && <span className="uikit-required">*</span>}
        </label>
      )}
      {error ? <div className="uikit-error">{error}</div> : helperText ? <div className="uikit-helper">{helperText}</div> : null}
    </div>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.any,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.node,
  helperText: PropTypes.node,
  inline: PropTypes.bool,
  className: PropTypes.string,
};
