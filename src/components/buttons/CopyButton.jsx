import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/** Copies `value` to the clipboard and confirms for a moment. */
export default function CopyButton({ value, label = 'Copy', copiedLabel = 'Copied', size = 'sm', variant = 'light', tone = 'solid', className }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(String(value ?? ''));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard unavailable */ }
  };
  return (
    <Button size={size} variant={copied ? 'success' : variant} tone={tone} icon={copied ? 'check2' : 'clipboard'} onClick={copy} className={className}>
      {copied ? copiedLabel : label}
    </Button>
  );
}

CopyButton.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
  copiedLabel: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  tone: PropTypes.string,
  className: PropTypes.string,
};
