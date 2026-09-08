import PropTypes from 'prop-types';
import IconButton from '../buttons/IconButton';
import Tooltip from '../overlays/Tooltip';
import Dropdown from '../overlays/Dropdown';
import { cn } from '../../utils/cn';

/**
 * Row action cell.
 * <TableActions row={row} actions={[{ icon:'pencil', label:'Edit', onClick:fn }]} />
 * Set `as="menu"` to collapse them into a kebab dropdown.
 */
export default function TableActions({ row, actions = [], as = 'buttons', className }) {
  if (!actions.length) return null;

  if (as === 'menu') {
    return (
      <Dropdown
        align="end"
        className={className}
        trigger={<IconButton icon="three-dots-vertical" size="sm" variant="light" label="Actions" />}
        items={actions.map((action) => ({
          label: action.label,
          icon: action.icon,
          danger: action.variant === 'danger',
          onClick: () => action.onClick?.(row),
        }))}
      />
    );
  }

  return (
    <div className={cn('d-flex gap-1 justify-content-end', className)}>
      {actions.map((action) => (
        <Tooltip content={action.label} key={action.label}>
          <IconButton
            icon={action.icon}
            size="sm"
            variant={action.variant || 'light'}
            label={action.label}
            disabled={action.disabled?.(row)}
            onClick={() => action.onClick?.(row)}
          />
        </Tooltip>
      ))}
    </div>
  );
}

TableActions.propTypes = {
  row: PropTypes.object,
  actions: PropTypes.arrayOf(PropTypes.object),
  as: PropTypes.oneOf(['buttons', 'menu']),
  className: PropTypes.string,
};
