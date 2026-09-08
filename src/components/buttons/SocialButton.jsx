import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const BRANDS = {
  google: { icon: 'google', color: '#ea4335', label: 'Google' },
  facebook: { icon: 'facebook', color: '#1877f2', label: 'Facebook' },
  github: { icon: 'github', color: '#24292f', label: 'GitHub' },
  microsoft: { icon: 'microsoft', color: '#00a4ef', label: 'Microsoft' },
  apple: { icon: 'apple', color: '#000000', label: 'Apple' },
  twitter: { icon: 'twitter-x', color: '#000000', label: 'X' },
  linkedin: { icon: 'linkedin', color: '#0a66c2', label: 'LinkedIn' },
};

/** Branded sign-in button. <SocialButton brand="google" block /> */
export default function SocialButton({ brand = 'google', label, filled = false, block = false, className, ...rest }) {
  const preset = BRANDS[brand] || BRANDS.google;
  return (
    <button
      type="button"
      className={cn('btn d-inline-flex align-items-center justify-content-center gap-2', block && 'w-100', className)}
      style={
        filled
          ? { background: preset.color, color: '#fff', border: 0 }
          : { background: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }
      }
      {...rest}
    >
      <i className={`bi bi-${preset.icon}`} style={filled ? undefined : { color: preset.color }} aria-hidden="true" />
      <span>{label || `Continue with ${preset.label}`}</span>
    </button>
  );
}

SocialButton.BRANDS = Object.keys(BRANDS);
SocialButton.propTypes = {
  brand: PropTypes.oneOf(Object.keys(BRANDS)),
  label: PropTypes.string,
  filled: PropTypes.bool,
  block: PropTypes.bool,
  className: PropTypes.string,
};
