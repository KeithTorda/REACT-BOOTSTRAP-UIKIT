import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { chartColors, baseOptions } from './chartSetup';

/** <BarChart labels={[…]} datasets={[{ label:'A', data:[…] }]} stacked horizontal /> */
export default function BarChart({ labels = [], datasets = [], stacked = false, horizontal = false, legend = true, options }) {
  const palette = chartColors();
  const data = {
    labels,
    datasets: datasets.map((dataset, index) => ({
      backgroundColor: dataset.color || palette[index % palette.length],
      borderRadius: 6,
      borderSkipped: false,
      barPercentage: 0.7,
      categoryPercentage: 0.7,
      ...dataset,
    })),
  };
  return (
    <Bar
      data={data}
      options={{
        ...baseOptions({ legend, stacked }),
        indexAxis: horizontal ? 'y' : 'x',
        ...options,
      }}
    />
  );
}

BarChart.propTypes = {
  labels: PropTypes.array,
  datasets: PropTypes.array,
  stacked: PropTypes.bool,
  horizontal: PropTypes.bool,
  legend: PropTypes.bool,
  options: PropTypes.object,
};
