import { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** Pure-React tooltip. <Tooltip content="Delete" placement="top"><IconButton …/></Tooltip> */
export default function Tooltip({ content, placement = 'top', className, children }) {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className={cn('uikit-tooltip-wrap', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && content && (
        <span className={cn('uikit-tooltip', `uikit-tooltip--${placement}`)} role="tooltip">
          {content}
        </span>
      )}
    </span>
  );
}

Tooltip.propTypes = {
  content: PropTypes.node,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  className: PropTypes.string,
  children: PropTypes.node,
};
