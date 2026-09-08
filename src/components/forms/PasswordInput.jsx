import { useId, useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import FormGroup from './FormGroup';

function scorePassword(value = '') {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return Math.min(score, 4);
}

const LABELS = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
const COLORS = ['var(--danger)', 'var(--danger)', 'var(--warning)', 'var(--info)', 'var(--success)'];

/** Password field with show/hide and an optional strength meter. */
export default function PasswordInput({
  id, label = 'Password', value = '', onChange, placeholder = '••••••••',
  required, disabled, error, helperText, size = 'md', strength = false, className, ...rest
}) {
  const autoId = useId();
  const inputId = id || `password-${autoId}`;
  const [visible, setVisible] = useState(false);
  const score = scorePassword(value);

  return (
    <FormGroup id={inputId} label={label} required={required} error={error} helperText={helperText}>
      <div className="input-group">
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          className={cn('form-control', size !== 'md' && `form-control-${size}`, error && 'is-invalid', className)}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          {...rest}
        />
        <button type="button" className="btn btn-light border" onClick={() => setVisible((v) => !v)} aria-label={visible ? 'Hide password' : 'Show password'}>
          <i className={`bi bi-${visible ? 'eye-slash' : 'eye'}`} />
        </button>
      </div>

      {strength && value && (
        <div className="mt-2">
          <div className="d-flex gap-1">
            {[0, 1, 2, 3].map((index) => (
              <span
                key={index}
                style={{ height: 4, flex: 1, borderRadius: 2, background: index < score ? COLORS[score] : 'var(--surface-muted)' }}
              />
            ))}
          </div>
          <div className="uikit-helper" style={{ color: COLORS[score] }}>{LABELS[score]}</div>
        </div>
      )}
    </FormGroup>
  );
}

PasswordInput.propTypes = {
  id: PropTypes.string, label: PropTypes.node, value: PropTypes.string, onChange: PropTypes.func,
  placeholder: PropTypes.string, required: PropTypes.bool, disabled: PropTypes.bool,
  error: PropTypes.node, helperText: PropTypes.node, size: PropTypes.string,
  strength: PropTypes.bool, className: PropTypes.string,
};
