import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * Right-click menu around any content.
 * <ContextMenu items={[{ label:'Rename', icon:'pencil', onClick: fn }]}><Row/></ContextMenu>
 */
export default function ContextMenu({ items = [], disabled = false, className, children }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!position) return undefined;
    const close = () => setPosition(null);
    document.addEventListener('click', close);
    document.addEventListener('scroll', close, true);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('scroll', close, true);
    };
  }, [position]);

  return (
    <>
      <div
        className={className}
        onContextMenu={(event) => {
          if (disabled) return;
          event.preventDefault();
          setPosition({ x: event.clientX, y: event.clientY });
        }}
      >
        {children}
      </div>

      {position &&
        createPortal(
          <div
            className="uikit-dropdown__menu"
            style={{ position: 'fixed', top: position.y, left: position.x, minWidth: 190 }}
          >
            {items.map((item, index) =>
              item.divider ? (
                <hr key={`divider-${index}`} className="my-1" />
              ) : (
                <button
                  key={item.label}
                  type="button"
                  className={cn('uikit-dropdown__item', item.danger && 'is-danger')}
                  onClick={() => { item.onClick?.(); setPosition(null); }}
                >
                  {item.icon && <i className={`bi bi-${item.icon}`} />}
                  <span className="flex-grow-1">{item.label}</span>
                  {item.shortcut && <kbd className="uikit-kbd">{item.shortcut}</kbd>}
                </button>
              )
            )}
          </div>,
          document.body
        )}
    </>
  );
}

ContextMenu.propTypes = {
  items: PropTypes.array, disabled: PropTypes.bool, className: PropTypes.string, children: PropTypes.node,
};
