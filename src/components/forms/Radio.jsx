import { useId } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** One radio input. */
export function Radio({ id, label, name, value, checked, onChange, disabled = false, inline = false, className, ...rest }) {
  const autoId = useId();
  const inputId = id || `radio-${autoId}`;
  return (
    <div className={cn('form-check', inline && 'form-check-inline', className)}>
      <input
        id={inputId}
        type="radio"
        className="form-check-input"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      {label && <label className="form-check-label" htmlFor={inputId}>{label}</label>}
    </div>
  );
}

/**
 * Config-driven group of radios.
 * <RadioGroup label="Type" name="type" options={[{value:'a',label:'A'}]} value={v} onChange={fn} />
 */
export default function RadioGroup({
  label, name, options = [], value, onChange, required = false, disabled = false,
  error, helperText, inline = false, className,
}) {
  const normalized = options.map((option) => (typeof option === 'object' ? option : { value: option, label: option }));
  return (
    <div className={cn('mb-3', className)}>
      {label && (
        <label className="form-label d-block">
          {label}
          {required && <span className="uikit-required">*</span>}
        </label>
      )}
      <div className={inline ? 'd-flex flex-wrap gap-3' : undefined}>
        {normalized.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={String(value) === String(option.value)}
            onChange={onChange}
            disabled={disabled || option.disabled}
            inline={inline}
          />
        ))}
      </div>
      {error ? <div className="uikit-error">{error}</div> : helperText ? <div className="uikit-helper">{helperText}</div> : null}
    </div>
  );
}

Radio.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  name: PropTypes.string,
  value: PropTypes.any,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  className: PropTypes.string,
};

RadioGroup.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.node,
  helperText: PropTypes.node,
  inline: PropTypes.bool,
  className: PropTypes.string,
};
