import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const ICONS = {
  primary: 'bell-fill',
  success: 'check-circle-fill',
  danger: 'exclamation-octagon-fill',
  warning: 'exclamation-triangle-fill',
  info: 'info-circle-fill',
  secondary: 'bell-fill',
};

/** A single toast. Normally rendered by <ToastContainer />. */
export function Toast({ title, message, variant = 'primary', icon, onDismiss, className }) {
  return (
    <div className={cn('uikit-toast', className)} role="status" style={{ borderLeftColor: `var(--${variant})` }}>
      <i
        className={`bi bi-${icon || ICONS[variant] || ICONS.primary} fs-5 lh-1`}
        style={{ color: `var(--${variant})` }}
        aria-hidden="true"
      />
      <div className="flex-grow-1">
        {title && <div className="fw-semibold" style={{ fontSize: '.8125rem' }}>{title}</div>}
        {message && <div className="small text-secondary-soft">{message}</div>}
      </div>
      {onDismiss && <button type="button" className="btn-close btn-sm" aria-label="Close" onClick={onDismiss} />}
    </div>
  );
}

/** Stack of toasts. Feed it the `toasts` array from the useToasts() hook. */
export default function ToastContainer({ toasts = [], onDismiss, position = 'top-end' }) {
  if (!toasts.length) return null;
  return (
    <div className={cn('uikit-toast-stack', `uikit-toast-stack--${position}`)}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss ? () => onDismiss(toast.id) : undefined} />
      ))}
    </div>
  );
}

Toast.propTypes = {
  title: PropTypes.node,
  message: PropTypes.node,
  variant: PropTypes.string,
  icon: PropTypes.string,
  onDismiss: PropTypes.func,
  className: PropTypes.string,
};

ToastContainer.propTypes = {
  toasts: PropTypes.arrayOf(PropTypes.object),
  onDismiss: PropTypes.func,
  position: PropTypes.oneOf(['top-end', 'top-start', 'bottom-end']),
};
