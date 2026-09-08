import PropTypes from 'prop-types';
import Button from './Button';
import Dropdown from '../overlays/Dropdown';
import { cn } from '../../utils/cn';

/** Main action + dropdown of secondary actions. */
export default function SplitButton({ label, icon, variant = 'primary', size = 'md', onClick, items = [], align = 'end', className }) {
  return (
    <div className={cn('btn-group', className)}>
      <Button variant={variant} size={size} icon={icon} onClick={onClick}>{label}</Button>
      <Dropdown
        align={align}
        items={items}
        trigger={
          <button type="button" className={cn('btn', `btn-${variant}`, size !== 'md' && `btn-${size}`)} aria-label="More actions">
            <i className="bi bi-caret-down-fill" style={{ fontSize: '.7rem' }} />
          </button>
        }
      />
    </div>
  );
}

SplitButton.propTypes = {
  label: PropTypes.node,
  icon: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  items: PropTypes.array,
  align: PropTypes.oneOf(['start', 'end']),
  className: PropTypes.string,
};
