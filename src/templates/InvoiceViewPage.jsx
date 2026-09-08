import { ContentWrapper } from '../components/layout';
import { InvoiceLayout, DetailList, Timeline } from '../components/display';
import { Card } from '../components/cards';
import { Button } from '../components/buttons';
import { Badge } from '../components/feedback';
import { sampleInvoiceItems } from '../data/sampleTableData';

/** TEMPLATE — Single invoice / printable document view. */
export default function InvoiceViewPage() {
  return (
    <ContentWrapper
      title="Invoice INV-000123"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Invoices', path: '#' }, { label: 'INV-000123' }]}
      actions={<><Button tone="soft" icon="printer" onClick={() => window.print()}>Print</Button><Button tone="soft" icon="download">PDF</Button><Button icon="send">Send</Button></>}
    >
      <div className="row g-3">
        <div className="col-xl-8">
          <InvoiceLayout
            title="Invoice"
            reference="INV-000123"
            issuedOn="Sep 01, 2026"
            dueOn="Sep 15, 2026"
            from={{ name: 'Your Organization', lines: ['123 Example Street', 'Manila, Philippines', 'billing@example.com'] }}
            to={{ name: 'Jane Smith', lines: ['456 Sample Avenue', 'jane.smith@example.com'] }}
            items={sampleInvoiceItems}
            currency="PHP"
            taxRate={12}
            notes="Payment is due within 14 days. Bank details are on the last page."
          />
        </div>

        <div className="col-xl-4">
          <Card title="Status" icon="info-circle">
            <DetailList
              items={[
                { label: 'Status', value: <Badge variant="warning" dot>Unpaid</Badge> },
                { label: 'Issued', value: 'Sep 01, 2026' },
                { label: 'Due', value: 'Sep 15, 2026' },
                { label: 'Terms', value: 'Net 14' },
                { label: 'Currency', value: 'PHP' },
              ]}
            />
          </Card>
          <Card title="History" icon="clock-history">
            <Timeline
              items={[
                { title: 'Invoice created', time: 'Sep 01', variant: 'primary' },
                { title: 'Sent to client', time: 'Sep 01', variant: 'info' },
                { title: 'Reminder sent', time: 'Sep 08', variant: 'warning' },
              ]}
            />
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
}
