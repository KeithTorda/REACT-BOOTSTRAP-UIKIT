import { useId } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import FormGroup from './FormGroup';

/**
 * <TextInput label="Full Name" placeholder="Enter name" value={v} onChange={fn}
 *            required error="Required" helperText="As on record" size="sm" />
 */
export default function TextInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  error,
  helperText,
  size = 'md',
  prefix,
  suffix,
  horizontal = false,
  floating = false,
  inline = false,
  className,
  ...rest
}) {
  const autoId = useId();
  const inputId = id || `input-${autoId}`;

  const control = (
    <input
      id={inputId}
      type={type}
      className={cn('form-control', size !== 'md' && `form-control-${size}`, error && 'is-invalid', className)}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={Boolean(error)}
      {...rest}
    />
  );

  return (
    <FormGroup id={inputId} label={label} required={required} error={error} helperText={helperText} horizontal={horizontal} floating={floating} inline={inline}>
      {prefix || suffix ? (
        <div className="input-group">
          {prefix && <span className="input-group-text">{typeof prefix === 'string' ? <i className={`bi bi-${prefix}`} /> : prefix}</span>}
          {control}
          {suffix && <span className="input-group-text">{typeof suffix === 'string' ? <i className={`bi bi-${suffix}`} /> : suffix}</span>}
        </div>
      ) : (
        control
      )}
    </FormGroup>
  );
}

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.node,
  helperText: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  horizontal: PropTypes.bool,
  floating: PropTypes.bool,
  inline: PropTypes.bool,
  className: PropTypes.string,
};
