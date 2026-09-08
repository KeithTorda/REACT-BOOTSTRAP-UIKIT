import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const SIZES = { sm: '1rem', md: '1.75rem', lg: '2.75rem' };

/** <Spinner size="lg" label="Loading records…" center /> */
export default function Spinner({ size = 'md', variant = 'primary', label, center = false, grow = false, className }) {
  const dimension = SIZES[size] || SIZES.md;
  const spinner = (
    <div
      className={cn(grow ? 'spinner-grow' : 'spinner-border', className)}
      role="status"
      style={{ width: dimension, height: dimension, color: `var(--${variant})` }}
    >
      <span className="visually-hidden">{label || 'Loading'}</span>
    </div>
  );

  if (!center && !label) return spinner;

  return (
    <div className={cn('d-flex flex-column align-items-center gap-2', center && 'justify-content-center py-4')}>
      {spinner}
      {label && <span className="small text-secondary-soft">{label}</span>}
    </div>
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.string,
  label: PropTypes.string,
  center: PropTypes.bool,
  grow: PropTypes.bool,
  className: PropTypes.string,
};
