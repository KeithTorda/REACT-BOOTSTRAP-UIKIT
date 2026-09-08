import { useState } from 'react';
import PropTypes from 'prop-types';
import AuthCard from './AuthCard';
import TextInput from '../forms/TextInput';
import Checkbox from '../forms/Checkbox';
import Button from '../buttons/Button';

/** Presentational registration card. */
export default function RegisterCard({ onSubmit, loading = false, error, footer, ...rest }) {
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '', terms: false });
  const update = (key) => (event) =>
    setValues((prev) => ({ ...prev, [key]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));

  return (
    <AuthCard title="Create account" subtitle="It only takes a minute" footer={footer} {...rest}>
      <form onSubmit={(event) => { event.preventDefault(); onSubmit?.(values); }} noValidate>
        <TextInput label="Full name" placeholder="John Doe" prefix="person" value={values.name} onChange={update('name')} required error={error?.name} />
        <TextInput label="Email" type="email" placeholder="you@example.com" prefix="envelope" value={values.email} onChange={update('email')} required error={error?.email} />
        <div className="row">
          <div className="col-sm-6">
            <TextInput label="Password" type="password" placeholder="••••••••" value={values.password} onChange={update('password')} required />
          </div>
          <div className="col-sm-6">
            <TextInput label="Confirm" type="password" placeholder="••••••••" value={values.confirm} onChange={update('confirm')} required error={error?.confirm} />
          </div>
        </div>
        <Checkbox className="mb-3" label="I agree to the terms and privacy policy" checked={values.terms} onChange={update('terms')} />
        <Button type="submit" variant="primary" block loading={loading}>Create account</Button>
      </form>
    </AuthCard>
  );
}

RegisterCard.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.object,
  footer: PropTypes.node,
};
