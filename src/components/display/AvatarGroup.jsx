import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { cn } from '../../utils/cn';

/** <AvatarGroup users={[{name,avatar}]} max={4} size={34} /> */
export default function AvatarGroup({ users = [], max = 4, size = 34, className }) {
  const visible = users.slice(0, max);
  const overflow = users.length - visible.length;

  return (
    <div className={cn('uikit-avatar-group', className)}>
      {visible.map((user, index) => (
        <Avatar
          key={user.id || user.name || index}
          name={user.name}
          src={user.avatar}
          size={size}
          style={index === 0 ? undefined : { marginLeft: -Math.round(size / 3.4) }}
        />
      ))}
      {overflow > 0 && (
        <span
          className="uikit-avatar"
          style={{ width: size, height: size, fontSize: Math.max(10, size * 0.32), marginLeft: -Math.round(size / 3.4), background: 'var(--surface-muted)', color: 'var(--text-secondary)' }}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}

AvatarGroup.propTypes = {
  users: PropTypes.array,
  max: PropTypes.number,
  size: PropTypes.number,
  className: PropTypes.string,
};
