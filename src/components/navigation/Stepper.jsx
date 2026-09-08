import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * Progress indicator for multi-step flows.
 * variant: horizontal · vertical · dots · progress
 */
export default function Stepper({ steps = [], current = 0, variant = 'horizontal', onStepClick, className }) {
  if (variant === 'dots') {
    return (
      <div className={cn('d-flex align-items-center justify-content-center gap-2', className)}>
        {steps.map((step, index) => (
          <span
            key={step.key || step.label || index}
            title={step.label}
            className="uikit-status-dot"
            style={{
              width: index === current ? 22 : 8, height: 8, borderRadius: 4,
              background: index <= current ? 'var(--primary)' : 'var(--border)',
              transition: 'var(--transition)',
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'progress') {
    const pct = steps.length > 1 ? (current / (steps.length - 1)) * 100 : 0;
    return (
      <div className={className}>
        <div className="d-flex justify-content-between mb-2" style={{ fontSize: '.75rem' }}>
          <span className="fw-semibold">{steps[current]?.label}</span>
          <span className="text-secondary-soft">Step {current + 1} of {steps.length}</span>
        </div>
        <div className="uikit-progress"><div className="uikit-progress__bar" style={{ width: `${pct}%` }} /></div>
      </div>
    );
  }

  const vertical = variant === 'vertical';

  return (
    <ol className={cn('uikit-stepper', vertical && 'uikit-stepper--vertical', className)}>
      {steps.map((step, index) => {
        const state = index < current ? 'done' : index === current ? 'current' : 'todo';
        return (
          <li key={step.key || step.label || index} className={cn('uikit-stepper__item', `is-${state}`)}>
            <button
              type="button"
              className="uikit-stepper__marker"
              disabled={!onStepClick}
              onClick={() => onStepClick?.(index)}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              {state === 'done' ? <i className="bi bi-check-lg" /> : step.icon ? <i className={`bi bi-${step.icon}`} /> : index + 1}
            </button>
            <div className="uikit-stepper__text">
              <div className="uikit-stepper__label">{step.label}</div>
              {step.description && <div className="uikit-helper mt-0">{step.description}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

Stepper.VARIANTS = ['horizontal', 'vertical', 'dots', 'progress'];
Stepper.propTypes = {
  steps: PropTypes.array,
  current: PropTypes.number,
  variant: PropTypes.oneOf(['horizontal', 'vertical', 'dots', 'progress']),
  onStepClick: PropTypes.func,
  className: PropTypes.string,
};
