import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

/** Chrome-less layout — error pages, print views, embedded screens. */
export default function BlankLayout({ centered = false, children }) {
  return (
    <div className={centered ? 'd-flex align-items-center justify-content-center min-vh-100 p-3' : 'p-3'}>
      {children || <Outlet />}
    </div>
  );
}

BlankLayout.propTypes = { centered: PropTypes.bool, children: PropTypes.node };
