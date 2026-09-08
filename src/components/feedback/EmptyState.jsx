import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import Button from '../buttons/Button';

/** <EmptyState icon="inbox" title="No records yet" action={{ label: 'Add', onClick: fn }} /> */
export default function EmptyState({
  icon = 'inbox',
  title = 'Nothing here yet',
  description,
  action,
  secondaryAction,
  className,
  children,
}) {
  return (
    <div className={cn('uikit-empty', className)}>
      <div className="uikit-empty__icon">
        <i className={`bi bi-${icon}`} aria-hidden="true" />
      </div>
      <h5 className="mb-1">{title}</h5>
      {description && <p className="mb-3 small">{description}</p>}
      {children}
      {(action || secondaryAction) && (
        <div className="d-flex gap-2 justify-content-center mt-2">
          {action && <Button variant="primary" icon={action.icon} onClick={action.onClick}>{action.label}</Button>}
          {secondaryAction && (
            <Button variant="light" icon={secondaryAction.icon} onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

const actionShape = PropTypes.shape({
  label: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
});

EmptyState.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.node,
  description: PropTypes.node,
  action: actionShape,
  secondaryAction: actionShape,
  className: PropTypes.string,
  children: PropTypes.node,
};
