import PropTypes from 'prop-types';
import IconButton from '../buttons/IconButton';
import { useTheme } from '../../theme/ThemeProvider';

/** One-click light/dark toggle for the navbar. */
export default function ThemeToggle({ size = 'md', variant = 'light' }) {
  const { isDark, toggleMode } = useTheme();
  return (
    <IconButton
      icon={isDark ? 'sun' : 'moon-stars'}
      size={size}
      variant={variant}
      label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleMode}
    />
  );
}

ThemeToggle.propTypes = { size: PropTypes.string, variant: PropTypes.string };
