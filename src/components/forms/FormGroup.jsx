import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * Label + control + helper/error wrapper. Every form control composes this,
 * so labelling and error styling stay identical across the kit.
 */
export default function FormGroup({ id, label, required, error, helperText, horizontal = false, floating = false, inline = false, className, children }) {
  if (floating) {
    return (
      <div className={cn('form-floating mb-3', className)}>
        {children}
        {label && (
          <label htmlFor={id}>
            {label}
            {required && <span className="uikit-required">*</span>}
          </label>
        )}
        {error ? <div className="uikit-error">{error}</div> : helperText ? <div className="uikit-helper">{helperText}</div> : null}
      </div>
    );
  }
  const labelEl = label ? (
    <label htmlFor={id} className={cn('form-label', horizontal && 'col-sm-3 col-form-label mb-0')}>
      {label}
      {required && <span className="uikit-required">*</span>}
    </label>
  ) : null;

  const body = (
    <>
      {children}
      {error ? <div className="uikit-error">{error}</div> : helperText ? <div className="uikit-helper">{helperText}</div> : null}
    </>
  );

  if (horizontal) {
    return (
      <div className={cn('row align-items-start mb-3', className)}>
        {labelEl}
        <div className="col-sm-9">{body}</div>
      </div>
    );
  }

  if (inline) {
    return (
      <div className={cn('d-flex align-items-center gap-2 mb-3', className)}>
        {labelEl}
        <div className="flex-grow-1">{body}</div>
      </div>
    );
  }

  return (
    <div className={cn('mb-3', className)}>
      {labelEl}
      {body}
    </div>
  );
}

FormGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  required: PropTypes.bool,
  error: PropTypes.node,
  helperText: PropTypes.node,
  horizontal: PropTypes.bool,
  floating: PropTypes.bool,
  inline: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
