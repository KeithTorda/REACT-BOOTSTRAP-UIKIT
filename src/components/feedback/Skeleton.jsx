import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * Shimmer placeholder.
 * <Skeleton lines={3} /> · <Skeleton variant="circle" width={48} height={48} />
 */
export default function Skeleton({ variant = 'text', width, height, lines = 1, className }) {
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('d-flex flex-column gap-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="uikit-skeleton"
            style={{ height: height || 12, width: index === lines - 1 ? '60%' : width || '100%' }}
          />
        ))}
      </div>
    );
  }

  const style = {
    width: width || (variant === 'circle' ? 44 : '100%'),
    height: height || (variant === 'circle' ? 44 : variant === 'block' ? 96 : 12),
    borderRadius: variant === 'circle' ? '50%' : undefined,
  };

  return <div className={cn('uikit-skeleton', className)} style={style} />;
}

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'circle', 'block']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lines: PropTypes.number,
  className: PropTypes.string,
};
