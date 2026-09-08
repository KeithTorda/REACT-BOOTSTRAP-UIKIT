import PropTypes from 'prop-types';
import DateInput from './DateInput';
import { cn } from '../../utils/cn';

/** Two bound date fields. value = { from, to } */
export default function DateRangePicker({
  label, value = {}, onChange, fromLabel = 'From', toLabel = 'To',
  required, disabled, error, helperText, className,
}) {
  const set = (key) => (event) => onChange?.({ ...value, [key]: event.target.value });
  return (
    <div className={cn('mb-3', className)}>
      {label && (
        <div className="form-label">
          {label}
          {required && <span className="uikit-required">*</span>}
        </div>
      )}
      <div className="row g-2">
        <div className="col-6">
          <DateInput className="mb-0" label={fromLabel} value={value.from || ''} onChange={set('from')} disabled={disabled} max={value.to || undefined} />
        </div>
        <div className="col-6">
          <DateInput className="mb-0" label={toLabel} value={value.to || ''} onChange={set('to')} disabled={disabled} min={value.from || undefined} />
        </div>
      </div>
      {error ? <div className="uikit-error">{error}</div> : helperText ? <div className="uikit-helper">{helperText}</div> : null}
    </div>
  );
}

DateRangePicker.propTypes = {
  label: PropTypes.node, value: PropTypes.object, onChange: PropTypes.func,
  fromLabel: PropTypes.string, toLabel: PropTypes.string, required: PropTypes.bool,
  disabled: PropTypes.bool, error: PropTypes.node, helperText: PropTypes.node, className: PropTypes.string,
};
