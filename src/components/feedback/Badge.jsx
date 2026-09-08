import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * <Badge variant="success" tone="soft" shape="pill" dot>Active</Badge>
 * tone: solid · soft · outline    shape: pill · square
 */
export default function Badge({
  variant = 'primary', tone = 'soft', shape = 'pill', icon, dot = false,
  counter = false, className, style, children,
}) {
  const styles = {
    solid: { background: `var(--${variant})`, color: variant === 'primary' ? 'var(--on-primary)' : variant === 'warning' ? '#4a3c00' : '#fff' },
    soft: { background: `var(--${variant}-soft, var(--surface-muted))`, color: `var(--${variant})` },
    outline: { color: `var(--${variant})` },
  }[tone];

  return (
    <span
      className={cn(
        'uikit-badge',
        tone === 'outline' && 'uikit-badge--outline',
        shape === 'square' && 'uikit-badge--square',
        counter && 'uikit-badge--counter',
        className
      )}
      style={{ ...styles, ...style }}
    >
      {dot && <span className="uikit-status-dot" style={{ background: 'currentColor' }} />}
      {icon && <i className={`bi bi-${icon}`} aria-hidden="true" />}
      {children}
    </span>
  );
}

Badge.TONES = ['solid', 'soft', 'outline'];
Badge.propTypes = {
  variant: PropTypes.string,
  tone: PropTypes.oneOf(['solid', 'soft', 'outline']),
  shape: PropTypes.oneOf(['pill', 'square']),
  icon: PropTypes.string,
  dot: PropTypes.bool,
  counter: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
