import { useState } from 'react';
import { ContentWrapper } from '../components/layout';
import { Card } from '../components/cards';
import { CalendarWidget, Timeline, ListGroup } from '../components/display';
import { Button, ToggleGroup } from '../components/buttons';
import { Badge } from '../components/feedback';
import { Modal } from '../components/overlays';
import { TextInput, DateInput, TextArea, SelectInput } from '../components/forms';

const today = new Date();
const key = (day) => `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

const EVENTS = {
  [key(4)]: 1, [key(9)]: 2, [key(12)]: 1, [key(18)]: 3, [key(25)]: 1,
};

const AGENDA = [
  { title: 'Weekly review', description: '09:00 — Meeting room A', time: 'Today', variant: 'primary' },
  { title: 'Records deadline', description: 'Submit the monthly batch', time: 'Tomorrow', variant: 'warning' },
  { title: 'Team sync', description: '14:00 — Online', time: 'Thursday', variant: 'info' },
  { title: 'System maintenance', description: '22:00 — 2 hours downtime', time: 'Saturday', variant: 'danger' },
];

/** TEMPLATE — Schedule page: month calendar plus an agenda list. */
export default function CalendarPage() {
  const [creating, setCreating] = useState(false);

  return (
    <ContentWrapper
      title="Schedule"
      subtitle="Events, deadlines and reminders"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Schedule' }]}
      actions={<><ToggleGroup options={['Month', 'Week', 'Day']} /><Button icon="plus-lg" onClick={() => setCreating(true)}>New event</Button></>}
    >
      <div className="row g-3">
        <div className="col-lg-5 col-xl-4">
          <Card title="Calendar" icon="calendar3"><CalendarWidget events={EVENTS} /></Card>
          <Card title="Categories" icon="tags">
            <ListGroup
              items={[
                { title: 'Meetings', badge: <Badge variant="primary" tone="soft" counter>8</Badge> },
                { title: 'Deadlines', badge: <Badge variant="warning" tone="soft" counter>3</Badge> },
                { title: 'Maintenance', badge: <Badge variant="danger" tone="soft" counter>1</Badge> },
                { title: 'Personal', badge: <Badge variant="secondary" tone="soft" counter>4</Badge> },
              ]}
            />
          </Card>
        </div>
        <div className="col-lg-7 col-xl-8">
          <Card title="Agenda" icon="list-check"><Timeline items={AGENDA} /></Card>
        </div>
      </div>

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title="New event"
        footer={<><Button variant="light" onClick={() => setCreating(false)}>Cancel</Button><Button onClick={() => setCreating(false)}>Save event</Button></>}
      >
        <TextInput label="Title" required placeholder="Weekly review" />
        <div className="row">
          <div className="col-6"><DateInput label="Date" /></div>
          <div className="col-6"><DateInput label="Time" mode="time" /></div>
        </div>
        <SelectInput label="Category" options={['Meetings', 'Deadlines', 'Maintenance', 'Personal']} />
        <TextArea label="Notes" rows={3} />
      </Modal>
    </ContentWrapper>
  );
}
