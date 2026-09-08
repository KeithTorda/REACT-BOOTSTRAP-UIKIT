import { useState } from 'react';
import PropTypes from 'prop-types';
import CodeBlock from './CodeBlock';
import { cn } from '../../utils/cn';

/** Live preview stage + collapsible usage snippet. */
export default function Preview({ code, muted = false, stageClassName, className, children }) {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className={cn('uikit-preview', className)}>
      <div className={cn('uikit-preview__stage', muted && 'uikit-preview__stage--muted', stageClassName)}>{children}</div>
      {code && (
        <>
          <div className="uikit-preview__bar">
            <span>Usage</span>
            <button type="button" className="btn btn-sm btn-light" onClick={() => setShowCode((v) => !v)}>
              <i className={`bi bi-chevron-${showCode ? 'up' : 'down'} me-1`} aria-hidden="true" />
              {showCode ? 'Hide code' : 'Show code'}
            </button>
          </div>
          {showCode && <CodeBlock code={code} />}
        </>
      )}
    </div>
  );
}

Preview.propTypes = {
  code: PropTypes.string,
  muted: PropTypes.bool,
  stageClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
