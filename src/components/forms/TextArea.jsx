import { useId } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import FormGroup from './FormGroup';

/** <TextArea label="Notes" rows={4} maxLength={280} showCount /> */
export default function TextArea({
  id, label, value, onChange, placeholder, rows = 4, required = false, disabled = false,
  error, helperText, size = 'md', maxLength, showCount = false,
  horizontal = false, floating = false, inline = false, className, ...rest
}) {
  const autoId = useId();
  const inputId = id || `textarea-${autoId}`;

  return (
    <FormGroup id={inputId} label={label} required={required} error={error} helperText={helperText} horizontal={horizontal} floating={floating} inline={inline}>
      <textarea
        id={inputId}
        rows={rows}
        className={cn('form-control', size !== 'md' && `form-control-${size}`, error && 'is-invalid', className)}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        {...rest}
      />
      {showCount && maxLength && (
        <div className="uikit-helper text-end">{String(value || '').length} / {maxLength}</div>
      )}
    </FormGroup>
  );
}

TextArea.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.node,
  helperText: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  maxLength: PropTypes.number,
  showCount: PropTypes.bool,
  horizontal: PropTypes.bool,
  floating: PropTypes.bool,
  inline: PropTypes.bool,
  className: PropTypes.string,
};
