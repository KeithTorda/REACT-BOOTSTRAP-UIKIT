import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { COLOR_THEMES, DEFAULT_SETTINGS, RADII, hexToRgb } from './themes';

const STORAGE_KEY = 'admin-ui-kit:settings';
const ThemeContext = createContext(null);

function read() {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * Wrap the app once. Every component reads tokens, so switching a setting
 * re-skins the whole kit without touching a single component.
 *
 * <ThemeProvider defaultSettings={{ mode: 'dark', color: 'blue' }}>…</ThemeProvider>
 */
/** Write the settings onto <html> as data-attributes + CSS variables. */
function applySettings(settings, resolvedMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const palette = COLOR_THEMES[settings.color] || COLOR_THEMES.green;

  root.dataset.theme = resolvedMode;
  root.setAttribute('data-bs-theme', resolvedMode);
  root.dataset.density = settings.density;
  root.dataset.sidebar = settings.sidebarStyle;
  root.dataset.navbar = settings.navbarStyle;
  root.dataset.layout = settings.layout;
  root.dataset.width = settings.contentWidth;
  root.dir = settings.rtl ? 'rtl' : 'ltr';

  root.style.setProperty('--primary', palette.primary);
  root.style.setProperty('--primary-dark', palette.primaryDark);
  root.style.setProperty('--primary-rgb', hexToRgb(palette.primary));
  root.style.setProperty('--on-primary', palette.onPrimary);
  root.style.setProperty('--secondary', palette.secondary);
  root.style.setProperty('--secondary-rgb', hexToRgb(palette.secondary));
  root.style.setProperty('--border-radius', RADII[settings.radius] || RADII.default);
}

export default function ThemeProvider({ defaultSettings, persist = true, children }) {
  const [settings, setSettings] = useState(() =>
    persist ? { ...read(), ...defaultSettings } : { ...DEFAULT_SETTINGS, ...defaultSettings }
  );

  const set = useCallback((patch) => setSettings((prev) => ({ ...prev, ...patch })), []);
  const reset = useCallback(() => setSettings({ ...DEFAULT_SETTINGS, ...defaultSettings }), [defaultSettings]);

  const resolvedMode = useMemo(() => {
    if (settings.mode !== 'system') return settings.mode;
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, [settings.mode]);

  useEffect(() => {
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch { /* ignore */ }
    }
  }, [settings, persist]);

  // Applied during render (not in an effect) so children that read CSS tokens —
  // charts, for example — see the right values on their very first paint.
  applySettings(settings, resolvedMode);

  useEffect(() => {
    if (settings.mode !== 'system' || typeof window === 'undefined') return undefined;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => set({ mode: 'system' });
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [settings.mode, set]);

  const value = useMemo(
    () => ({
      settings, set, reset, resolvedMode,
      isDark: resolvedMode === 'dark',
      toggleMode: () => set({ mode: resolvedMode === 'dark' ? 'light' : 'dark' }),
      palette: COLOR_THEMES[settings.color] || COLOR_THEMES.green,
    }),
    [settings, set, reset, resolvedMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Read/'write the current theme settings from anywhere in the tree. */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      settings: DEFAULT_SETTINGS,
      set: () => {},
      reset: () => {},
      resolvedMode: 'light',
      isDark: false,
      toggleMode: () => {},
      palette: COLOR_THEMES.green,
    };
  }
  return context;
}

ThemeProvider.propTypes = {
  defaultSettings: PropTypes.object,
  persist: PropTypes.bool,
  children: PropTypes.node,
};
