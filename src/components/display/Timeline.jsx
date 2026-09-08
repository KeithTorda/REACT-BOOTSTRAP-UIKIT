import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * <Timeline items={[{ title, description, time, variant, icon }]} />
 */
export default function Timeline({ items = [], variant = 'vertical', className }) {
  return (
    <ul className={cn('uikit-timeline', variant !== 'vertical' && `uikit-timeline--${variant}`, className)}>
      {items.map((item, index) => (
        <li className="uikit-timeline__item" key={item.id || index}>
          <span
            className="uikit-timeline__dot"
            style={{ background: `var(--${item.variant || 'primary'})`, color: `var(--${item.variant || 'primary'}-soft, var(--surface-muted))` }}
          />
          <div className="d-flex justify-content-between gap-2 align-items-start">
            <div>
              <div className="fw-semibold" style={{ fontSize: '.8125rem' }}>
                {item.icon && <i className={`bi bi-${item.icon} me-2`} aria-hidden="true" />}
                {item.title}
              </div>
              {item.description && <div className="text-secondary-soft small">{item.description}</div>}
            </div>
            {item.time && <span className="uikit-timeline__time text-nowrap">{item.time}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}

Timeline.VARIANTS = ['vertical', 'horizontal', 'alternating'];
Timeline.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.oneOf(['vertical', 'horizontal', 'alternating']),
  className: PropTypes.string,
};
