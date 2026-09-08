import { useRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** One-time-code boxes. <OTPInput length={6} value={code} onChange={setCode} /> */
export default function OTPInput({ length = 6, value = '', onChange, disabled, error, label, className }) {
  const refs = useRef([]);
  const chars = value.padEnd(length).split('').slice(0, length);

  const setChar = (index, char) => {
    const next = chars.map((c, i) => (i === index ? char : c)).join('').trimEnd();
    onChange?.(next);
    if (char && index < length - 1) refs.current[index + 1]?.focus();
  };

  return (
    <div className={cn('mb-3', className)}>
      {label && <div className="form-label">{label}</div>}
      <div className="d-flex gap-2">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => { refs.current[index] = el; }}
            className={cn('form-control text-center fw-semibold', error && 'is-invalid')}
            style={{ width: 46, height: 52, fontSize: '1.25rem' }}
            inputMode="numeric"
            maxLength={1}
            disabled={disabled}
            value={chars[index]?.trim() || ''}
            onChange={(event) => setChar(index, event.target.value.replace(/\D/g, '').slice(-1))}
            onKeyDown={(event) => {
              if (event.key === 'Backspace' && !chars[index]?.trim() && index > 0) refs.current[index - 1]?.focus();
            }}
            onPaste={(event) => {
              event.preventDefault();
              const text = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
              onChange?.(text);
            }}
          />
        ))}
      </div>
      {error && <div className="uikit-error">{error}</div>}
    </div>
  );
}

OTPInput.propTypes = {
  length: PropTypes.number, value: PropTypes.string, onChange: PropTypes.func,
  disabled: PropTypes.bool, error: PropTypes.node, label: PropTypes.node, className: PropTypes.string,
};
