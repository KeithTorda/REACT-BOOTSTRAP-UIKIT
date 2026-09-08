import PropTypes from 'prop-types';
import { Scatter, Bubble } from 'react-chartjs-2';
import { chartColors, baseOptions, withAlpha } from './chartSetup';

/**
 * <ScatterChart datasets={[{ label:'A', data:[{x:1,y:2}] }]} />
 * Set `bubble` and give points an `r` to render a bubble chart.
 */
export default function ScatterChart({ datasets = [], bubble = false, legend = true, options }) {
  const palette = chartColors();
  const Component = bubble ? Bubble : Scatter;
  const data = {
    datasets: datasets.map((dataset, index) => {
      const color = dataset.color || palette[index % palette.length];
      return { backgroundColor: withAlpha(color, 0.6), borderColor: color, ...dataset };
    }),
  };
  return <Component data={data} options={{ ...baseOptions({ legend }), ...options }} />;
}

ScatterChart.propTypes = { datasets: PropTypes.array, bubble: PropTypes.bool, legend: PropTypes.bool, options: PropTypes.object };
