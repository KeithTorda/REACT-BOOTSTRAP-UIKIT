import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const ICONS = {
  primary: 'info-circle-fill',
  secondary: 'info-circle-fill',
  success: 'check-circle-fill',
  danger: 'exclamation-octagon-fill',
  warning: 'exclamation-triangle-fill',
  info: 'info-circle-fill',
};

/** <Alert variant="success" title="Saved" onClose={fn}>Your changes were stored.</Alert> */
export default function Alert({
  variant = 'primary',
  tone = 'soft',
  title,
  icon,
  showIcon = true,
  actions,
  banner = false,
  onClose,
  className,
  children,
}) {
  const toneStyle = {
    solid: { background: `var(--${variant})`, color: variant === 'warning' ? '#4a3c00' : '#fff', border: 0 },
    soft: { background: `var(--${variant}-soft, var(--surface-muted))`, color: `var(--${variant})`, border: '1px solid transparent' },
    outline: { background: 'transparent', color: `var(--${variant})`, border: `1px solid var(--${variant})` },
  }[tone];

  return (
    <div
      className={cn('alert d-flex gap-3', banner && 'rounded-0 mb-0', onClose && 'alert-dismissible', className)}
      style={toneStyle}
      role="alert"
    >
      {showIcon && <i className={`bi bi-${icon || ICONS[variant] || ICONS.primary} fs-5 lh-1 mt-1`} aria-hidden="true" />}
      <div className="flex-grow-1">
        {title && <div className="fw-semibold mb-1">{title}</div>}
        {children && <div className="small">{children}</div>}
        {actions && <div className="d-flex gap-2 mt-2">{actions}</div>}
      </div>
      {onClose && <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />}
    </div>
  );
}

Alert.TONES = ['solid', 'soft', 'outline'];
Alert.propTypes = {
  variant: PropTypes.string,
  tone: PropTypes.oneOf(['solid', 'soft', 'outline']),
  actions: PropTypes.node,
  banner: PropTypes.bool,
  title: PropTypes.node,
  icon: PropTypes.string,
  showIcon: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};
