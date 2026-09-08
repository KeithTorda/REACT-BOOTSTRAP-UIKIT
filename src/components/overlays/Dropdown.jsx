import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import useClickOutside from '../../hooks/useClickOutside';

/**
 * Config-driven dropdown (no bootstrap.js).
 *
 * <Dropdown label="Actions" items={[{ label:'Edit', icon:'pencil', onClick:fn }, { divider:true }]} />
 * Pass `trigger` for a fully custom toggle, or `children` for custom menu content.
 */
export default function Dropdown({
  label,
  icon,
  trigger,
  items = [],
  align = 'start',
  variant = 'light',
  size,
  menuWidth,
  header,
  footer,
  className,
  children,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false), open);

  return (
    <div className={cn('uikit-dropdown', className)} ref={ref}>
      {trigger ? (
        <span onClick={() => setOpen((v) => !v)} className="cursor-pointer d-inline-flex">{trigger}</span>
      ) : (
        <button
          type="button"
          className={cn('btn d-inline-flex align-items-center gap-2', `btn-${variant}`, size && `btn-${size}`)}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {icon && <i className={`bi bi-${icon}`} aria-hidden="true" />}
          {label}
          <i className="bi bi-chevron-down" style={{ fontSize: '.7rem' }} aria-hidden="true" />
        </button>
      )}

      {open && (
        <div
          className={cn('uikit-dropdown__menu', `uikit-dropdown__menu--${align}`)}
          style={menuWidth ? { width: menuWidth } : undefined}
        >
          {header && <div className="uikit-dropdown__header">{header}</div>}
          {children}
          {items.map((item, index) =>
            item.divider ? (
              <hr key={`divider-${index}`} className="my-1" />
            ) : (
              <button
                key={item.key || item.label}
                type="button"
                className={cn('uikit-dropdown__item', item.danger && 'is-danger')}
                onClick={() => {
                  item.onClick?.(item);
                  setOpen(false);
                }}
              >
                {item.icon && <i className={`bi bi-${item.icon}`} aria-hidden="true" />}
                <span className="flex-grow-1">{item.label}</span>
                {item.badge}
              </button>
            )
          )}
          {footer && <div className="border-top pt-2 mt-1 text-center">{footer}</div>}
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  label: PropTypes.node,
  icon: PropTypes.string,
  trigger: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.object),
  align: PropTypes.oneOf(['start', 'end']),
  variant: PropTypes.string,
  size: PropTypes.string,
  menuWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
};
