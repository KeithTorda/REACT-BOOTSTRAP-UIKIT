import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { chartColors, baseOptions } from './chartSetup';

/** <DoughnutChart labels={[…]} data={[…]} centerLabel="Total" centerValue="1,248" /> */
export default function DoughnutChart({
  labels = [], data = [], colors, cutout = '68%', legend = true, legendPosition = 'bottom',
  centerLabel, centerValue, options,
}) {
  const palette = chartColors();
  const chartData = {
    labels,
    datasets: [{
      data,
      backgroundColor: colors || palette.slice(0, data.length),
      borderColor: 'var(--surface)',
      borderWidth: 2,
    }],
  };

  const chart = (
    <Doughnut data={chartData} options={{ ...baseOptions({ legend, legendPosition, grid: false }), cutout, ...options }} />
  );

  if (!centerValue && !centerLabel) return chart;

  return (
    <div className="position-relative h-100">
      {chart}
      <div
        className="position-absolute top-50 start-50 translate-middle text-center"
        style={{ pointerEvents: 'none', marginTop: legend && legendPosition === 'bottom' ? -14 : 0 }}
      >
        <div className="fw-semibold" style={{ fontSize: '1.25rem' }}>{centerValue}</div>
        {centerLabel && <div className="uikit-helper mt-0">{centerLabel}</div>}
      </div>
    </div>
  );
}

DoughnutChart.propTypes = {
  labels: PropTypes.array,
  data: PropTypes.array,
  colors: PropTypes.array,
  cutout: PropTypes.string,
  legend: PropTypes.bool,
  legendPosition: PropTypes.string,
  centerLabel: PropTypes.node,
  centerValue: PropTypes.node,
  options: PropTypes.object,
};
