import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { chartColors, baseOptions, withAlpha } from './chartSetup';

/**
 * <LineChart labels={[…]} datasets={[{ label:'Series A', data:[…] }]} area />
 */
export default function LineChart({ labels = [], datasets = [], area = false, smooth = true, legend = true, options }) {
  const palette = chartColors();
  const data = {
    labels,
    datasets: datasets.map((dataset, index) => {
      const color = dataset.color || palette[index % palette.length];
      return {
        tension: smooth ? 0.4 : 0,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#fff',
        borderColor: color,
        backgroundColor: area ? withAlpha(color, 0.14) : color,
        fill: area,
        ...dataset,
      };
    }),
  };
  return <Line data={data} options={{ ...baseOptions({ legend }), ...options }} />;
}

LineChart.propTypes = {
  labels: PropTypes.array,
  datasets: PropTypes.array,
  area: PropTypes.bool,
  smooth: PropTypes.bool,
  legend: PropTypes.bool,
  options: PropTypes.object,
};
