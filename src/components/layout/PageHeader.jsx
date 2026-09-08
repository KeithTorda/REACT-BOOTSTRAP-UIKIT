import PropTypes from 'prop-types';
import Breadcrumb from './Breadcrumb';
import { cn } from '../../utils/cn';

/**
 * Title bar of a page — gradient accent bar comes from the reference template.
 * <PageHeader title="Data Tables" subtitle="…" breadcrumb={[…]} actions={<Button/>} />
 */
export default function PageHeader({ title, subtitle, breadcrumb = [], actions, className }) {
  return (
    <div className={cn('uikit-page-header', className)}>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div>
          <h1 className="uikit-page-header__title">{title}</h1>
          {subtitle && <p className="uikit-page-header__subtitle">{subtitle}</p>}
          {breadcrumb.length > 0 && <div className="mt-2 ms-3"><Breadcrumb items={breadcrumb} /></div>}
        </div>
        {actions && <div className="d-flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  breadcrumb: PropTypes.array,
  actions: PropTypes.node,
  className: PropTypes.string,
};
