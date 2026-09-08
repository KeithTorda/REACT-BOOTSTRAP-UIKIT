import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** <StatusDot variant="success" pulse label="Online" /> */
export default function StatusDot({ variant = 'success', size = 8, pulse = false, label, className }) {
  const dot = (
    <span
      className={cn('uikit-status-dot', pulse && 'uikit-status-dot--pulse', className)}
      style={{ width: size, height: size, background: `var(--${variant})`, color: `var(--${variant})` }}
    />
  );
  if (!label) return dot;
  return (
    <span className="d-inline-flex align-items-center gap-2" style={{ fontSize: '.8125rem' }}>
      {dot}
      {label}
    </span>
  );
}

StatusDot.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.number,
  pulse: PropTypes.bool,
  label: PropTypes.node,
  className: PropTypes.string,
};
