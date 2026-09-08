import { useState } from 'react';
import PropTypes from 'prop-types';
import AuthCard from './AuthCard';
import PasswordInput from '../forms/PasswordInput';
import Button from '../buttons/Button';
import Avatar from '../display/Avatar';

/** Locked-session card — asks only for the password. */
export default function LockScreenCard({ user = {}, onUnlock, onSwitchUser, loading = false, error, ...rest }) {
  const [password, setPassword] = useState('');
  return (
    <AuthCard title={user.name || 'Locked'} subtitle="Enter your password to continue" showBrand={false} {...rest}
      footer={onSwitchUser && <button type="button" className="btn btn-link btn-sm p-0" onClick={onSwitchUser}>Sign in as a different user</button>}>
      <div className="text-center mb-3">
        <Avatar name={user.name} src={user.avatar} size={72} />
      </div>
      <form onSubmit={(event) => { event.preventDefault(); onUnlock?.(password); }} noValidate>
        <PasswordInput label={null} value={password} onChange={(event) => setPassword(event.target.value)} error={error} />
        <Button type="submit" block icon="unlock" loading={loading}>Unlock</Button>
      </form>
    </AuthCard>
  );
}

LockScreenCard.propTypes = {
  user: PropTypes.object, onUnlock: PropTypes.func, onSwitchUser: PropTypes.func,
  loading: PropTypes.bool, error: PropTypes.node,
};
