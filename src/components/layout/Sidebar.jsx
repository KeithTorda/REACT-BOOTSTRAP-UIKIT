import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavMenu from '../navigation/NavMenu';
import { cn } from '../../utils/cn';

/**
 * Configuration-driven sidebar. Menu items come from a JS config object —
 * never hardcoded JSX. See `src/data/navigationData.js`.
 */
export default function Sidebar({
  items = [],
  brand = 'Admin Kit',
  brandIcon = 'grid-1x2-fill',
  brandHref = '/',
  collapsed = false,
  onNavigate,
  footer,
  className,
}) {
  return (
    <aside className={cn('uikit-sidebar', className)}>
      <div className="uikit-sidebar__brand">
        <Link to={brandHref} className="d-flex align-items-center gap-2 text-decoration-none">
          <span className="uikit-sidebar__brand-mark">
            <i className={`bi bi-${brandIcon}`} aria-hidden="true" />
          </span>
          <span className="uikit-sidebar__brand-text">{brand}</span>
        </Link>
      </div>

      <div className="uikit-sidebar__nav">
        <NavMenu items={items} collapsed={collapsed} onNavigate={onNavigate} />
      </div>

      {footer && !collapsed && <div className="p-3 border-top">{footer}</div>}
    </aside>
  );
}

Sidebar.propTypes = {
  items: PropTypes.array,
  brand: PropTypes.node,
  brandIcon: PropTypes.string,
  brandHref: PropTypes.string,
  collapsed: PropTypes.bool,
  onNavigate: PropTypes.func,
  footer: PropTypes.node,
  className: PropTypes.string,
};
