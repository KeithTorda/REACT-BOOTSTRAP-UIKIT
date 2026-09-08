import { useState } from 'react';
import { ContentWrapper } from '../components/layout';
import { Card } from '../components/cards';
import { Tabs } from '../components/navigation';
import {
  TextInput, TextArea, SelectInput, Switch, ColorPicker, FileUpload,
  PasswordInput, RadioGroup, RangeSlider,
} from '../components/forms';
import { Button } from '../components/buttons';
import { Alert, Badge } from '../components/feedback';
import { DataTable } from '../components/tables';
import { sampleRows } from '../data/sampleTableData';

/** TEMPLATE — Tabbed settings page. */
export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const save = <div className="d-flex justify-content-end gap-2"><Button variant="light">Cancel</Button><Button icon="check2" onClick={() => setSaved(true)}>Save changes</Button></div>;

  const tabs = [
    {
      key: 'general', label: 'General', icon: 'gear',
      content: (
        <Card title="Organisation" footer={save}>
          <div className="row">
            <div className="col-md-6"><TextInput label="Organisation name" defaultValue="Your Organization" /></div>
            <div className="col-md-6"><TextInput label="Support email" type="email" defaultValue="support@example.com" /></div>
            <div className="col-md-6"><SelectInput label="Timezone" options={['Asia/Manila', 'UTC', 'Asia/Singapore']} defaultValue="Asia/Manila" /></div>
            <div className="col-md-6"><SelectInput label="Date format" options={['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD']} /></div>
            <div className="col-12"><TextArea label="Description" rows={3} /></div>
          </div>
        </Card>
      ),
    },
    {
      key: 'branding', label: 'Branding', icon: 'palette',
      content: (
        <Card title="Appearance" footer={save}>
          <div className="row">
            <div className="col-md-6"><ColorPicker label="Primary colour" /></div>
            <div className="col-md-6"><ColorPicker label="Accent colour" value="#8944d7" /></div>
            <div className="col-md-6"><FileUpload label="Logo" accept="image/*" /></div>
            <div className="col-md-6"><FileUpload label="Favicon" accept="image/*" /></div>
            <div className="col-md-6"><RadioGroup label="Default theme" name="theme" inline options={['Light', 'Dark', 'System']} value="Light" onChange={() => {}} /></div>
            <div className="col-md-6"><RangeSlider label="Corner radius" value={10} onChange={() => {}} min={0} max={24} format={(v) => `${v}px`} /></div>
          </div>
        </Card>
      ),
    },
    {
      key: 'notifications', label: 'Notifications', icon: 'bell',
      content: (
        <Card title="Delivery preferences" footer={save}>
          {[
            ['Email digests', 'A summary every weekday morning'],
            ['Record updates', 'When a record you own changes'],
            ['Mentions', 'When someone mentions you in a comment'],
            ['Exports', 'When a long export finishes'],
            ['Security alerts', 'Sign-ins from new devices'],
          ].map(([label, description], index) => (
            <Switch key={label} className="mb-3" label={label} description={description} defaultChecked={index < 3} />
          ))}
        </Card>
      ),
    },
    {
      key: 'security', label: 'Security', icon: 'shield-lock',
      content: (
        <>
          <Card title="Password" footer={save}>
            <div className="row">
              <div className="col-md-6"><PasswordInput label="Current password" /></div>
              <div className="col-md-6"><PasswordInput label="New password" strength value="" onChange={() => {}} /></div>
            </div>
          </Card>
          <Card title="Two-factor authentication">
            <Switch label="Require a code at sign-in" description="Uses an authenticator app" defaultChecked />
          </Card>
        </>
      ),
    },
    {
      key: 'team', label: 'Team', icon: 'people',
      content: (
        <DataTable
          title="Members"
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Role' },
            { key: 'status', label: 'Status', render: (v) => <Badge variant={v === 'Active' ? 'success' : 'warning'} tone="soft">{v}</Badge> },
          ]}
          data={sampleRows.slice(0, 6)}
          toolbarActions={<Button size="sm" icon="person-plus">Invite</Button>}
          actions={[{ icon: 'pencil', label: 'Edit' }, { icon: 'person-dash', label: 'Remove', variant: 'danger' }]}
        />
      ),
    },
  ];

  return (
    <ContentWrapper title="Settings" subtitle="Configure the workspace" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Settings' }]}>
      {saved && <Alert variant="success" title="Settings saved" onClose={() => setSaved(false)}>Your changes were stored (demo only).</Alert>}
      <Tabs items={tabs} variant="pills" />
    </ContentWrapper>
  );
}
