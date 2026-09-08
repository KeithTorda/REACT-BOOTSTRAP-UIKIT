import PropTypes from 'prop-types';
import Card from '../cards/Card';

/**
 * A <form> inside a Card, with a footer action row.
 * <FormCard title="Details" onSubmit={fn} actions={<Button type="submit">Save</Button>}>…</FormCard>
 */
export default function FormCard({ title, subtitle, description, onSubmit, actions, columns = 1, className, children }) {
  return (
    <Card title={title} subtitle={subtitle} footer={actions} className={className}>
      <form onSubmit={onSubmit} noValidate>
        {description && <p className="text-secondary-soft small mb-3">{description}</p>}
        {columns > 1 ? <div className="row">{children}</div> : children}
      </form>
    </Card>
  );
}

FormCard.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  description: PropTypes.node,
  onSubmit: PropTypes.func,
  actions: PropTypes.node,
  columns: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};
