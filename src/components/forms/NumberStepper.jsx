import { useId } from 'react';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';
import { cn } from '../../utils/cn';

/** Number field with -/+ buttons. Good for quantities. */
export default function NumberStepper({
  id, label, value = 0, onChange, min = 0, max = Infinity, step = 1,
  disabled, error, helperText, size = 'md', suffix, className,
}) {
  const autoId = useId();
  const inputId = id || `stepper-${autoId}`;
  const emit = (next) => onChange?.(Math.min(max, Math.max(min, next)));

  return (
    <FormGroup id={inputId} label={label} error={error} helperText={helperText} className={className}>
      <div className={cn('input-group', size !== 'md' && `input-group-${size}`)} style={{ maxWidth: 200 }}>
        <button type="button" className="btn btn-light border" disabled={disabled || value <= min} onClick={() => emit(Number(value) - step)} aria-label="Decrease">
          <i className="bi bi-dash-lg" />
        </button>
        <input
          id={inputId}
          type="number"
          className={cn('form-control text-center', error && 'is-invalid')}
          value={value}
          min={min}
          max={max === Infinity ? undefined : max}
          step={step}
          disabled={disabled}
          onChange={(event) => emit(Number(event.target.value))}
        />
        {suffix && <span className="input-group-text">{suffix}</span>}
        <button type="button" className="btn btn-light border" disabled={disabled || value >= max} onClick={() => emit(Number(value) + step)} aria-label="Increase">
          <i className="bi bi-plus-lg" />
        </button>
      </div>
    </FormGroup>
  );
}

NumberStepper.propTypes = {
  id: PropTypes.string, label: PropTypes.node, value: PropTypes.any, onChange: PropTypes.func,
  min: PropTypes.number, max: PropTypes.number, step: PropTypes.number, disabled: PropTypes.bool,
  error: PropTypes.node, helperText: PropTypes.node, size: PropTypes.string,
  suffix: PropTypes.node, className: PropTypes.string,
};
