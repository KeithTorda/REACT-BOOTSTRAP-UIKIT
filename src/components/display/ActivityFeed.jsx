import PropTypes from 'prop-types';
import Avatar from './Avatar';
import EmptyState from '../feedback/EmptyState';
import { cn } from '../../utils/cn';

/**
 * <ActivityFeed items={[{ user, avatar, action, target, time, icon, variant }]} maxHeight={320} />
 */
export default function ActivityFeed({ items = [], maxHeight, emptyText = 'No recent activity', className }) {
  if (!items.length) return <EmptyState icon="activity" title={emptyText} />;

  return (
    <div className={cn('uikit-scroll-y', className)} style={maxHeight ? { maxHeight } : undefined}>
      {items.map((item, index) => (
        <div className="uikit-feed__item" key={item.id || index}>
          {item.icon ? (
            <span
              className="uikit-stats__icon"
              style={{ width: 36, height: 36, fontSize: 16, background: `var(--${item.variant || 'primary'}-soft, var(--surface-muted))`, color: `var(--${item.variant || 'primary'})` }}
            >
              <i className={`bi bi-${item.icon}`} aria-hidden="true" />
            </span>
          ) : (
            <Avatar name={item.user} src={item.avatar} size={36} />
          )}
          <div className="flex-grow-1">
            <div style={{ fontSize: '.8125rem' }}>
              <span className="fw-semibold">{item.user}</span> {item.action}{' '}
              {item.target && <span className="fw-semibold">{item.target}</span>}
            </div>
            {item.time && <div className="uikit-helper mt-0">{item.time}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

ActivityFeed.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  emptyText: PropTypes.string,
  className: PropTypes.string,
};
