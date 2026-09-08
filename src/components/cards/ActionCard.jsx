import PropTypes from 'prop-types';
import Card from './Card';
import Button from '../buttons/Button';
import { cn } from '../../utils/cn';

/**
 * Icon + copy + call-to-action tile — for shortcut grids and onboarding panels.
 * <ActionCard icon="folder-plus" title="New Folder" description="…" action={{label:'Create', onClick:fn}} />
 */
export default function ActionCard({
  icon = 'lightning-charge', title, description, action, variant = 'primary',
  horizontal = false, onClick, className,
}) {
  return (
    <Card hoverable onClick={onClick} className={cn(onClick && 'cursor-pointer', className)}>
      <div className={cn(horizontal ? 'd-flex align-items-center gap-3 text-start' : 'text-center')}>
        <span
          className="uikit-stats__icon"
          style={{ background: `var(--${variant}-soft, var(--surface-muted))`, color: `var(--${variant})`, margin: horizontal ? 0 : '0 auto 12px' }}
        >
          <i className={`bi bi-${icon}`} aria-hidden="true" />
        </span>
        <div className="flex-grow-1">
          <h6 className="mb-1">{title}</h6>
          {description && <p className="text-secondary-soft small mb-0">{description}</p>}
        </div>
      </div>
      {action && (
        <div className={cn('mt-3', !horizontal && 'text-center')}>
          <Button variant={variant} size="sm" icon={action.icon} onClick={action.onClick}>{action.label}</Button>
        </div>
      )}
    </Card>
  );
}

ActionCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.node,
  description: PropTypes.node,
  action: PropTypes.shape({ label: PropTypes.string, icon: PropTypes.string, onClick: PropTypes.func }),
  variant: PropTypes.string,
  horizontal: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
