import { useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from '../overlays/Drawer';
import Switch from '../forms/Switch';
import Button from '../buttons/Button';
import { useTheme } from '../../theme/ThemeProvider';
import { COLOR_THEMES, SIDEBAR_STYLES, NAVBAR_STYLES, LAYOUT_PRESETS, DENSITIES, RADII, MODES } from '../../theme/themes';
import { cn } from '../../utils/cn';

function OptionRow({ label, options, value, onChange }) {
  return (
    <div className="mb-3">
      <div className="form-label">{label}</div>
      <div className="uikit-option-grid">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={cn('uikit-option', value === option && 'is-active')}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

OptionRow.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

/**
 * Floating settings drawer — switches mode, colour, layout, density, radius and RTL live.
 * Drop it once inside AdminLayout (it is on by default).
 */
export default function ThemeCustomizer({ defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const { settings, set, reset } = useTheme();

  return (
    <>
      <button type="button" className="uikit-customizer-toggle" onClick={() => setOpen(true)} aria-label="Theme settings">
        <i className="bi bi-sliders" />
      </button>

      <Drawer open={open} onClose={() => setOpen(false)} placement="end" size={320} title="Theme settings"
        footer={<Button variant="light" size="sm" icon="arrow-counterclockwise" onClick={reset}>Reset</Button>}>
        <OptionRow label="Mode" options={MODES} value={settings.mode} onChange={(mode) => set({ mode })} />

        <div className="mb-3">
          <div className="form-label">Colour</div>
          <div className="row g-2">
            {Object.entries(COLOR_THEMES).map(([key, theme]) => (
              <div className="col-3" key={key}>
                <button
                  type="button"
                  title={theme.label}
                  aria-label={theme.label}
                  className={cn('uikit-swatch', settings.color === key && 'is-active')}
                  style={{ background: theme.primary }}
                  onClick={() => set({ color: key })}
                />
              </div>
            ))}
          </div>
        </div>

        <OptionRow label="Layout" options={LAYOUT_PRESETS} value={settings.layout} onChange={(layout) => set({ layout })} />
        <OptionRow label="Sidebar" options={SIDEBAR_STYLES} value={settings.sidebarStyle} onChange={(sidebarStyle) => set({ sidebarStyle })} />
        <OptionRow label="Navbar" options={NAVBAR_STYLES} value={settings.navbarStyle} onChange={(navbarStyle) => set({ navbarStyle })} />
        <OptionRow label="Density" options={DENSITIES} value={settings.density} onChange={(density) => set({ density })} />
        <OptionRow label="Radius" options={Object.keys(RADII)} value={settings.radius} onChange={(radius) => set({ radius })} />
        <OptionRow label="Content width" options={['fluid', 'boxed']} value={settings.contentWidth} onChange={(contentWidth) => set({ contentWidth })} />

        <hr />
        <Switch label="Right-to-left (RTL)" checked={settings.rtl} onChange={(event) => set({ rtl: event.target.checked })} />
      </Drawer>
    </>
  );
}

ThemeCustomizer.propTypes = { defaultOpen: PropTypes.bool };
