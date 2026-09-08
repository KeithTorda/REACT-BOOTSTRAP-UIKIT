import { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * Config-driven tabs. Controlled (`activeKey` + `onChange`) or uncontrolled.
 *
 * <Tabs items={[{ key:'a', label:'Profile', icon:'person', content:<div/> }]} />
 */
// variants: underline · pills · boxed · vertical · icons
export default function Tabs({ items = [], activeKey, defaultActiveKey, onChange, variant = 'underline', fill = false, className }) {
  const [internal, setInternal] = useState(defaultActiveKey || items[0]?.key);
  const current = activeKey ?? internal;
  const active = items.find((item) => item.key === current) || items[0];

  const select = (key) => {
    if (activeKey === undefined) setInternal(key);
    onChange?.(key);
  };

  return (
    <div className={cn(variant === 'vertical' && 'd-flex gap-3', className)}>
      <div
        className={cn(
          'uikit-tabs',
          variant === 'pills' && 'uikit-tabs--pills',
          variant === 'boxed' && 'uikit-tabs--boxed',
          variant === 'vertical' && 'uikit-tabs--vertical',
          variant === 'icons' && 'uikit-tabs--icons',
          fill && 'w-100'
        )}
        role="tablist"
      >
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={item.key === current}
            disabled={item.disabled}
            title={variant === 'icons' ? item.label : undefined}
            className={cn('uikit-tabs__item d-inline-flex align-items-center gap-2', fill && 'flex-fill justify-content-center', item.key === current && 'is-active')}
            onClick={() => select(item.key)}
          >
            {item.icon && <i className={`bi bi-${item.icon}`} aria-hidden="true" />}
            {variant !== 'icons' && item.label}
            {item.badge}
          </button>
        ))}
      </div>
      {active?.content && <div className={variant === 'vertical' ? 'flex-grow-1' : 'pt-3'} role="tabpanel">{active.content}</div>}
    </div>
  );
}

Tabs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['underline', 'pills', 'boxed', 'vertical', 'icons']),
  fill: PropTypes.bool,
  className: PropTypes.string,
};
