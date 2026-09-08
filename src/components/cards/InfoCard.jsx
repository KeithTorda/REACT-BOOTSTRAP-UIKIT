import PropTypes from 'prop-types';
import Card from './Card';
import DetailList from '../display/DetailList';

/** Card that renders a label/value list. <InfoCard title="Summary" items={[{label,value}]} /> */
export default function InfoCard({ title, subtitle, icon, items = [], actions, footer, className, children }) {
  return (
    <Card title={title} subtitle={subtitle} icon={icon} actions={actions} footer={footer} className={className}>
      {items.length > 0 && <DetailList items={items} />}
      {children}
    </Card>
  );
}

InfoCard.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  icon: PropTypes.string,
  items: PropTypes.array,
  actions: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
};
