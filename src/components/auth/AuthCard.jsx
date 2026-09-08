import PropTypes from 'prop-types';
import Card from '../cards/Card';
import { cn } from '../../utils/cn';

/** Shared shell for the authentication cards (logo, title, body, footer). */
export default function AuthCard({ brand = 'Admin Kit', brandIcon = 'grid-1x2-fill', title, subtitle, footer, showBrand = true, className, children }) {
  return (
    <Card className={cn('uikit-auth__card', className)}>
      <div className="text-center mb-4">
        {showBrand && (
          <span className="uikit-sidebar__brand-mark mx-auto mb-2" style={{ width: 44, height: 44, fontSize: 20 }}>
            <i className={`bi bi-${brandIcon}`} aria-hidden="true" />
          </span>
        )}
        <h5 className="mb-1">{title}</h5>
        {subtitle && <p className="text-secondary-soft small mb-0">{subtitle}</p>}
        {showBrand && <div className="uikit-helper">{brand}</div>}
      </div>
      {children}
      {footer && <div className="text-center small mt-3">{footer}</div>}
    </Card>
  );
}

AuthCard.propTypes = {
  brand: PropTypes.node,
  brandIcon: PropTypes.string,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  footer: PropTypes.node,
  showBrand: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
