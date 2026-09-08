import { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** Star rating. <Rating value={4} onChange={fn} /> — set readOnly to display only. */
export default function Rating({
  label, value = 0, onChange, max = 5, size = 20, icon = 'star',
  variant = 'warning', readOnly = false, showValue = false, className,
}) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div className={cn('mb-3', className)}>
      {label && <div className="form-label">{label}</div>}
      <div className="d-flex align-items-center gap-1">
        {Array.from({ length: max }).map((_, index) => {
          const score = index + 1;
          return (
            <button
              key={score}
              type="button"
              disabled={readOnly}
              aria-label={`${score} of ${max}`}
              className="btn p-0 border-0 bg-transparent lh-1"
              style={{ fontSize: size, color: score <= active ? `var(--${variant})` : 'var(--border)', cursor: readOnly ? 'default' : 'pointer' }}
              onMouseEnter={() => !readOnly && setHover(score)}
              onMouseLeave={() => !readOnly && setHover(0)}
              onClick={() => !readOnly && onChange?.(score)}
            >
              <i className={`bi bi-${score <= active ? `${icon}-fill` : icon}`} />
            </button>
          );
        })}
        {showValue && <span className="ms-2 small text-secondary-soft">{value} / {max}</span>}
      </div>
    </div>
  );
}

Rating.propTypes = {
  label: PropTypes.node, value: PropTypes.number, onChange: PropTypes.func, max: PropTypes.number,
  size: PropTypes.number, icon: PropTypes.string, variant: PropTypes.string,
  readOnly: PropTypes.bool, showValue: PropTypes.bool, className: PropTypes.string,
};
