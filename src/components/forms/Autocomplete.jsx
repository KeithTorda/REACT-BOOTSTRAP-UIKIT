import { useId, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import FormGroup from './FormGroup';
import useClickOutside from '../../hooks/useClickOutside';

/**
 * Type-ahead single select. <Autocomplete label="City" options={list} value={v} onChange={fn} />
 * Options: strings or { value, label, description }.
 */
export default function Autocomplete({
  id, label, options = [], value, onChange, placeholder = 'Start typing…',
  required, disabled, error, helperText, emptyText = 'No matches', maxItems = 8, className,
}) {
  const autoId = useId();
  const inputId = id || `autocomplete-${autoId}`;
  const ref = useRef(null);
  const normalized = useMemo(
    () => options.map((o) => (typeof o === 'object' ? o : { value: o, label: o })),
    [options]
  );
  const selected = normalized.find((o) => o.value === value);
  const [query, setQuery] = useState(selected?.label ?? '');
  const [open, setOpen] = useState(false);
  useClickOutside(ref, () => setOpen(false), open);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? normalized.filter((o) => o.label.toLowerCase().includes(q)) : normalized;
    return list.slice(0, maxItems);
  }, [query, normalized, maxItems]);

  const pick = (option) => {
    setQuery(option.label);
    setOpen(false);
    onChange?.(option.value, option);
  };

  return (
    <FormGroup id={inputId} label={label} required={required} error={error} helperText={helperText} className={className}>
      <div className="uikit-dropdown w-100" ref={ref}>
        <input
          id={inputId}
          className={cn('form-control', error && 'is-invalid')}
          value={query}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          onChange={(event) => { setQuery(event.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
        {open && (
          <div className="uikit-dropdown__menu uikit-dropdown__menu--start w-100">
            {matches.length === 0 && <div className="uikit-dropdown__item text-secondary-soft">{emptyText}</div>}
            {matches.map((option) => (
              <button key={option.value} type="button" className="uikit-dropdown__item" onClick={() => pick(option)}>
                <span className="flex-grow-1">
                  {option.label}
                  {option.description && <span className="d-block uikit-helper mt-0">{option.description}</span>}
                </span>
                {option.value === value && <i className="bi bi-check2" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </FormGroup>
  );
}

Autocomplete.propTypes = {
  id: PropTypes.string, label: PropTypes.node, options: PropTypes.array,
  value: PropTypes.any, onChange: PropTypes.func, placeholder: PropTypes.string,
  required: PropTypes.bool, disabled: PropTypes.bool, error: PropTypes.node,
  helperText: PropTypes.node, emptyText: PropTypes.string, maxItems: PropTypes.number, className: PropTypes.string,
};
