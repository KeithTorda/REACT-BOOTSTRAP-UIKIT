import { useState } from 'react';
import PropTypes from 'prop-types';
import AuthCard from './AuthCard';
import TextInput from '../forms/TextInput';
import Checkbox from '../forms/Checkbox';
import Button from '../buttons/Button';

/**
 * Presentational login card — no auth logic, just `onSubmit(values)`.
 */
export default function LoginCard({ onSubmit, loading = false, error, footer, ...rest }) {
  const [values, setValues] = useState({ email: '', password: '', remember: false });
  const update = (key) => (event) =>
    setValues((prev) => ({ ...prev, [key]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));

  return (
    <AuthCard title="Sign in" subtitle="Enter your credentials to continue" footer={footer} {...rest}>
      <form
        onSubmit={(event) => { event.preventDefault(); onSubmit?.(values); }}
        noValidate
      >
        <TextInput label="Email" type="email" placeholder="you@example.com" prefix="envelope"
          value={values.email} onChange={update('email')} required error={error?.email} />
        <TextInput label="Password" type="password" placeholder="••••••••" prefix="lock"
          value={values.password} onChange={update('password')} required error={error?.password} />
        <div className="d-flex align-items-center justify-content-between mb-3">
          <Checkbox label="Remember me" checked={values.remember} onChange={update('remember')} />
          <a href="#forgot" className="small">Forgot password?</a>
        </div>
        <Button type="submit" variant="primary" block loading={loading}>Sign in</Button>
      </form>
    </AuthCard>
  );
}

LoginCard.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.object,
  footer: PropTypes.node,
};
