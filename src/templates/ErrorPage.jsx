import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '../components/cards';
import { Button } from '../components/buttons';

const PRESETS = {
  404: { icon: 'compass', title: 'Page not found', description: 'The page you are looking for does not exist or has been moved.' },
  403: { icon: 'shield-lock', title: 'Access denied', description: 'You do not have permission to view this page.' },
  401: { icon: 'person-lock', title: 'Not signed in', description: 'Please sign in to continue.' },
  500: { icon: 'exclamation-octagon', title: 'Something went wrong', description: 'An unexpected error occurred. Try again in a moment.' },
  maintenance: { icon: 'tools', title: 'Under maintenance', description: 'We are performing scheduled maintenance. We will be back shortly.' },
  'coming-soon': { icon: 'rocket-takeoff', title: 'Coming soon', description: 'This section is being built. Check back later.' },
};

/**
 * TEMPLATE — Error / status page.
 * <ErrorPage code={404} /> · <ErrorPage code="maintenance" />
 */
export default function ErrorPage({ code = 404, title, description, homePath = '/', onRetry }) {
  const preset = PRESETS[code] || PRESETS[404];
  const isNumeric = !Number.isNaN(Number(code));

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 p-4">
      <Card className="mb-0 text-center" style={{ maxWidth: 520 }}>
        <div
          className="d-inline-flex align-items-center justify-content-center mb-3"
          style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--primary-soft)', color: 'var(--primary-dark)', fontSize: 38 }}
        >
          <i className={`bi bi-${preset.icon}`} />
        </div>

        {isNumeric && (
          <div className="fw-bold" style={{ fontSize: '3.5rem', lineHeight: 1, background: 'var(--gradient-accent-x)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {code}
          </div>
        )}

        <h4 className="mt-2 mb-2">{title || preset.title}</h4>
        <p className="text-secondary-soft mb-4">{description || preset.description}</p>

        <div className="d-flex gap-2 justify-content-center">
          <Link to={homePath} className="btn btn-primary"><i className="bi bi-house me-2" />Back to home</Link>
          {onRetry && <Button variant="light" icon="arrow-clockwise" onClick={onRetry}>Try again</Button>}
        </div>
      </Card>
    </div>
  );
}

ErrorPage.CODES = Object.keys(PRESETS);
ErrorPage.propTypes = {
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.node, description: PropTypes.node,
  homePath: PropTypes.string, onRetry: PropTypes.func,
};
