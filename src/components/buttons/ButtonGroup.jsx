import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** Wraps buttons in a Bootstrap button group / toolbar. */
export default function ButtonGroup({ size, vertical = false, ariaLabel = 'Button group', className, children }) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(vertical ? 'btn-group-vertical' : 'btn-group', size && `btn-group-${size}`, className)}
    >
      {children}
    </div>
  );
}

ButtonGroup.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg']),
  vertical: PropTypes.bool,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
