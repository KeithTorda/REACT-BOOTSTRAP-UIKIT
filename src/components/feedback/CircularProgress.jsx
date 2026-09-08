import PropTypes from 'prop-types';

/** Ring progress / gauge. <CircularProgress value={72} size={110} label="Uptime" /> */
export default function CircularProgress({
  value = 0, max = 100, size = 96, thickness = 8, variant = 'primary', label, showValue = true, className,
}) {
  const pct = Math.min(100, Math.max(0, (Number(value) / Number(max)) * 100));
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={className} style={{ width: size, position: 'relative' }}>
      <svg width={size} height={size} className="uikit-ring">
        <circle className="uikit-ring__track" cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={thickness} />
        <circle
          className="uikit-ring__value"
          cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={thickness}
          stroke={`var(--${variant})`}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (pct / 100) * circumference}
        />
      </svg>
      <div className="position-absolute top-50 start-50 translate-middle text-center" style={{ pointerEvents: 'none' }}>
        {showValue && <div className="fw-semibold" style={{ fontSize: size / 5 }}>{Math.round(pct)}%</div>}
        {label && <div className="uikit-helper mt-0">{label}</div>}
      </div>
    </div>
  );
}

CircularProgress.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  size: PropTypes.number,
  thickness: PropTypes.number,
  variant: PropTypes.string,
  label: PropTypes.node,
  showValue: PropTypes.bool,
  className: PropTypes.string,
};
