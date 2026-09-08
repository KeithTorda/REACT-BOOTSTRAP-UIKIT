import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * Base surface of the kit — every other card composes it.
 *
 * variant: bordered · elevated · flat · filled · gradient · accent · glass · overlay
 *
 * <Card variant="accent" accentColor="var(--info)" title="Panel" actions={…}>content</Card>
 */
export default function Card({
  title, subtitle, icon, actions, footer,
  variant = 'bordered',
  accentColor,
  image, imageHeight = 160, imageAlt = '',
  ribbon, ribbonVariant = 'primary',
  padded = true, hoverable = false, flush = false,
  bodyClassName, className, style, children, ...rest
}) {
  const hasHeader = Boolean(title || subtitle || actions);
  const variantClass = {
    bordered: '', elevated: 'uikit-card--elevated', flat: 'uikit-card--flat',
    filled: 'uikit-card--filled', gradient: 'uikit-card--gradient',
    accent: 'uikit-card--accent', glass: 'uikit-card--glass', overlay: 'uikit-card--overlay',
  }[variant];

  return (
    <div
      className={cn(
        'uikit-card', variantClass,
        hoverable && 'uikit-card--hoverable',
        flush && 'uikit-card--flush',
        ribbon && 'position-relative',
        className
      )}
      style={{ ...(accentColor ? { '--accent-color': accentColor } : null), ...style }}
      {...rest}
    >
      {ribbon && (
        <span className="uikit-ribbon" style={{ background: `var(--${ribbonVariant})` }}>{ribbon}</span>
      )}

      {image && (
        <img src={image} alt={imageAlt} className="uikit-card__media" style={{ height: imageHeight, borderRadius: 'var(--border-radius) var(--border-radius) 0 0' }} />
      )}

      {hasHeader && (
        <div className="uikit-card__header">
          <div className="d-flex align-items-center gap-2">
            {icon && <i className={`bi bi-${icon} text-secondary-soft`} aria-hidden="true" />}
            <div>
              {title && <h5 className="uikit-card__title">{title}</h5>}
              {subtitle && <p className="uikit-card__subtitle">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="d-flex align-items-center gap-2">{actions}</div>}
        </div>
      )}

      <div className={cn(padded ? 'uikit-card__body' : '', bodyClassName)}>{children}</div>
      {footer && <div className="uikit-card__footer">{footer}</div>}
    </div>
  );
}

Card.VARIANTS = ['bordered', 'elevated', 'flat', 'filled', 'gradient', 'accent', 'glass', 'overlay'];
Card.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  icon: PropTypes.string,
  actions: PropTypes.node,
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['bordered', 'elevated', 'flat', 'filled', 'gradient', 'accent', 'glass', 'overlay']),
  accentColor: PropTypes.string,
  image: PropTypes.string,
  imageHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageAlt: PropTypes.string,
  ribbon: PropTypes.node,
  ribbonVariant: PropTypes.string,
  padded: PropTypes.bool,
  hoverable: PropTypes.bool,
  flush: PropTypes.bool,
  bodyClassName: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
