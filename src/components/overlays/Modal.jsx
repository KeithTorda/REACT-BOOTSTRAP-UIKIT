import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * Bootstrap-styled modal driven entirely by React state (no bootstrap.js).
 *
 * <Modal open={open} onClose={close} title="Edit" footer={<Button>Save</Button>}>…</Modal>
 */
export default function Modal({
  open,
  onClose,
  title,
  size = 'md',
  footer,
  closeOnBackdrop = true,
  scrollable = false,
  children,
  className,
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

  return createPortal(
    <div className="uikit-modal" role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : 'Dialog'}>
      <div className="uikit-backdrop" onClick={closeOnBackdrop ? onClose : undefined} />
      <div className={cn('uikit-modal__dialog', size !== 'md' && `uikit-modal__dialog--${size}`, className)}>
        <div className="uikit-modal__content">
          {(title || onClose) && (
            <div className="uikit-card__header">
              <h5 className="uikit-card__title">{title}</h5>
              {onClose && <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />}
            </div>
          )}
          <div className="uikit-card__body" style={scrollable ? { maxHeight: '60vh', overflowY: 'auto' } : undefined}>
            {children}
          </div>
          {footer && <div className="uikit-card__footer d-flex justify-content-end gap-2">{footer}</div>}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'fullscreen']),
  footer: PropTypes.node,
  closeOnBackdrop: PropTypes.bool,
  scrollable: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};
