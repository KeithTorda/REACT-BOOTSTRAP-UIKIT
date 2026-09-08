import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { chartColors, baseOptions } from './chartSetup';

/** <PieChart labels={['A','B']} data={[10, 20]} /> */
export default function PieChart({ labels = [], data = [], colors, legend = true, legendPosition = 'bottom', options }) {
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
  return <Pie data={chartData} options={{ ...baseOptions({ legend, legendPosition, grid: false }), ...options }} />;
}

PieChart.propTypes = {
  labels: PropTypes.array,
  data: PropTypes.array,
  colors: PropTypes.array,
  legend: PropTypes.bool,
  legendPosition: PropTypes.string,
  options: PropTypes.object,
};
