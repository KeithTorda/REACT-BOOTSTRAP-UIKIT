import PropTypes from 'prop-types';
import TextInput from './TextInput';

const MASKS = {
  phone: { pattern: '(###) ###-####', digitsOnly: true },
  mobile: { pattern: '+## ### ### ####', digitsOnly: true },
  date: { pattern: '##/##/####', digitsOnly: true },
  card: { pattern: '#### #### #### ####', digitsOnly: true },
  time: { pattern: '##:##', digitsOnly: true },
  zip: { pattern: '####', digitsOnly: true },
};

function applyMask(raw, pattern) {
  const digits = String(raw).replace(/\D/g, '');
  let out = '';
  let index = 0;
  for (const char of pattern) {
    if (index >= digits.length) break;
    if (char === '#') { out += digits[index]; index += 1; } else { out += char; }
  }
  return out;
}

function formatCurrency(raw, { locale = 'en-US', currency } = {}) {
  const digits = String(raw).replace(/[^\d.]/g, '');
  if (!digits) return '';
  const number = Number(digits);
  if (Number.isNaN(number)) return '';
  return new Intl.NumberFormat(locale, currency ? { style: 'currency', currency } : { minimumFractionDigits: 0 }).format(number);
}

/**
 * Formatted text field.
 * <MaskedInput mask="phone" label="Phone" value={v} onChange={fn} />
 * <MaskedInput mask="currency" currency="PHP" label="Amount" />
 * Custom: mask="pattern" pattern="AA-####"  (# = digit)
 */
export default function MaskedInput({ mask = 'phone', pattern, currency, locale, value = '', onChange, ...rest }) {
  const handle = (event) => {
    const raw = event.target.value;
    const next =
      mask === 'currency'
        ? formatCurrency(raw, { locale, currency })
        : applyMask(raw, pattern || MASKS[mask]?.pattern || '####');
    onChange?.({ ...event, target: { ...event.target, value: next } }, next);
  };
  return <TextInput value={value} onChange={handle} inputMode="numeric" {...rest} />;
}

MaskedInput.MASKS = [...Object.keys(MASKS), 'currency', 'pattern'];
MaskedInput.propTypes = {
  mask: PropTypes.string, pattern: PropTypes.string, currency: PropTypes.string,
  locale: PropTypes.string, value: PropTypes.string, onChange: PropTypes.func,
};
