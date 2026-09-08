import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/** Label/value rows. <DetailList items={[{ label:'Reference', value:'INV-0042' }]} /> */
export default function DetailList({ items = [], labelWidth = '40%', className }) {
  return (
    <dl className={cn('uikit-detail-list', className)}>
      {items.map((item) => (
        <div className="uikit-detail-list__row" key={item.label}>
          <dt className="uikit-detail-list__label" style={{ flexBasis: labelWidth }}>
            {item.icon && <i className={`bi bi-${item.icon} me-2`} aria-hidden="true" />}
            {item.label}
          </dt>
          <dd className="uikit-detail-list__value mb-0">{item.value ?? '—'}</dd>
        </div>
      ))}
    </dl>
  );
}

DetailList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  labelWidth: PropTypes.string,
  className: PropTypes.string,
};
