import PropTypes from 'prop-types';
import { Line, Bar } from 'react-chartjs-2';
import { token, withAlpha } from './chartSetup';

/** Tiny inline chart for stat cards. <Sparkline data={[3,5,4,8]} variant="bar" /> */
export default function Sparkline({ data = [], color, variant = 'line', height = 42, area = true }) {
  const stroke = color || token('--primary');
  const Component = variant === 'bar' ? Bar : Line;
  const chartData = {
    labels: data.map((_, index) => index),
    datasets: [{
      data,
      borderColor: stroke,
      backgroundColor: variant === 'bar' ? stroke : area ? withAlpha(stroke, 0.18) : 'transparent',
      fill: variant !== 'bar' && area,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 0,
      borderRadius: variant === 'bar' ? 3 : undefined,
    }],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
    elements: { line: { borderJoinStyle: 'round' } },
  };
  return <div style={{ height }}><Component data={chartData} options={options} /></div>;
}

Sparkline.propTypes = {
  data: PropTypes.array, color: PropTypes.string,
  variant: PropTypes.oneOf(['line', 'bar']), height: PropTypes.number, area: PropTypes.bool,
};
