import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

/** <Breadcrumb items={[{ label:'Home', path:'/' }, { label:'Cards' }]} /> */
export default function Breadcrumb({ items = [], className }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn('breadcrumb uikit-breadcrumb', className)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className={cn('breadcrumb-item', isLast && 'active')} aria-current={isLast ? 'page' : undefined}>
              {isLast || !item.path ? item.label : <Link to={item.path}>{item.label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
};
