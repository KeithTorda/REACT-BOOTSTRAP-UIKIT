/**
 * admin-ui-kit — reusable React + Bootstrap 5 admin component library.
 *
 *   import 'admin-ui-kit/styles.css';   // includes Bootstrap + Bootstrap Icons
 *   import { ThemeProvider, AdminLayout, DataTable, Button } from 'admin-ui-kit';
 */
// Bootstrap + icons are bundled into admin-ui-kit/styles.css so consumers import ONE stylesheet.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/tokens.css';
import './assets/css/theme.css';
import './assets/css/variants.css';
import './assets/css/components.css';

export * from './components';
export * from './layouts';
export * from './hooks';
export * from './utils';
export * from './theme';
export { default as navigationData } from './data/navigationData';
export * from './data/sampleTableData';
export * from './data/sampleChartData';
