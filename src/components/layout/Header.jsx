import PropTypes from 'prop-types';
import Navbar from './Navbar';

/**
 * Alias/composition point for the app header. Keeping it separate from Navbar
 * lets a project swap the whole header without touching the layout.
 */
export default function Header(props) {
  return <Navbar {...props} />;
}

Header.propTypes = Navbar.propTypes;
