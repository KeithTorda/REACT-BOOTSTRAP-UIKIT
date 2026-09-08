import { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * Segmented control. <ToggleGroup options={['Day','Week','Month']} value={v} onChange={fn} />
 * Options may be strings or { value, label, icon }.
 */
export default function ToggleGroup({ options = [], value, defaultValue, onChange, className }) {
  const normalized = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const [internal, setInternal] = useState(defaultValue ?? normalized[0]?.value);
  const current = value ?? internal;

  const select = (next) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <div className={cn('uikit-toggle-group', className)} role="group">
      {normalized.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === current}
          className={cn('uikit-toggle-group__item', option.value === current && 'is-active')}
          onClick={() => select(option.value)}
        >
          {option.icon && <i className={`bi bi-${option.icon} me-1`} />}
          {option.label}
        </button>
      ))}
    </div>
  );
}

ToggleGroup.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
