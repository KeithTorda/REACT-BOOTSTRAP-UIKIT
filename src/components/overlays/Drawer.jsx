import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const AXIS = { start: 'width', end: 'width', top: 'height', bottom: 'height' };

/**
 * Offcanvas panel. <Drawer open placement="end" title="Filters" onClose={fn}>…</Drawer>
 * placement: 'start' | 'end' | 'top' | 'bottom'
 */
export default function Drawer({
  open, onClose, placement = 'end', title, size = 320, footer,
  backdrop = true, closeOnBackdrop = true, className, children,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  const dimension = AXIS[placement] || 'width';

  return createPortal(
    <>
      {backdrop && <div className="uikit-backdrop" onClick={closeOnBackdrop ? onClose : undefined} />}
      <aside
        className={cn('uikit-drawer', `uikit-drawer--${placement}`, className)}
        style={{ [dimension]: typeof size === 'number' ? `${size}px` : size }}
        role="dialog"
        aria-modal="true"
      >
        {(title || onClose) && (
          <div className="uikit-card__header">
            <h5 className="uikit-card__title">{title}</h5>
            {onClose && <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />}
          </div>
        )}
        <div className="uikit-drawer__body">{children}</div>
        {footer && <div className="uikit-card__footer d-flex gap-2 justify-content-end">{footer}</div>}
      </aside>
    </>,
    document.body
  );
}

Drawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  placement: PropTypes.oneOf(['start', 'end', 'top', 'bottom']),
  title: PropTypes.node,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  footer: PropTypes.node,
  backdrop: PropTypes.bool,
  closeOnBackdrop: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
