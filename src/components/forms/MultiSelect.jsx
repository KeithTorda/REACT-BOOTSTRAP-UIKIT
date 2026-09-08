import { useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';
import useClickOutside from '../../hooks/useClickOutside';
import { cn } from '../../utils/cn';

/** Checkbox dropdown for selecting several options. */
export default function MultiSelect({
  id, label, options = [], value = [], onChange, placeholder = 'Select options',
  required, disabled, error, helperText, searchable = true, className,
}) {
  const autoId = useId();
  const inputId = id || `multiselect-${autoId}`;
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  useClickOutside(ref, () => setOpen(false), open);

  const normalized = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const shown = query ? normalized.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())) : normalized;

  const toggle = (option) =>
    onChange?.(value.includes(option.value) ? value.filter((v) => v !== option.value) : [...value, option.value]);

  const summary = value.length
    ? normalized.filter((o) => value.includes(o.value)).map((o) => o.label).join(', ')
    : placeholder;

  return (
    <FormGroup id={inputId} label={label} required={required} error={error} helperText={helperText} className={className}>
      <div className="uikit-dropdown w-100" ref={ref}>
        <button
          id={inputId}
          type="button"
          disabled={disabled}
          className={cn('form-select text-start', error && 'is-invalid')}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn('d-block text-truncate', !value.length && 'text-secondary-soft')}>{summary}</span>
        </button>
        {open && (
          <div className="uikit-dropdown__menu uikit-dropdown__menu--start w-100" style={{ maxHeight: 260, overflowY: 'auto' }}>
            {searchable && (
              <input
                className="form-control form-control-sm mb-2"
                placeholder="Search…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            )}
            {shown.map((option) => (
              <label key={option.value} className="uikit-dropdown__item mb-0" style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  className="form-check-input m-0"
                  checked={value.includes(option.value)}
                  onChange={() => toggle(option)}
                />
                <span className="flex-grow-1">{option.label}</span>
              </label>
            ))}
            {!shown.length && <div className="uikit-dropdown__item text-secondary-soft">No matches</div>}
          </div>
        )}
      </div>
    </FormGroup>
  );
}

MultiSelect.propTypes = {
  id: PropTypes.string, label: PropTypes.node, options: PropTypes.array, value: PropTypes.array,
  onChange: PropTypes.func, placeholder: PropTypes.string, required: PropTypes.bool,
  disabled: PropTypes.bool, error: PropTypes.node, helperText: PropTypes.node,
  searchable: PropTypes.bool, className: PropTypes.string,
};
