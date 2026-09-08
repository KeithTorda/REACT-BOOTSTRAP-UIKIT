import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import PageHeader from './PageHeader';

/** Page body wrapper: optional PageHeader + a fluid/constrained container. */
export default function ContentWrapper({ title, subtitle, breadcrumb, actions, fluid = true, className, children }) {
  return (
    <div className={cn('uikit-content', className)}>
      <div className={fluid ? 'container-fluid px-0' : 'container'}>
        {title && <PageHeader title={title} subtitle={subtitle} breadcrumb={breadcrumb} actions={actions} />}
        {children}
      </div>
    </div>
  );
}

ContentWrapper.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  breadcrumb: PropTypes.array,
  actions: PropTypes.node,
  fluid: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
