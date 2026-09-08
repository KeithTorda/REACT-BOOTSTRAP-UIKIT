import { useRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const TOOLS = [
  { command: 'bold', icon: 'type-bold', label: 'Bold' },
  { command: 'italic', icon: 'type-italic', label: 'Italic' },
  { command: 'underline', icon: 'type-underline', label: 'Underline' },
  { command: 'insertUnorderedList', icon: 'list-ul', label: 'Bullet list' },
  { command: 'insertOrderedList', icon: 'list-ol', label: 'Numbered list' },
  { command: 'removeFormat', icon: 'eraser', label: 'Clear formatting' },
];

/**
 * Minimal rich-text field — a contentEditable with a small toolbar.
 * No editor dependency; emits HTML through onChange(html).
 */
export default function RichTextArea({ label, value = '', onChange, minHeight = 160, disabled, error, helperText, className }) {
  const ref = useRef(null);
  const exec = (command) => {
    document.execCommand(command, false, null);
    ref.current?.focus();
    onChange?.(ref.current?.innerHTML ?? '');
  };

  return (
    <div className={cn('mb-3', className)}>
      {label && <div className="form-label">{label}</div>}
      <div className={cn('border rounded overflow-hidden', error && 'border-danger')} style={{ borderColor: 'var(--border)' }}>
        <div className="d-flex gap-1 p-2 border-bottom" style={{ background: 'var(--surface-muted)' }}>
          {TOOLS.map((tool) => (
            <button
              key={tool.command}
              type="button"
              className="btn btn-sm btn-light border-0"
              title={tool.label}
              aria-label={tool.label}
              disabled={disabled}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => exec(tool.command)}
            >
              <i className={`bi bi-${tool.icon}`} />
            </button>
          ))}
        </div>
        <div
          ref={ref}
          contentEditable={!disabled}
          suppressContentEditableWarning
          className="p-3"
          style={{ minHeight, outline: 'none', background: 'var(--surface)' }}
          onInput={(event) => onChange?.(event.currentTarget.innerHTML)}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
      {error ? <div className="uikit-error">{error}</div> : helperText ? <div className="uikit-helper">{helperText}</div> : null}
    </div>
  );
}

RichTextArea.propTypes = {
  label: PropTypes.node, value: PropTypes.string, onChange: PropTypes.func,
  minHeight: PropTypes.number, disabled: PropTypes.bool, error: PropTypes.node,
  helperText: PropTypes.node, className: PropTypes.string,
};
