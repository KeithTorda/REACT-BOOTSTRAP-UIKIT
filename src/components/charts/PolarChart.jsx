import PropTypes from 'prop-types';
import { PolarArea } from 'react-chartjs-2';
import { chartColors, baseOptions, withAlpha } from './chartSetup';

/** <PolarChart labels={[…]} data={[…]} /> */
export default function PolarChart({ labels = [], data = [], legend = true, options }) {
  const palette = chartColors();
  const chartData = {
    labels,
    datasets: [{ data, backgroundColor: data.map((_, i) => withAlpha(palette[i % palette.length], 0.7)), borderWidth: 0 }],
  };
  return <PolarArea data={chartData} options={{ ...baseOptions({ legend, radial: true }), ...options }} />;
}

PolarChart.propTypes = { labels: PropTypes.array, data: PropTypes.array, legend: PropTypes.bool, options: PropTypes.object };
