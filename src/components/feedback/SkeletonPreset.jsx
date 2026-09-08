import PropTypes from 'prop-types';
import Skeleton from './Skeleton';
import Card from '../cards/Card';

/**
 * Ready-made loading shapes so you don't hand-assemble skeletons.
 * <SkeletonPreset preset="table" rows={5} />
 */
export default function SkeletonPreset({ preset = 'card', rows = 4, className }) {
  if (preset === 'table') {
    return (
      <div className={className}>
        <div className="d-flex gap-3 py-2 border-bottom">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height={10} />)}
        </div>
        {Array.from({ length: rows }).map((_, row) => (
          <div className="d-flex gap-3 py-3 border-bottom" key={row}>
            {Array.from({ length: 4 }).map((_, cell) => <Skeleton key={cell} height={12} />)}
          </div>
        ))}
      </div>
    );
  }

  if (preset === 'list') {
    return (
      <div className={className}>
        {Array.from({ length: rows }).map((_, index) => (
          <div className="d-flex gap-3 align-items-center py-3 border-bottom" key={index}>
            <Skeleton variant="circle" width={38} height={38} />
            <div className="flex-grow-1"><Skeleton lines={2} /></div>
            <Skeleton width={64} height={12} />
          </div>
        ))}
      </div>
    );
  }

  if (preset === 'profile') {
    return (
      <Card className={className}>
        <div className="text-center">
          <Skeleton variant="circle" width={80} height={80} className="mx-auto mb-3" />
          <Skeleton width="50%" height={14} className="mx-auto mb-2" />
          <Skeleton width="35%" height={10} className="mx-auto mb-3" />
          <Skeleton lines={3} />
        </div>
      </Card>
    );
  }

  if (preset === 'chart') {
    return (
      <Card className={className}>
        <Skeleton width="40%" height={14} className="mb-3" />
        <Skeleton variant="block" height={200} />
      </Card>
    );
  }

  if (preset === 'stats') {
    return (
      <div className={`row g-3 ${className || ''}`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="col-6 col-xl-3" key={index}>
            <Card className="mb-0">
              <div className="d-flex gap-3 align-items-center">
                <Skeleton variant="circle" width={56} height={56} />
                <div className="flex-grow-1"><Skeleton lines={2} /></div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card className={className}>
      <Skeleton width="45%" height={14} className="mb-3" />
      <Skeleton lines={rows} />
    </Card>
  );
}

SkeletonPreset.PRESETS = ['card', 'table', 'list', 'profile', 'chart', 'stats'];
SkeletonPreset.propTypes = {
  preset: PropTypes.oneOf(['card', 'table', 'list', 'profile', 'chart', 'stats']),
  rows: PropTypes.number,
  className: PropTypes.string,
};
