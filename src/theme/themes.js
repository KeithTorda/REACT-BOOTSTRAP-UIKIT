/** Colour presets. Each one only overrides the brand tokens — everything else is shared. */
export const COLOR_THEMES = {
  green:  { label: 'Green',  primary: '#2fdf84', primaryDark: '#22c571', secondary: '#8944d7', onPrimary: '#0b3b23' },
  blue:   { label: 'Blue',   primary: '#3b82f6', primaryDark: '#2563eb', secondary: '#8944d7', onPrimary: '#ffffff' },
  violet: { label: 'Violet', primary: '#8944d7', primaryDark: '#7429c4', secondary: '#2fdf84', onPrimary: '#ffffff' },
  indigo: { label: 'Indigo', primary: '#6366f1', primaryDark: '#4f46e5', secondary: '#06b6d4', onPrimary: '#ffffff' },
  orange: { label: 'Orange', primary: '#f97316', primaryDark: '#ea580c', secondary: '#0ea5e9', onPrimary: '#ffffff' },
  rose:   { label: 'Rose',   primary: '#f43f5e', primaryDark: '#e11d48', secondary: '#8944d7', onPrimary: '#ffffff' },
  teal:   { label: 'Teal',   primary: '#14b8a6', primaryDark: '#0d9488', secondary: '#f59e0b', onPrimary: '#04312c' },
  slate:  { label: 'Slate',  primary: '#475569', primaryDark: '#334155', secondary: '#0ea5e9', onPrimary: '#ffffff' },
};

export const SIDEBAR_STYLES = ['light', 'dark', 'floating', 'gradient', 'transparent'];
export const NAVBAR_STYLES = ['light', 'dark', 'transparent'];
export const LAYOUT_PRESETS = ['sidebar', 'horizontal', 'boxed', 'rail', 'stacked'];
export const DENSITIES = ['comfortable', 'compact'];
export const RADII = { sharp: '4px', default: '10px', rounded: '16px' };
export const MODES = ['light', 'dark', 'system'];

export const DEFAULT_SETTINGS = {
  mode: 'light',
  color: 'green',
  sidebarStyle: 'light',
  navbarStyle: 'light',
  layout: 'sidebar',
  density: 'comfortable',
  radius: 'default',
  rtl: false,
  contentWidth: 'fluid',
};

/** Convert a hex to "r, g, b" so tokens can build rgba() shades. */
export function hexToRgb(hex) {
  const v = hex.replace('#', '');
  const f = v.length === 3 ? v.split('').map((c) => c + c).join('') : v;
  return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16)).join(', ');
}
