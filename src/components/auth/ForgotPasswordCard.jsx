import { useState } from 'react';
import PropTypes from 'prop-types';
import AuthCard from './AuthCard';
import TextInput from '../forms/TextInput';
import Button from '../buttons/Button';
import Alert from '../feedback/Alert';

/** Presentational password-reset request card. */
export default function ForgotPasswordCard({ onSubmit, loading = false, sent = false, error, footer, ...rest }) {
  const [email, setEmail] = useState('');

  return (
    <AuthCard title="Reset password" subtitle="We'll email you a reset link" footer={footer} {...rest}>
      {sent && <Alert variant="success" title="Check your inbox">A reset link is on its way.</Alert>}
      <form onSubmit={(event) => { event.preventDefault(); onSubmit?.(email); }} noValidate>
        <TextInput
          label="Email" type="email" placeholder="you@example.com" prefix="envelope"
          value={email} onChange={(event) => setEmail(event.target.value)} required error={error}
        />
        <Button type="submit" variant="primary" block loading={loading}>Send reset link</Button>
      </form>
    </AuthCard>
  );
}

ForgotPasswordCard.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  sent: PropTypes.bool,
  error: PropTypes.node,
  footer: PropTypes.node,
};
