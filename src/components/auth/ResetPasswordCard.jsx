import { useState } from 'react';
import PropTypes from 'prop-types';
import AuthCard from './AuthCard';
import PasswordInput from '../forms/PasswordInput';
import Button from '../buttons/Button';

/** Set-a-new-password card. */
export default function ResetPasswordCard({ onSubmit, loading = false, error, footer, ...rest }) {
  const [values, setValues] = useState({ password: '', confirm: '' });
  const mismatch = values.confirm && values.password !== values.confirm;

  return (
    <AuthCard title="Set a new password" subtitle="Choose a strong password you'll remember" footer={footer} {...rest}>
      <form onSubmit={(event) => { event.preventDefault(); onSubmit?.(values); }} noValidate>
        <PasswordInput label="New password" strength value={values.password}
          onChange={(event) => setValues((p) => ({ ...p, password: event.target.value }))} required error={error?.password} />
        <PasswordInput label="Confirm password" value={values.confirm}
          onChange={(event) => setValues((p) => ({ ...p, confirm: event.target.value }))} required
          error={mismatch ? 'Passwords do not match' : error?.confirm} />
        <Button type="submit" block loading={loading} disabled={mismatch}>Update password</Button>
      </form>
    </AuthCard>
  );
}

ResetPasswordCard.propTypes = { onSubmit: PropTypes.func, loading: PropTypes.bool, error: PropTypes.object, footer: PropTypes.node };
