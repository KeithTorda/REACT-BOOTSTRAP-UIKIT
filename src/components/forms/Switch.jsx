import { useId } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** <Switch label="Email notifications" checked={v} onChange={fn} /> */
export default function Switch({
  id, label, description, checked, onChange, disabled = false, reverse = false, size = 'md', className, ...rest
}) {
  const autoId = useId();
  const inputId = id || `switch-${autoId}`;
  return (
    <div className={cn('form-check form-switch', reverse && 'form-check-reverse', className)}>
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        className="form-check-input"
        style={size === 'lg' ? { width: '3em', height: '1.5em' } : undefined}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      {label && (
        <label className="form-check-label" htmlFor={inputId}>
          {label}
          {description && <div className="uikit-helper mt-0">{description}</div>}
        </label>
      )}
    </div>
  );
}

Switch.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  description: PropTypes.node,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  reverse: PropTypes.bool,
  size: PropTypes.oneOf(['md', 'lg']),
  className: PropTypes.string,
};
