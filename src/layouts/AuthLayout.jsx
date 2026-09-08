import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { cn } from '../utils/cn';

/**
 * Shell for sign-in screens.
 * variant: centered · split · full · minimal
 *
 * <AuthLayout variant="split" image={url} headline="Welcome back" tagline="…">
 *   <LoginCard />
 * </AuthLayout>
 */
export default function AuthLayout({
  variant = 'centered', image, headline, tagline, brand = 'Admin UI Kit', brandIcon = 'grid-1x2-fill',
  footer, className, children,
}) {
  const content = children || <Outlet />;

  if (variant === 'split') {
    return (
      <div className={cn('uikit-auth-split', className)}>
        <aside className="uikit-auth-split__aside" style={image ? { backgroundImage: `url(${image})` } : undefined}>
          <div className="uikit-auth-split__overlay">
            <div className="d-flex align-items-center gap-2 mb-auto">
              <span className="uikit-sidebar__brand-mark"><i className={`bi bi-${brandIcon}`} /></span>
              <span className="fw-semibold text-white">{brand}</span>
            </div>
            {headline && <h2 className="text-white mb-2">{headline}</h2>}
            {tagline && <p className="text-white-50 mb-0">{tagline}</p>}
          </div>
        </aside>
        <main className="uikit-auth-split__main">
          <div className="w-100" style={{ maxWidth: 420 }}>{content}</div>
        </main>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={cn('uikit-auth', className)} style={{ padding: 0 }}>
        <div className="w-100 h-100 d-flex align-items-center justify-content-center p-4">
          <div className="w-100" style={{ maxWidth: 460 }}>{content}</div>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn('d-flex align-items-center justify-content-center min-vh-100 p-4', className)} style={{ background: 'var(--surface)' }}>
        <div className="w-100" style={{ maxWidth: 400 }}>{content}</div>
      </div>
    );
  }

  return (
    <div className={cn('uikit-auth', className)}>
      <div className="w-100 d-flex flex-column align-items-center">
        {content}
        {footer && <div className="mt-3 small text-secondary-soft">{footer}</div>}
      </div>
    </div>
  );
}

AuthLayout.VARIANTS = ['centered', 'split', 'full', 'minimal'];
AuthLayout.propTypes = {
  variant: PropTypes.oneOf(['centered', 'split', 'full', 'minimal']),
  image: PropTypes.string, headline: PropTypes.node, tagline: PropTypes.node,
  brand: PropTypes.node, brandIcon: PropTypes.string, footer: PropTypes.node,
  className: PropTypes.string, children: PropTypes.node,
};
