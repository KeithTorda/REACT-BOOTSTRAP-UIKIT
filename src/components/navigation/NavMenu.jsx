import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

function isBranchActive(item, pathname) {
  if (item.path && pathname === item.path) return true;
  return (item.children || []).some((child) => child.path && pathname.startsWith(child.path));
}

/**
 * Recursive, configuration-driven navigation used by the Sidebar.
 * Accepts the same shape as `data/navigationData.js`:
 * [{ section: 'Main', items: [{ label, icon, path, children: [...] }] }]
 * or a flat array of items.
 */
export default function NavMenu({ items = [], collapsed = false, horizontal = false, onNavigate, className }) {
  const groups = items.length && items[0].items ? items : [{ section: null, items }];
  if (horizontal) {
    const flat = groups.flatMap((group) => group.items);
    return (
      <nav className={cn('d-flex align-items-center gap-1', className)}>
        {flat.map((item) => (
          <NavItem key={item.label} item={item} horizontal onNavigate={onNavigate} />
        ))}
      </nav>
    );
  }
  return (
    <nav className={className}>
      {groups.map((group, index) => (
        <div key={group.section || `group-${index}`}>
          {group.section && !collapsed && <div className="uikit-sidebar__section">{group.section}</div>}
          <ul className="list-unstyled mb-0">
            {group.items.map((item) => (
              <NavItem key={item.label} item={item} collapsed={collapsed} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function NavItem({ item, collapsed, horizontal, onNavigate }) {
  const { pathname } = useLocation();
  const hasChildren = Boolean(item.children?.length);
  const [open, setOpen] = useState(() => isBranchActive(item, pathname));

  if (hasChildren) {
    const Wrapper = horizontal ? 'div' : 'li';
    return (
      <Wrapper className={horizontal ? 'uikit-dropdown' : undefined}>
        <button
          type="button"
          className={cn('uikit-nav-link', isBranchActive(item, pathname) && 'is-active')}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          title={collapsed ? item.label : undefined}
        >
          {item.icon && <i className={`bi bi-${item.icon}`} aria-hidden="true" />}
          <span>{item.label}</span>
          <i className={cn('bi bi-chevron-right uikit-nav-link__arrow', open && 'is-open')} aria-hidden="true" />
        </button>
        {open && !collapsed && (
          <ul className={horizontal ? 'uikit-dropdown__menu uikit-dropdown__menu--start list-unstyled mb-0' : 'uikit-nav-sub'}>
            {item.children.map((child) => (
              <NavItem key={child.label} item={child} onNavigate={onNavigate} />
            ))}
          </ul>
        )}
      </Wrapper>
    );
  }

  const Item = horizontal ? 'div' : 'li';
  return (
    <Item>
      <NavLink
        to={item.path || '#'}
        end={item.end ?? true}
        onClick={onNavigate}
        title={collapsed ? item.label : undefined}
        className={({ isActive }) => cn('uikit-nav-link', isActive && 'is-active')}
      >
        {item.icon && <i className={`bi bi-${item.icon}`} aria-hidden="true" />}
        <span>{item.label}</span>
        {item.badge && <span className="ms-auto">{item.badge}</span>}
      </NavLink>
    </Item>
  );
}

const itemShape = PropTypes.shape({
  label: PropTypes.string,
  icon: PropTypes.string,
  path: PropTypes.string,
  children: PropTypes.array,
});

NavMenu.propTypes = {
  items: PropTypes.array,
  collapsed: PropTypes.bool,
  horizontal: PropTypes.bool,
  onNavigate: PropTypes.func,
  className: PropTypes.string,
};

NavItem.propTypes = {
  item: itemShape.isRequired,
  collapsed: PropTypes.bool,
  horizontal: PropTypes.bool,
  onNavigate: PropTypes.func,
};
