import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** Floating action button. Set `inline` to place it in normal flow. */
export default function Fab({ icon = 'plus-lg', label, variant = 'primary', inline = false, className, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label || icon}
      title={label}
      className={cn('uikit-fab', inline && 'uikit-fab--inline', className)}
      style={{ background: `var(--${variant})`, color: variant === 'primary' ? 'var(--on-primary)' : '#fff' }}
      {...rest}
    >
      <i className={`bi bi-${icon}`} aria-hidden="true" />
    </button>
  );
}

Fab.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  inline: PropTypes.bool,
  className: PropTypes.string,
};
