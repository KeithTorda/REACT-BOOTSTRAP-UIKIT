import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const SIZES = { xs: 'btn-xs', sm: 'btn-sm', md: '', lg: 'btn-lg', xl: 'btn-xl' };

/**
 * The base button. Every other button in the kit composes this one.
 *
 * <Button variant="primary" tone="soft" size="lg" shape="pill" icon="plus">Add Record</Button>
 *
 * tone: solid · outline · soft · ghost · link · gradient
 */
export default function Button({
  variant = 'primary',
  tone = 'solid',
  size = 'md',
  shape = 'default',
  icon,
  iconPosition = 'start',
  outline = false,
  block = false,
  rounded = false,
  loading = false,
  disabled = false,
  active = false,
  type = 'button',
  className,
  style,
  children,
  ...rest
}) {
  const resolvedTone = outline ? 'outline' : tone;

  const toneClass = {
    solid: `btn-${variant}`,
    outline: `btn-outline-${variant}`,
    ghost: 'uikit-btn--ghost',
    soft: 'uikit-btn--soft',
    link: 'btn-link',
    gradient: 'uikit-btn--gradient',
  }[resolvedTone];

  const toneStyle =
    resolvedTone === 'soft'
      ? { background: `var(--${variant}-soft, var(--surface-muted))`, color: `var(--${variant})` }
      : resolvedTone === 'ghost'
        ? { color: `var(--${variant})` }
        : undefined;

  const iconEl = loading ? (
    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
  ) : icon ? (
    <i className={`bi bi-${icon}`} aria-hidden="true" />
  ) : null;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-pressed={active || undefined}
      className={cn(
        'btn d-inline-flex align-items-center justify-content-center gap-2',
        toneClass,
        SIZES[size],
        (shape === 'pill' || rounded) && 'rounded-pill',
        shape === 'square' && 'uikit-btn--square',
        block && 'w-100',
        active && 'active',
        className
      )}
      style={{ ...toneStyle, ...style }}
      {...rest}
    >
      {iconPosition === 'start' && iconEl}
      {children && <span>{children}</span>}
      {iconPosition === 'end' && iconEl}
    </button>
  );
}

Button.TONES = ['solid', 'outline', 'soft', 'ghost', 'link', 'gradient'];
Button.SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];
Button.SHAPES = ['default', 'pill', 'square'];

Button.propTypes = {
  variant: PropTypes.string,
  tone: PropTypes.oneOf(['solid', 'outline', 'soft', 'ghost', 'link', 'gradient']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  shape: PropTypes.oneOf(['default', 'pill', 'square']),
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['start', 'end']),
  outline: PropTypes.bool,
  block: PropTypes.bool,
  rounded: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
