import { useState } from 'react';
import { ContentWrapper } from '../components/layout';
import { FormWizard, TextInput, SelectInput, TextArea, FileUpload, Checkbox } from '../components/forms';
import { DetailList } from '../components/display';
import { Alert } from '../components/feedback';
import { roleOptions, departmentOptions } from '../data/sampleTableData';

/** TEMPLATE — Multi-step submission flow. */
export default function WizardPage() {
  const [values, setValues] = useState({ name: '', email: '', role: '', department: '', notes: '', confirm: false });
  const [done, setDone] = useState(false);
  const set = (key) => (event) => setValues((p) => ({ ...p, [key]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));

  const steps = [
    {
      key: 'who', label: 'Applicant', icon: 'person', description: 'Who is submitting',
      validate: () => (values.name && values.email ? true : 'Name and email are required.'),
      content: (
        <div className="row">
          <div className="col-md-6"><TextInput label="Full name" required value={values.name} onChange={set('name')} /></div>
          <div className="col-md-6"><TextInput label="Email" type="email" required value={values.email} onChange={set('email')} /></div>
        </div>
      ),
    },
    {
      key: 'details', label: 'Details', icon: 'card-list', description: 'Classification',
      content: (
        <div className="row">
          <div className="col-md-6"><SelectInput label="Role" options={roleOptions} value={values.role} onChange={set('role')} /></div>
          <div className="col-md-6"><SelectInput label="Department" options={departmentOptions} value={values.department} onChange={set('department')} /></div>
          <div className="col-12"><TextArea label="Notes" rows={4} value={values.notes} onChange={set('notes')} /></div>
        </div>
      ),
    },
    { key: 'files', label: 'Attachments', icon: 'paperclip', description: 'Supporting files', content: <FileUpload label={null} multiple /> },
    {
      key: 'review', label: 'Review', icon: 'check2-circle', description: 'Confirm and submit',
      validate: () => (values.confirm ? true : 'Please confirm the details are correct.'),
      content: (
        <>
          <DetailList
            items={[
              { label: 'Name', value: values.name || '—' },
              { label: 'Email', value: values.email || '—' },
              { label: 'Role', value: values.role || '—' },
              { label: 'Department', value: values.department || '—' },
              { label: 'Notes', value: values.notes || '—' },
            ]}
          />
          <Checkbox className="mt-3" label="I confirm the details above are correct" checked={values.confirm} onChange={set('confirm')} />
        </>
      ),
    },
  ];

  return (
    <ContentWrapper title="New submission" subtitle="Four short steps" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Submission' }]}>
      {done && <Alert variant="success" title="Submitted" onClose={() => setDone(false)}>Your submission was recorded (demo only).</Alert>}
      <div className="row justify-content-center">
        <div className="col-xl-9">
          <FormWizard steps={steps} onFinish={() => setDone(true)} title="Submission form" subtitle="Progress is kept as you move between steps" />
        </div>
      </div>
    </ContentWrapper>
  );
}
