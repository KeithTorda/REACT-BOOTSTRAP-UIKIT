import PropTypes from 'prop-types';
import Card from './Card';
import Progress from '../feedback/Progress';
import CircularProgress from '../feedback/CircularProgress';
import { cn } from '../../utils/cn';

/**
 * KPI tile with 8 layouts.
 * layout: icon-left · icon-right · icon-top · big · gradient · progress · ring · spark · split
 *
 * <StatsCard layout="progress" label="Storage" value="68 GB" progress={68} icon="hdd" />
 */
export default function StatsCard({
  label, value, icon, variant = 'primary', layout = 'icon-left',
  trend, progress, progressLabel, spark, secondary, footer, onClick, className, children,
}) {
  const directionUp = trend?.direction !== 'down';
  const gradient = layout === 'gradient';

  const iconEl = icon && (
    <span
      className="uikit-stats__icon"
      style={{ background: `var(--${variant}-soft, var(--surface-muted))`, color: `var(--${variant})` }}
    >
      <i className={`bi bi-${icon}`} aria-hidden="true" />
    </span>
  );

  const body = (
    <div className="flex-grow-1">
      <p className="uikit-stats__label">{label}</p>
      <h3 className="uikit-stats__value">{value}</h3>
      {trend && (
        <div className="d-flex align-items-center gap-1 mt-1" style={{ fontSize: '.75rem' }}>
          <i
            className={`bi bi-arrow-${directionUp ? 'up' : 'down'}-right`}
            style={{ color: gradient ? '#fff' : directionUp ? 'var(--success)' : 'var(--danger)' }}
            aria-hidden="true"
          />
          <span style={{ color: gradient ? '#fff' : directionUp ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
            {trend.value}
          </span>
          {trend.label && <span className={gradient ? 'text-white-50' : 'text-secondary-soft'}>{trend.label}</span>}
        </div>
      )}
    </div>
  );

  return (
    <Card
      hoverable={Boolean(onClick)}
      onClick={onClick}
      footer={footer}
      className={cn(
        layout === 'icon-top' && 'uikit-stats--icon-top',
        layout === 'big' && 'uikit-stats--big',
        gradient && 'uikit-stats--gradient',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {layout === 'split' ? (
        <div className="uikit-stats__split">
          <div>{body}</div>
          <div className="uikit-stats__split-divider" />
          <div className="text-center">
            <p className="uikit-stats__label">{secondary?.label}</p>
            <h3 className="uikit-stats__value">{secondary?.value}</h3>
          </div>
        </div>
      ) : layout === 'ring' ? (
        <div className="d-flex align-items-center gap-3">
          <CircularProgress value={progress ?? 0} variant={variant} size={72} thickness={7} />
          {body}
        </div>
      ) : layout === 'icon-right' ? (
        <div className="d-flex align-items-center gap-3">
          {body}
          {iconEl}
        </div>
      ) : layout === 'icon-top' ? (
        <div>
          {iconEl}
          {body}
        </div>
      ) : (
        <div className="d-flex align-items-center gap-3">
          {iconEl}
          {body}
        </div>
      )}

      {layout === 'progress' && (
        <Progress className="mt-3" value={progress ?? 0} variant={variant} label={progressLabel} showLabel size="sm" />
      )}
      {layout === 'spark' && spark && <div className="uikit-stats__spark">{spark}</div>}
      {children}
    </Card>
  );
}

StatsCard.LAYOUTS = ['icon-left', 'icon-right', 'icon-top', 'big', 'gradient', 'progress', 'ring', 'spark', 'split'];
StatsCard.propTypes = {
  label: PropTypes.node,
  value: PropTypes.node,
  icon: PropTypes.string,
  variant: PropTypes.string,
  layout: PropTypes.oneOf(StatsCard.LAYOUTS),
  trend: PropTypes.shape({ value: PropTypes.node, direction: PropTypes.oneOf(['up', 'down']), label: PropTypes.node }),
  progress: PropTypes.number,
  progressLabel: PropTypes.node,
  spark: PropTypes.node,
  secondary: PropTypes.object,
  footer: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};
