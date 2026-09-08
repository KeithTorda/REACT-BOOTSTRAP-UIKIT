import { useState } from 'react';
import PropTypes from 'prop-types';
import AuthCard from './AuthCard';
import OTPInput from '../forms/OTPInput';
import Button from '../buttons/Button';

/** Code-verification card (email/SMS OTP or 2FA). */
export default function OTPVerifyCard({
  onSubmit, onResend, length = 6, sentTo = 'your email', loading = false, error, footer, ...rest
}) {
  const [code, setCode] = useState('');
  return (
    <AuthCard title="Verify your identity" subtitle={`We sent a ${length}-digit code to ${sentTo}`} footer={footer} {...rest}>
      <form onSubmit={(event) => { event.preventDefault(); onSubmit?.(code); }} noValidate>
        <div className="d-flex justify-content-center">
          <OTPInput length={length} value={code} onChange={setCode} error={error} />
        </div>
        <Button type="submit" block loading={loading} disabled={code.length < length}>Verify</Button>
        {onResend && (
          <div className="text-center mt-3">
            <button type="button" className="btn btn-link btn-sm p-0" onClick={onResend}>Resend code</button>
          </div>
        )}
      </form>
    </AuthCard>
  );
}

OTPVerifyCard.propTypes = {
  onSubmit: PropTypes.func, onResend: PropTypes.func, length: PropTypes.number,
  sentTo: PropTypes.string, loading: PropTypes.bool, error: PropTypes.node, footer: PropTypes.node,
};
