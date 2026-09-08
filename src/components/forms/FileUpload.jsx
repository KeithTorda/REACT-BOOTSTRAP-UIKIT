import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import IconButton from '../buttons/IconButton';

function humanSize(bytes) {
  if (!bytes && bytes !== 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }
  return `${size.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

/**
 * Drag-and-drop file field (React state only — no plugin).
 * <FileUpload label="Attachments" multiple accept="image/*" onChange={files => …} />
 */
export default function FileUpload({
  label, hint = 'Drag & drop files here, or click to browse', accept, multiple = false,
  disabled = false, error, helperText, onChange, className,
}) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const apply = (fileList) => {
    const next = multiple ? [...files, ...Array.from(fileList)] : Array.from(fileList).slice(0, 1);
    setFiles(next);
    onChange?.(next);
  };

  const remove = (index) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onChange?.(next);
  };

  return (
    <div className={cn('mb-3', className)}>
      {label && <label className="form-label d-block">{label}</label>}
      <div
        className={cn('uikit-dropzone', dragging && 'is-dragging', disabled && 'opacity-50')}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          if (!disabled) apply(event.dataTransfer.files);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => event.key === 'Enter' && inputRef.current?.click()}
      >
        <i className="bi bi-cloud-arrow-up fs-2 text-secondary-soft d-block mb-2" aria-hidden="true" />
        <div className="fw-medium">{hint}</div>
        {accept && <div className="uikit-helper">Accepted: {accept}</div>}
        <input
          ref={inputRef}
          type="file"
          className="d-none"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(event) => apply(event.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="list-unstyled mt-2 mb-0">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="d-flex align-items-center gap-2 py-2 border-bottom">
              <i className="bi bi-file-earmark text-secondary-soft" aria-hidden="true" />
              <span className="flex-grow-1 text-truncate small">{file.name}</span>
              <span className="uikit-helper mt-0">{humanSize(file.size)}</span>
              <IconButton icon="x" size="sm" variant="light" label="Remove" onClick={() => remove(index)} />
            </li>
          ))}
        </ul>
      )}

      {error ? <div className="uikit-error">{error}</div> : helperText ? <div className="uikit-helper">{helperText}</div> : null}
    </div>
  );
}

FileUpload.propTypes = {
  label: PropTypes.node,
  hint: PropTypes.node,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.node,
  helperText: PropTypes.node,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
