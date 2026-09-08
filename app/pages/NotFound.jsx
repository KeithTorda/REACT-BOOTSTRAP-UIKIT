import { Link } from 'react-router-dom';
import { ErrorState } from '@kit/components/feedback';
import { Card } from '@kit/components/cards';

export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 p-3">
      <Card className="mb-0" style={{ maxWidth: 460 }}>
        <ErrorState code={404} title="Page not found" description="The page you are looking for does not exist." />
        <div className="text-center">
          <Link to="/" className="btn btn-primary">Back to overview</Link>
        </div>
      </Card>
    </div>
  );
}
