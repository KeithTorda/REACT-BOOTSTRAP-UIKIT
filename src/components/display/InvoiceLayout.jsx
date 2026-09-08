import PropTypes from 'prop-types';
import Card from '../cards/Card';
import { formatCurrency } from '../../utils/format';

/**
 * Generic document/invoice layout — issuer, recipient, line items, totals.
 * Nothing domain-specific: feed it any {description, quantity, price} rows.
 */
export default function InvoiceLayout({
  title = 'Invoice',
  reference,
  issuedOn,
  dueOn,
  from = {},
  to = {},
  items = [],
  currency = 'USD',
  taxRate = 0,
  notes,
  actions,
  className,
}) {
  const subtotal = items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0), 0);
  const tax = subtotal * (Number(taxRate) / 100);
  const total = subtotal + tax;

  const party = (party_, label) => (
    <div>
      <div className="uikit-helper mt-0 text-uppercase">{label}</div>
      <div className="fw-semibold">{party_.name}</div>
      {party_.lines?.map((line) => <div className="small text-secondary-soft" key={line}>{line}</div>)}
    </div>
  );

  return (
    <Card className={className} actions={actions} title={null}>
      <div className="d-flex flex-wrap justify-content-between gap-3 mb-4">
        <div>
          <h4 className="mb-1">{title}</h4>
          {reference && <div className="text-secondary-soft small">Ref. {reference}</div>}
        </div>
        <div className="text-end small">
          {issuedOn && <div><span className="text-secondary-soft">Issued:</span> {issuedOn}</div>}
          {dueOn && <div><span className="text-secondary-soft">Due:</span> {dueOn}</div>}
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-sm-6">{party(from, 'From')}</div>
        <div className="col-sm-6 text-sm-end">{party(to, 'Bill to')}</div>
      </div>

      <div className="table-responsive">
        <table className="table uikit-table">
          <thead>
            <tr>
              <th>Description</th>
              <th className="text-end" style={{ width: 90 }}>Qty</th>
              <th className="text-end" style={{ width: 130 }}>Price</th>
              <th className="text-end" style={{ width: 140 }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id || index}>
                <td>{item.description}</td>
                <td className="text-end">{item.quantity}</td>
                <td className="text-end">{formatCurrency(item.price, currency)}</td>
                <td className="text-end fw-semibold">{formatCurrency(Number(item.quantity) * Number(item.price), currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <div style={{ minWidth: 260 }}>
          <div className="d-flex justify-content-between py-1 small">
            <span className="text-secondary-soft">Subtotal</span><span>{formatCurrency(subtotal, currency)}</span>
          </div>
          {taxRate > 0 && (
            <div className="d-flex justify-content-between py-1 small">
              <span className="text-secondary-soft">Tax ({taxRate}%)</span><span>{formatCurrency(tax, currency)}</span>
            </div>
          )}
          <div className="d-flex justify-content-between py-2 border-top fw-semibold">
            <span>Total</span><span>{formatCurrency(total, currency)}</span>
          </div>
        </div>
      </div>

      {notes && <div className="border-top pt-3 mt-3 small text-secondary-soft">{notes}</div>}
    </Card>
  );
}

InvoiceLayout.propTypes = {
  title: PropTypes.string,
  reference: PropTypes.string,
  issuedOn: PropTypes.string,
  dueOn: PropTypes.string,
  from: PropTypes.object,
  to: PropTypes.object,
  items: PropTypes.array,
  currency: PropTypes.string,
  taxRate: PropTypes.number,
  notes: PropTypes.node,
  actions: PropTypes.node,
  className: PropTypes.string,
};
