import { useId } from 'react';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';
import { cn } from '../../utils/cn';

const SWATCHES = ['#2fdf84', '#8944d7', '#009ce7', '#f8d62b', '#f73164', '#22c571', '#f97316', '#2c323f'];

/** Colour field: native picker, hex input and quick swatches. */
export default function ColorPicker({
  id, label, value = '#2fdf84', onChange, swatches = SWATCHES, disabled, error, helperText, className,
}) {
  const autoId = useId();
  const inputId = id || `color-${autoId}`;
  const emit = (next) => onChange?.({ target: { value: next } }, next);

  return (
    <FormGroup id={inputId} label={label} error={error} helperText={helperText} className={className}>
      <div className="d-flex align-items-center gap-2 mb-2">
        <input
          id={inputId}
          type="color"
          className="form-control form-control-color"
          value={value}
          disabled={disabled}
          onChange={(event) => emit(event.target.value)}
        />
        <input
          className="form-control"
          value={value}
          disabled={disabled}
          onChange={(event) => emit(event.target.value)}
          style={{ maxWidth: 130, fontFamily: 'var(--font-mono)' }}
        />
      </div>
      <div className="d-flex flex-wrap gap-2">
        {swatches.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={color}
            className={cn('uikit-swatch', value?.toLowerCase() === color.toLowerCase() && 'is-active')}
            style={{ background: color, width: 26, height: 26, aspectRatio: 'auto' }}
            onClick={() => emit(color)}
          />
        ))}
      </div>
    </FormGroup>
  );
}

ColorPicker.propTypes = {
  id: PropTypes.string, label: PropTypes.node, value: PropTypes.string, onChange: PropTypes.func,
  swatches: PropTypes.array, disabled: PropTypes.bool, error: PropTypes.node,
  helperText: PropTypes.node, className: PropTypes.string,
};
