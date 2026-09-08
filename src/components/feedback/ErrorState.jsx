import PropTypes from 'prop-types';
import EmptyState from './EmptyState';

/** Error variant of EmptyState — same API plus a retry handler. */
export default function ErrorState({
  code,
  title = 'Something went wrong',
  description = 'The request could not be completed. Please try again.',
  onRetry,
  ...rest
}) {
  return (
    <EmptyState
      icon="exclamation-octagon"
      title={code ? `${code} — ${title}` : title}
      description={description}
      action={onRetry ? { label: 'Try again', icon: 'arrow-clockwise', onClick: onRetry } : undefined}
      {...rest}
    />
  );
}

ErrorState.propTypes = {
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.node,
  description: PropTypes.node,
  onRetry: PropTypes.func,
};
