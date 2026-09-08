import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import IconButton from '../buttons/IconButton';
import SearchInput from '../forms/SearchInput';
import Avatar from '../display/Avatar';
import Dropdown from '../overlays/Dropdown';
import NotificationDropdown from '../display/NotificationDropdown';
import ThemeToggle from './ThemeToggle';

/** Top bar of the admin layout. Everything is optional and prop-driven. */
export default function Navbar({
  onToggleSidebar,
  search,
  onSearch,
  searchPlaceholder = 'Search…',
  notifications = [],
  messages = [],
  user,
  userMenu = [],
  actions,
  brand,
  brandIcon = 'grid-1x2-fill',
  showThemeToggle = true,
  className,
}) {
  return (
    <header className={cn('uikit-navbar', className)}>
      <IconButton icon="list" variant="light" label="Toggle navigation" onClick={onToggleSidebar} />

      {brand && (
        <span className="d-flex align-items-center gap-2 me-2">
          <span className="uikit-sidebar__brand-mark" style={{ width: 30, height: 30, fontSize: 15 }}>
            <i className={`bi bi-${brandIcon}`} aria-hidden="true" />
          </span>
          <span className="fw-semibold d-none d-sm-block">{brand}</span>
        </span>
      )}

      {onSearch && (
        <div className="d-none d-md-block">
          <SearchInput value={search} onChange={onSearch} placeholder={searchPlaceholder} size="sm" width={280} />
        </div>
      )}

      <div className="ms-auto d-flex align-items-center gap-2">
        {actions}
        {showThemeToggle && <ThemeToggle />}
        {messages.length > 0 && <NotificationDropdown icon="envelope" title="Messages" items={messages} />}
        {notifications.length > 0 && <NotificationDropdown icon="bell" title="Notifications" items={notifications} />}
        {user && (
          <Dropdown
            align="end"
            items={userMenu}
            header={
              <div>
                <div className="fw-semibold text-body">{user.name}</div>
                <div className="text-secondary-soft text-lowercase" style={{ fontSize: '.75rem' }}>{user.email}</div>
              </div>
            }
            trigger={
              <span className="d-flex align-items-center gap-2 cursor-pointer">
                <Avatar name={user.name} src={user.avatar} size={34} />
                <span className="d-none d-lg-block text-start">
                  <span className="d-block fw-semibold" style={{ fontSize: '.8125rem' }}>{user.name}</span>
                  <span className="d-block uikit-helper mt-0">{user.role}</span>
                </span>
                <i className="bi bi-chevron-down text-secondary-soft" style={{ fontSize: '.7rem' }} />
              </span>
            }
          />
        )}
      </div>
    </header>
  );
}

Navbar.propTypes = {
  onToggleSidebar: PropTypes.func,
  search: PropTypes.string,
  onSearch: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  notifications: PropTypes.array,
  messages: PropTypes.array,
  user: PropTypes.object,
  userMenu: PropTypes.array,
  actions: PropTypes.node,
  brand: PropTypes.node,
  brandIcon: PropTypes.string,
  showThemeToggle: PropTypes.bool,
  className: PropTypes.string,
};
