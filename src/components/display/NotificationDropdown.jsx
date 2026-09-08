import PropTypes from 'prop-types';
import Dropdown from '../overlays/Dropdown';
import { cn } from '../../utils/cn';

/**
 * Bell/envelope dropdown for the navbar.
 * <NotificationDropdown icon="bell" items={[{ title, description, time, icon, variant }]} />
 */
export default function NotificationDropdown({
  icon = 'bell',
  title = 'Notifications',
  items = [],
  footerLabel = 'View all',
  onFooterClick,
  onItemClick,
  className,
}) {
  const count = items.filter((item) => item.unread !== false).length;

  return (
    <Dropdown
      align="end"
      menuWidth={320}
      header={
        <div className="d-flex justify-content-between align-items-center">
          <span>{title}</span>
          {count > 0 && <span className="uikit-badge" style={{ background: 'var(--primary-soft)', color: 'var(--primary-dark)' }}>{count}</span>}
        </div>
      }
      footer={
        <button type="button" className="btn btn-link btn-sm p-0" onClick={onFooterClick}>
          {footerLabel}
        </button>
      }
      className={className}
      trigger={
        <span className="position-relative d-inline-flex btn btn-light rounded-circle align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
          <i className={`bi bi-${icon}`} aria-hidden="true" />
          {count > 0 && (
            <span
              className="position-absolute rounded-circle"
              style={{ top: 6, right: 7, width: 8, height: 8, background: 'var(--danger)' }}
            />
          )}
        </span>
      }
    >
      <div className="uikit-scroll-y" style={{ maxHeight: 300 }}>
        {items.map((item, index) => (
          <button
            type="button"
            key={item.id || index}
            className="uikit-dropdown__item align-items-start"
            onClick={() => onItemClick?.(item)}
          >
            <span
              className="uikit-stats__icon"
              style={{ width: 32, height: 32, fontSize: 14, background: `var(--${item.variant || 'primary'}-soft, var(--surface-muted))`, color: `var(--${item.variant || 'primary'})` }}
            >
              <i className={`bi bi-${item.icon || 'dot'}`} aria-hidden="true" />
            </span>
            <span className="flex-grow-1">
              <span className={cn('d-block', item.unread !== false && 'fw-semibold')} style={{ fontSize: '.8125rem' }}>
                {item.title}
              </span>
              {item.description && <span className="d-block text-secondary-soft" style={{ fontSize: '.75rem' }}>{item.description}</span>}
              {item.time && <span className="d-block uikit-helper mt-0">{item.time}</span>}
            </span>
          </button>
        ))}
      </div>
    </Dropdown>
  );
}

NotificationDropdown.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  footerLabel: PropTypes.string,
  onFooterClick: PropTypes.func,
  onItemClick: PropTypes.func,
  className: PropTypes.string,
};
