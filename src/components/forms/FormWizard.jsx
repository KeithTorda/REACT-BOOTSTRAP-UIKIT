import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../cards/Card';
import Button from '../buttons/Button';
import Stepper from '../navigation/Stepper';

/**
 * Multi-step form.
 *
 * <FormWizard
 *   steps={[{ key:'a', label:'Details', content: <Fields/>, validate: () => true }]}
 *   onFinish={values => …}
 *   orientation="horizontal"
 * />
 */
export default function FormWizard({
  steps = [], onFinish, orientation = 'horizontal', title, subtitle,
  finishLabel = 'Finish', nextLabel = 'Next', backLabel = 'Back', className,
}) {
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(null);
  const step = steps[current];
  const isLast = current === steps.length - 1;

  const next = () => {
    const result = step?.validate ? step.validate() : true;
    if (result !== true) { setError(typeof result === 'string' ? result : 'Please complete this step.'); return; }
    setError(null);
    if (isLast) onFinish?.();
    else setCurrent((c) => c + 1);
  };

  const stepper = (
    <Stepper
      steps={steps}
      current={current}
      variant={orientation === 'vertical' ? 'vertical' : 'horizontal'}
      onStepClick={(index) => index < current && setCurrent(index)}
    />
  );

  return (
    <Card title={title} subtitle={subtitle} className={className}
      footer={
        <div className="d-flex justify-content-between">
          <Button variant="light" icon="arrow-left" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>{backLabel}</Button>
          <Button variant={isLast ? 'success' : 'primary'} icon={isLast ? 'check2' : 'arrow-right'} iconPosition="end" onClick={next}>
            {isLast ? finishLabel : nextLabel}
          </Button>
        </div>
      }
    >
      {orientation === 'vertical' ? (
        <div className="row g-4">
          <div className="col-md-4">{stepper}</div>
          <div className="col-md-8">
            {error && <div className="uikit-error mb-2">{error}</div>}
            {step?.content}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">{stepper}</div>
          {error && <div className="uikit-error mb-2">{error}</div>}
          {step?.content}
        </>
      )}
    </Card>
  );
}

FormWizard.propTypes = {
  steps: PropTypes.array, onFinish: PropTypes.func,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  title: PropTypes.node, subtitle: PropTypes.node,
  finishLabel: PropTypes.string, nextLabel: PropTypes.string, backLabel: PropTypes.string,
  className: PropTypes.string,
};
