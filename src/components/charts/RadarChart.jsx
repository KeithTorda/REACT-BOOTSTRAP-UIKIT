import PropTypes from 'prop-types';
import { Radar } from 'react-chartjs-2';
import { chartColors, baseOptions, withAlpha } from './chartSetup';

/** <RadarChart labels={['Speed','Cost']} datasets={[{ label:'A', data:[8,6] }]} /> */
export default function RadarChart({ labels = [], datasets = [], legend = true, options }) {
  const palette = chartColors();
  const data = {
    labels,
    datasets: datasets.map((dataset, index) => {
      const color = dataset.color || palette[index % palette.length];
      return {
        borderColor: color,
        backgroundColor: withAlpha(color, 0.18),
        pointBackgroundColor: color,
        borderWidth: 2,
        ...dataset,
      };
    }),
  };
  return <Radar data={data} options={{ ...baseOptions({ legend, radial: true }), ...options }} />;
}

RadarChart.propTypes = { labels: PropTypes.array, datasets: PropTypes.array, legend: PropTypes.bool, options: PropTypes.object };
