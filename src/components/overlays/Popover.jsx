import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import useClickOutside from '../../hooks/useClickOutside';

/** Click-triggered popover with a title and rich body. */
export default function Popover({ title, content, placement = 'top', trigger = 'click', width = 240, className, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false), open && trigger === 'click');

  const handlers =
    trigger === 'hover'
      ? { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) }
      : { onClick: () => setOpen((v) => !v) };

  return (
    <span className={cn('uikit-tooltip-wrap', className)} ref={ref} {...handlers}>
      {children}
      {open && (
        <span className={cn('uikit-popover', `uikit-tooltip--${placement}`)} style={{ width }} role="dialog">
          {title && <span className="uikit-popover__title">{title}</span>}
          <span className="uikit-popover__body">{content}</span>
        </span>
      )}
    </span>
  );
}

Popover.propTypes = {
  title: PropTypes.node, content: PropTypes.node,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  trigger: PropTypes.oneOf(['click', 'hover']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string, children: PropTypes.node,
};
