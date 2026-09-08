import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const SIZES = { sm: 30, md: 36, lg: 44 };

/** A square/round icon-only button. <IconButton icon="pencil" variant="info" /> */
export default function IconButton({
  icon,
  variant = 'light',
  size = 'md',
  outline = false,
  circle = true,
  label,
  className,
  ...rest
}) {
  const dimension = SIZES[size] || SIZES.md;
  return (
    <button
      type="button"
      aria-label={label || icon}
      title={label}
      className={cn(
        'btn d-inline-flex align-items-center justify-content-center p-0',
        outline ? `btn-outline-${variant}` : `btn-${variant}`,
        circle ? 'rounded-circle' : 'rounded',
        className
      )}
      style={{ width: dimension, height: dimension }}
      {...rest}
    >
      <i className={`bi bi-${icon}`} aria-hidden="true" />
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  variant: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  outline: PropTypes.bool,
  circle: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
};
