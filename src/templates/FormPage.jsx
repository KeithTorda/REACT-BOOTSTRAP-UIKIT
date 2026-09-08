import { useState } from 'react';
import { ContentWrapper } from '../components/layout';
import { Card } from '../components/cards';
import {
  TextInput, TextArea, SelectInput, DateInput, Switch, FileUpload,
  TagsInput, MultiSelect, NumberStepper, MaskedInput,
} from '../components/forms';
import { Button } from '../components/buttons';
import { Alert } from '../components/feedback';
import { roleOptions, departmentOptions } from '../data/sampleTableData';

/** TEMPLATE — Create / edit form page with a sticky action bar. */
export default function FormPage() {
  const [values, setValues] = useState({
    name: '', email: '', phone: '', role: '', departments: [], startDate: '',
    quantity: 1, tags: [], notes: '', active: true,
  });
  const [saved, setSaved] = useState(false);
  const set = (key) => (event) =>
    setValues((prev) => ({ ...prev, [key]: event?.target ? (event.target.type === 'checkbox' ? event.target.checked : event.target.value) : event }));

  return (
    <ContentWrapper
      title="Create record"
      subtitle="All fields marked with an asterisk are required"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Records', path: '#' }, { label: 'Create' }]}
      actions={<><Button variant="light">Cancel</Button><Button icon="check2" onClick={() => setSaved(true)}>Save record</Button></>}
    >
      {saved && <Alert variant="success" title="Saved" onClose={() => setSaved(false)}>The record was stored (demo only — no backend).</Alert>}

      <form onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
        <div className="row g-3">
          <div className="col-lg-8">
            <Card title="Basic details">
              <div className="row">
                <div className="col-md-6"><TextInput label="Full name" placeholder="John Doe" required value={values.name} onChange={set('name')} /></div>
                <div className="col-md-6"><TextInput label="Email" type="email" prefix="envelope" placeholder="you@example.com" required value={values.email} onChange={set('email')} /></div>
                <div className="col-md-6"><MaskedInput mask="phone" label="Phone" placeholder="(555) 000-0000" value={values.phone} onChange={set('phone')} /></div>
                <div className="col-md-6"><DateInput label="Start date" value={values.startDate} onChange={set('startDate')} /></div>
                <div className="col-12"><TextArea label="Notes" rows={4} maxLength={400} showCount value={values.notes} onChange={set('notes')} /></div>
              </div>
            </Card>

            <Card title="Attachments">
              <FileUpload label={null} multiple accept=".pdf,.png,.jpg" helperText="Up to 10 files" />
            </Card>
          </div>

          <div className="col-lg-4">
            <Card title="Classification">
              <SelectInput label="Role" options={roleOptions} required value={values.role} onChange={set('role')} />
              <MultiSelect label="Departments" options={departmentOptions} value={values.departments} onChange={(v) => set('departments')(v)} />
              <TagsInput label="Tags" value={values.tags} onChange={(v) => set('tags')(v)} helperText="Press Enter to add" />
              <NumberStepper label="Quantity" value={values.quantity} onChange={(v) => set('quantity')(v)} min={1} max={99} />
            </Card>

            <Card title="Options">
              <Switch label="Active" description="Visible to other users" checked={values.active} onChange={set('active')} />
              <Switch label="Send notification" />
              <Switch label="Pin to top" />
            </Card>
          </div>
        </div>
      </form>
    </ContentWrapper>
  );
}
