import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import { initialsOf } from '../../utils/format';

/** <Avatar name="Jane Smith" src={url} size={40} status="online" /> */
export default function Avatar({ name = '', src, size = 40, square = false, status, className, style: styleProp, ...rest }) {
  const style = { width: size, height: size, fontSize: Math.max(11, size * 0.36), ...styleProp };
  const avatar = src ? (
    <img src={src} alt={name} className={cn('uikit-avatar', square && 'uikit-avatar--square', className)} style={style} {...rest} />
  ) : (
    <span className={cn('uikit-avatar', square && 'uikit-avatar--square', className)} style={style} title={name} {...rest}>
      {initialsOf(name) || '?'}
    </span>
  );

  if (!status) return avatar;

  const colors = { online: 'var(--success)', busy: 'var(--danger)', away: 'var(--warning)', offline: 'var(--text-muted)' };
  return (
    <span className="position-relative d-inline-flex">
      {avatar}
      <span
        className="position-absolute rounded-circle border border-white"
        style={{ width: size * 0.28, height: size * 0.28, right: 0, bottom: 0, background: colors[status] || colors.offline }}
      />
    </span>
  );
}

Avatar.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.number,
  square: PropTypes.bool,
  status: PropTypes.oneOf(['online', 'busy', 'away', 'offline']),
  className: PropTypes.string,
  style: PropTypes.object,
};
