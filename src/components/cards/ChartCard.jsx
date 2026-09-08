import PropTypes from 'prop-types';
import Card from './Card';

/**
 * Card sized for a chart, with an optional toolbar in the header.
 * <ChartCard title="Revenue" toolbar={<Dropdown …/>} height={280}><LineChart …/></ChartCard>
 */
export default function ChartCard({ title, subtitle, toolbar, height = 280, legend, footer, className, children }) {
  return (
    <Card title={title} subtitle={subtitle} actions={toolbar} footer={footer} className={className}>
      <div style={{ height }}>{children}</div>
      {legend && <div className="d-flex flex-wrap gap-3 justify-content-center mt-3 small">{legend}</div>}
    </Card>
  );
}

ChartCard.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  toolbar: PropTypes.node,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  legend: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
};
