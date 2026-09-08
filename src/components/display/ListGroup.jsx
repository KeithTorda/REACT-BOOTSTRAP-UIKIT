import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { cn } from '../../utils/cn';

/**
 * Config-driven list.
 * variant: simple · actions · avatar · checklist
 * <ListGroup variant="avatar" items={[{ title, subtitle, avatar, meta, actions }]} />
 */
export default function ListGroup({
  items = [], variant = 'simple', onItemClick, checked = [], onCheck, hoverable = true, className,
}) {
  return (
    <ul className={cn('uikit-list', className)}>
      {items.map((item, index) => {
        const key = item.id ?? item.title ?? index;
        return (
          <li
            key={key}
            className={cn('uikit-list__item', hoverable && 'is-hoverable', onItemClick && 'cursor-pointer')}
            onClick={onItemClick ? () => onItemClick(item) : undefined}
          >
            {variant === 'checklist' && (
              <input
                type="checkbox"
                className="form-check-input mt-0"
                checked={checked.includes(key)}
                onChange={() => onCheck?.(key, item)}
                onClick={(event) => event.stopPropagation()}
              />
            )}
            {variant === 'avatar' && <Avatar name={item.title} src={item.avatar} size={38} status={item.status} />}
            {item.icon && variant !== 'avatar' && (
              <span
                className="uikit-stats__icon"
                style={{ width: 34, height: 34, fontSize: 15, background: `var(--${item.variant || 'primary'}-soft)`, color: `var(--${item.variant || 'primary'})` }}
              >
                <i className={`bi bi-${item.icon}`} />
              </span>
            )}
            <div className="flex-grow-1 min-width-0">
              <div className={cn('fw-semibold text-truncate', checked.includes(key) && 'text-decoration-line-through text-secondary-soft')} style={{ fontSize: '.8125rem' }}>
                {item.title}
              </div>
              {item.subtitle && <div className="uikit-helper mt-0 text-truncate">{item.subtitle}</div>}
            </div>
            {item.meta && <span className="uikit-helper mt-0 text-nowrap">{item.meta}</span>}
            {item.badge}
            {variant === 'actions' && item.actions && (
              <div className="d-flex gap-1" onClick={(event) => event.stopPropagation()}>{item.actions}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

ListGroup.VARIANTS = ['simple', 'actions', 'avatar', 'checklist'];
ListGroup.propTypes = {
  items: PropTypes.array,
  variant: PropTypes.oneOf(['simple', 'actions', 'avatar', 'checklist']),
  onItemClick: PropTypes.func,
  checked: PropTypes.array,
  onCheck: PropTypes.func,
  hoverable: PropTypes.bool,
  className: PropTypes.string,
};
