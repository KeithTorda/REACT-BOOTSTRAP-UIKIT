import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** <Footer brand="Admin Kit" links={[{ label:'Docs', href:'#' }]} /> */
export default function Footer({ brand = 'Admin UI Kit', version, links = [], className }) {
  const year = new Date().getFullYear();
  return (
    <footer className={cn('uikit-footer', className)}>
      <span>© {year} {brand}{version ? ` · v${version}` : ''}</span>
      {links.length > 0 && (
        <nav className="d-flex gap-3">
          {links.map((link) => (
            <a key={link.label} href={link.href || '#'} className="text-secondary-soft">{link.label}</a>
          ))}
        </nav>
      )}
    </footer>
  );
}

Footer.propTypes = {
  brand: PropTypes.string,
  version: PropTypes.string,
  links: PropTypes.array,
  className: PropTypes.string,
};
