import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** Linear progress bar. <Progress value={64} variant="primary" showLabel /> */
export default function Progress({ value = 0, max = 100, variant = 'primary', size = 'md', label, showLabel = false, striped = false, className }) {
  const pct = Math.min(100, Math.max(0, (Number(value) / Number(max)) * 100));
  return (
    <div className={className}>
      {(label || showLabel) && (
        <div className="d-flex justify-content-between mb-1" style={{ fontSize: '.75rem' }}>
          <span className="text-secondary-soft">{label}</span>
          {showLabel && <span className="fw-semibold">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={cn('uikit-progress', size !== 'md' && `uikit-progress--${size}`)}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn('uikit-progress__bar', striped && 'progress-bar-striped progress-bar-animated')}
          style={{ width: `${pct}%`, background: `var(--${variant})` }}
        />
      </div>
    </div>
  );
}

Progress.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  variant: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  label: PropTypes.node,
  showLabel: PropTypes.bool,
  striped: PropTypes.bool,
  className: PropTypes.string,
};
