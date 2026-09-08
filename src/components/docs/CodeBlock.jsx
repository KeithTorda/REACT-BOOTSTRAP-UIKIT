import { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** Read-only code sample with a copy button. Used by the showcase pages. */
export default function CodeBlock({ code = '', language = 'jsx', className }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={cn('position-relative', className)}>
      <button
        type="button"
        className="btn btn-sm btn-dark position-absolute"
        style={{ top: 8, right: 8, opacity: 0.85 }}
        onClick={copy}
      >
        <i className={`bi bi-${copied ? 'check2' : 'clipboard'}`} aria-hidden="true" />
        <span className="ms-1">{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <pre className="uikit-code"><code data-language={language}>{code.trim()}</code></pre>
    </div>
  );
}

CodeBlock.propTypes = {
  code: PropTypes.string,
  language: PropTypes.string,
  className: PropTypes.string,
};
