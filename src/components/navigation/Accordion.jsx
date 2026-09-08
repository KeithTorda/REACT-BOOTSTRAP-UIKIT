import { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** <Accordion items={[{ key, title, icon, content }]} allowMultiple /> */
export default function Accordion({ items = [], defaultOpenKeys = [], allowMultiple = false, className }) {
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys);

  const toggle = (key) =>
    setOpenKeys((keys) => {
      if (keys.includes(key)) return keys.filter((k) => k !== key);
      return allowMultiple ? [...keys, key] : [key];
    });

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = openKeys.includes(item.key);
        return (
          <div className="uikit-accordion__item" key={item.key}>
            <button
              type="button"
              className={cn('uikit-accordion__header', isOpen && 'is-open')}
              onClick={() => toggle(item.key)}
              aria-expanded={isOpen}
            >
              {item.icon && <i className={`bi bi-${item.icon}`} aria-hidden="true" />}
              <span className="flex-grow-1">{item.title}</span>
              <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`} style={{ fontSize: '.75rem' }} aria-hidden="true" />
            </button>
            {isOpen && <div className="uikit-accordion__body">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

Accordion.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
  allowMultiple: PropTypes.bool,
  className: PropTypes.string,
};
