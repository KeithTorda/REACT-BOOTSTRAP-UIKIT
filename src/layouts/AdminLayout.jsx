import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ThemeCustomizer from '../components/layout/ThemeCustomizer';
import NavMenu from '../components/navigation/NavMenu';
import { cn } from '../utils/cn';
import useMediaQuery from '../hooks/useMediaQuery';
import { useTheme } from '../theme/ThemeProvider';

/**
 * Responsive admin shell.
 *  ≥1200px  fixed sidebar · 992–1199 icon rail · <992px off-canvas drawer
 * The `layout` theme setting swaps the whole shape: sidebar / horizontal / stacked / rail / boxed.
 */
export default function AdminLayout({
  navigation = [],
  brand = 'Admin UI Kit',
  brandIcon = 'grid-1x2-fill',
  user,
  userMenu = [],
  notifications = [],
  messages = [],
  onSearch,
  footerLinks = [],
  navbarActions,
  showCustomizer = true,
  showThemeToggle = true,
  children,
}) {
  const { settings } = useTheme();
  const isMobile = useMediaQuery('(max-width: 991.98px)');
  const isTablet = useMediaQuery('(max-width: 1199.98px)');
  const horizontal = settings.layout === 'horizontal' || settings.layout === 'stacked';
  const [collapsed, setCollapsed] = useState(settings.layout === 'rail');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCollapsed(settings.layout === 'rail' || (isTablet && !isMobile));
    if (!isMobile) setOpen(false);
  }, [isTablet, isMobile, settings.layout]);

  const toggle = () => (isMobile || horizontal ? setOpen((v) => !v) : setCollapsed((v) => !v));

  return (
    <div className={cn('uikit-shell', collapsed && !horizontal && 'is-collapsed', open && 'is-open')}>
      <Sidebar
        items={navigation}
        brand={brand}
        brandIcon={brandIcon}
        collapsed={collapsed && !isMobile && !horizontal}
        onNavigate={() => isMobile && setOpen(false)}
      />

      {isMobile && open && <div className="uikit-backdrop" onClick={() => setOpen(false)} />}

      <Navbar
        onToggleSidebar={toggle}
        onSearch={onSearch}
        user={user}
        userMenu={userMenu}
        notifications={notifications}
        messages={messages}
        actions={navbarActions}
        showThemeToggle={showThemeToggle}
        brand={horizontal ? brand : undefined}
        brandIcon={brandIcon}
      />

      {horizontal && (
        <div className="uikit-topmenu">
          <NavMenu items={navigation} horizontal />
        </div>
      )}

      <main className="uikit-main">
        {children || <Outlet />}
        <Footer brand={brand} links={footerLinks} version="2.0.0" />
      </main>

      {showCustomizer && <ThemeCustomizer />}
    </div>
  );
}

AdminLayout.propTypes = {
  navigation: PropTypes.array,
  brand: PropTypes.node,
  brandIcon: PropTypes.string,
  user: PropTypes.object,
  userMenu: PropTypes.array,
  notifications: PropTypes.array,
  messages: PropTypes.array,
  onSearch: PropTypes.func,
  footerLinks: PropTypes.array,
  navbarActions: PropTypes.node,
  showCustomizer: PropTypes.bool,
  showThemeToggle: PropTypes.bool,
  children: PropTypes.node,
};
