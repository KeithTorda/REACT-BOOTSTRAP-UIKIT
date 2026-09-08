import { useId, useState } from 'react';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';
import { cn } from '../../utils/cn';

/** Chip/tag entry. Enter or comma adds, Backspace removes the last one. */
export default function TagsInput({
  id, label, value = [], onChange, placeholder = 'Add and press Enter',
  required, disabled, error, helperText, max, variant = 'primary', className,
}) {
  const autoId = useId();
  const inputId = id || `tags-${autoId}`;
  const [draft, setDraft] = useState('');

  const add = (text) => {
    const tag = text.trim().replace(/,$/, '');
    if (!tag || value.includes(tag) || (max && value.length >= max)) return;
    onChange?.([...value, tag]);
    setDraft('');
  };

  const remove = (tag) => onChange?.(value.filter((t) => t !== tag));

  return (
    <FormGroup id={inputId} label={label} required={required} error={error} helperText={helperText} className={className}>
      <div className={cn('form-control d-flex flex-wrap gap-2 align-items-center', error && 'is-invalid')} style={{ minHeight: 40, height: 'auto' }}>
        {value.map((tag) => (
          <span
            key={tag}
            className="uikit-badge"
            style={{ background: `var(--${variant}-soft)`, color: `var(--${variant})` }}
          >
            {tag}
            {!disabled && (
              <button type="button" className="btn btn-link p-0 border-0 lh-1" style={{ color: 'inherit' }} onClick={() => remove(tag)} aria-label={`Remove ${tag}`}>
                <i className="bi bi-x" />
              </button>
            )}
          </span>
        ))}
        <input
          id={inputId}
          className="border-0 flex-grow-1 bg-transparent"
          style={{ outline: 'none', minWidth: 120, color: 'inherit' }}
          value={draft}
          disabled={disabled}
          placeholder={value.length ? '' : placeholder}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ',') { event.preventDefault(); add(draft); }
            if (event.key === 'Backspace' && !draft && value.length) remove(value[value.length - 1]);
          }}
          onBlur={() => add(draft)}
        />
      </div>
    </FormGroup>
  );
}

TagsInput.propTypes = {
  id: PropTypes.string, label: PropTypes.node, value: PropTypes.array, onChange: PropTypes.func,
  placeholder: PropTypes.string, required: PropTypes.bool, disabled: PropTypes.bool,
  error: PropTypes.node, helperText: PropTypes.node, max: PropTypes.number,
  variant: PropTypes.string, className: PropTypes.string,
};
