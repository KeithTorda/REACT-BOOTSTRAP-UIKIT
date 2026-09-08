import PropTypes from 'prop-types';
import Dropdown from '../overlays/Dropdown';
import IconButton from '../buttons/IconButton';
import { cn } from '../../utils/cn';

const ICONS = {
  folder: 'folder-fill', pdf: 'file-earmark-pdf', image: 'file-earmark-image',
  doc: 'file-earmark-word', sheet: 'file-earmark-spreadsheet', zip: 'file-earmark-zip',
  video: 'file-earmark-play', code: 'file-earmark-code', file: 'file-earmark',
};
const COLORS = {
  folder: 'warning', pdf: 'danger', image: 'info', doc: 'primary',
  sheet: 'success', zip: 'secondary', video: 'secondary', code: 'info', file: 'secondary',
};

/**
 * Files & folders in grid or list view.
 * items: [{ id, name, type, size, modified }]
 */
export default function FileManager({ items = [], view = 'grid', onOpen, actions = [], className }) {
  const menu = (item) => actions.map((action) => ({ ...action, onClick: () => action.onClick?.(item) }));

  if (view === 'list') {
    return (
      <div className={cn('uikit-list', className)}>
        {items.map((item) => (
          <div key={item.id || item.name} className="uikit-list__item is-hoverable cursor-pointer" onClick={() => onOpen?.(item)}>
            <i className={`bi bi-${ICONS[item.type] || ICONS.file} fs-5`} style={{ color: `var(--${COLORS[item.type] || 'secondary'})` }} />
            <span className="flex-grow-1 text-truncate" style={{ fontSize: '.8125rem' }}>{item.name}</span>
            <span className="uikit-helper mt-0 text-nowrap">{item.size}</span>
            <span className="uikit-helper mt-0 text-nowrap d-none d-md-block">{item.modified}</span>
            {actions.length > 0 && (
              <span onClick={(event) => event.stopPropagation()}>
                <Dropdown align="end" items={menu(item)} trigger={<IconButton icon="three-dots-vertical" size="sm" variant="light" label="Actions" />} />
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('uikit-file-grid', className)}>
      {items.map((item) => (
        <div key={item.id || item.name} className="uikit-file-tile" onDoubleClick={() => onOpen?.(item)}>
          {actions.length > 0 && (
            <span className="uikit-file-tile__menu" onClick={(event) => event.stopPropagation()}>
              <Dropdown align="end" items={menu(item)} trigger={<IconButton icon="three-dots-vertical" size="sm" variant="light" label="Actions" />} />
            </span>
          )}
          <i className={`bi bi-${ICONS[item.type] || ICONS.file}`} style={{ fontSize: 34, color: `var(--${COLORS[item.type] || 'secondary'})` }} />
          <div className="fw-semibold text-truncate w-100 mt-2" style={{ fontSize: '.8125rem' }}>{item.name}</div>
          <div className="uikit-helper mt-0">{item.size || item.modified}</div>
        </div>
      ))}
    </div>
  );
}

FileManager.propTypes = {
  items: PropTypes.array, view: PropTypes.oneOf(['grid', 'list']),
  onOpen: PropTypes.func, actions: PropTypes.array, className: PropTypes.string,
};
