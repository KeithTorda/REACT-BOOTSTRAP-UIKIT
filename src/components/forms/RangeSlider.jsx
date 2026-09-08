import { useId } from 'react';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';

/** Native range slider with a live value badge. */
export default function RangeSlider({
  id, label, value = 0, onChange, min = 0, max = 100, step = 1,
  disabled, error, helperText, showValue = true, format = (v) => v, className,
}) {
  const autoId = useId();
  const inputId = id || `range-${autoId}`;
  return (
    <FormGroup id={inputId} label={label} error={error} helperText={helperText} className={className}>
      <div className="d-flex align-items-center gap-3">
        <input
          id={inputId}
          type="range"
          className="form-range"
          min={min} max={max} step={step}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
        {showValue && (
          <span className="uikit-badge" style={{ background: 'var(--primary-soft)', color: 'var(--primary-dark)', minWidth: 48, justifyContent: 'center' }}>
            {format(value)}
          </span>
        )}
      </div>
    </FormGroup>
  );
}

RangeSlider.propTypes = {
  id: PropTypes.string, label: PropTypes.node, value: PropTypes.any, onChange: PropTypes.func,
  min: PropTypes.number, max: PropTypes.number, step: PropTypes.number, disabled: PropTypes.bool,
  error: PropTypes.node, helperText: PropTypes.node, showValue: PropTypes.bool,
  format: PropTypes.func, className: PropTypes.string,
};
