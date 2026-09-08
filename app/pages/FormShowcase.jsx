import { useState } from 'react';
import { ContentWrapper } from '@kit/components/layout';
import { ShowcaseSection } from '@kit/components/docs';
import {
  TextInput, TextArea, SelectInput, Checkbox, RadioGroup, Switch,
  DateInput, FileUpload, SearchInput, FormCard,
} from '@kit/components/forms';
import { Button } from '@kit/components/buttons';
import { roleOptions, departmentOptions } from '@kit/data/sampleTableData';
import {
  PasswordInput, Autocomplete, TagsInput, MultiSelect, OTPInput,
  NumberStepper, RangeSlider, Rating, ColorPicker, MaskedInput,
  RepeaterField, RichTextArea, FormWizard,
} from '@kit/components/forms';

export default function FormShowcase() {
  const [values, setValues] = useState({
    name: '', email: '', notes: '', role: '', date: '', search: '',
    agree: false, notify: true, plan: 'standard',
  });
  const [adv, setAdv] = useState({
    password: '', city: '', tags: ['Draft'], departments: [], phone: '',
    otp: '', quantity: 1, radius: 10, rating: 4, color: '#2fdf84',
    lines: [{ description: '', quantity: 1 }], html: '<p>Type here…</p>',
  });
  const set = (key) => (event) =>
    setValues((prev) => ({ ...prev, [key]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));

  return (
    <ContentWrapper
      title="Forms"
      subtitle="Every control shares the same props: label, value, onChange, required, disabled, error, helperText, size"
      breadcrumb={[{ label: 'Components', path: '/components' }, { label: 'Forms' }]}
    >
      <ShowcaseSection
        title="TextInput"
        description="Text, email, password, number — plus prefix/suffix add-ons."
        variants={['default', 'sm', 'lg', 'error', 'disabled', 'with add-ons']}
        code={`<TextInput\n  label="Full Name"\n  placeholder="Enter name"\n  value={value}\n  onChange={handleChange}\n  required\n  error="This field is required"\n  helperText="As shown on the record"\n  size="sm"\n/>`}
        props={[
          { name: 'label', type: 'node', description: 'Field label.' },
          { name: 'value / onChange', type: 'any / func', description: 'Controlled value.' },
          { name: 'required', type: 'bool', default: 'false', description: 'Adds the red asterisk and the HTML attribute.' },
          { name: 'error', type: 'node', description: 'Error message — also applies `is-invalid`.' },
          { name: 'helperText', type: 'node', description: 'Hint below the field (hidden when `error` is set).' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control size.' },
          { name: 'prefix / suffix', type: 'node | string', description: 'Input-group add-ons (a string is read as an icon name).' },
        ]}
      >
        <div className="row">
          <div className="col-md-6">
            <TextInput label="Full Name" placeholder="Enter name" value={values.name} onChange={set('name')} required helperText="As shown on the record" />
            <TextInput label="Email" type="email" placeholder="you@example.com" prefix="envelope" value={values.email} onChange={set('email')} />
            <TextInput label="Small size" size="sm" placeholder="Small" />
          </div>
          <div className="col-md-6">
            <TextInput label="With error" placeholder="Invalid value" error="This field is required" />
            <TextInput label="Disabled" placeholder="Cannot edit" disabled />
            <TextInput label="Amount" type="number" prefix="cash" suffix={<span>PHP</span>} placeholder="0.00" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="TextArea & SelectInput"
        description="Multi-line input with optional counter, and a config-driven select."
        variants={['textarea', 'counter', 'select', 'multiple']}
        code={`<TextArea label="Notes" rows={4} maxLength={280} showCount\n          value={value} onChange={fn} />\n\n<SelectInput label="Role" options={roleOptions}\n             value={value} onChange={fn} required />`}
      >
        <div className="row">
          <div className="col-md-6">
            <TextArea label="Notes" rows={4} maxLength={280} showCount value={values.notes} onChange={set('notes')} placeholder="Free text…" />
          </div>
          <div className="col-md-6">
            <SelectInput label="Role" options={roleOptions} value={values.role} onChange={set('role')} required />
            <SelectInput label="Department" options={departmentOptions.map((d) => ({ value: d, label: d }))} helperText="Options can be strings or {value,label} objects" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Checkbox, Radio & Switch"
        description="Selection controls sharing the same label/error API."
        variants={['checkbox', 'inline', 'radio group', 'switch']}
        code={`<Checkbox label="I agree" checked={v} onChange={fn} />\n\n<RadioGroup label="Plan" name="plan" inline\n  options={[{ value: 'basic', label: 'Basic' }]}\n  value={v} onChange={fn} />\n\n<Switch label="Email notifications" checked={v} onChange={fn} />`}
      >
        <div className="row">
          <div className="col-md-4">
            <p className="form-label">Checkboxes</p>
            <Checkbox label="Default option" defaultChecked />
            <Checkbox label="Terms and privacy policy" checked={values.agree} onChange={set('agree')} required />
            <Checkbox label="Disabled option" disabled />
          </div>
          <div className="col-md-4">
            <RadioGroup
              label="Plan" name="plan" value={values.plan} onChange={set('plan')}
              options={[{ value: 'basic', label: 'Basic' }, { value: 'standard', label: 'Standard' }, { value: 'premium', label: 'Premium' }]}
            />
          </div>
          <div className="col-md-4">
            <p className="form-label">Switches</p>
            <Switch label="Email notifications" description="Send a summary each morning" checked={values.notify} onChange={set('notify')} />
            <Switch label="Large switch" size="lg" defaultChecked />
            <Switch label="Disabled" disabled />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="DateInput, SearchInput & FileUpload"
        description="Native date/time modes, a toolbar search field, and a drag-and-drop uploader built with React state only."
        variants={['date', 'time', 'datetime', 'search', 'upload']}
        code={`<DateInput label="Start date" mode="date" value={v} onChange={fn} />\n<SearchInput value={q} onChange={setQ} onClear={() => setQ('')} />\n<FileUpload label="Attachments" multiple accept="image/*,.pdf"\n            onChange={files => setFiles(files)} />`}
      >
        <div className="row">
          <div className="col-md-6">
            <DateInput label="Date" mode="date" value={values.date} onChange={set('date')} />
            <DateInput label="Time" mode="time" />
            <DateInput label="Date & time" mode="datetime" />
            <div className="mb-3">
              <label className="form-label">Search field</label>
              <SearchInput value={values.search} onChange={(v) => setValues((p) => ({ ...p, search: v }))} onClear={() => setValues((p) => ({ ...p, search: '' }))} />
            </div>
          </div>
          <div className="col-md-6">
            <FileUpload label="Attachments" multiple accept="image/*,.pdf" helperText="Drop files or click to browse" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="FormCard"
        description="A form inside a Card with a footer action row."
        variants={['single column', 'two column']}
        code={`<FormCard title="Create Record" onSubmit={handleSubmit}\n  actions={<><Button variant="light">Cancel</Button>\n            <Button type="submit">Save</Button></>}>\n  <TextInput label="Name" … />\n</FormCard>`}
        muted
      >
        <FormCard
          className="mb-0"
          title="Create Record"
          subtitle="Generic form assembled from the kit's inputs"
          onSubmit={(event) => event.preventDefault()}
          actions={
            <div className="d-flex justify-content-end gap-2">
              <Button variant="light">Cancel</Button>
              <Button type="submit" icon="check2">Save</Button>
            </div>
          }
        >
          <div className="row">
            <div className="col-md-6"><TextInput label="Name" placeholder="John Doe" required /></div>
            <div className="col-md-6"><TextInput label="Email" type="email" placeholder="you@example.com" required /></div>
            <div className="col-md-6"><SelectInput label="Role" options={roleOptions} /></div>
            <div className="col-md-6"><DateInput label="Start date" /></div>
            <div className="col-12"><TextArea label="Notes" rows={3} /></div>
          </div>
        </FormCard>
      </ShowcaseSection>

      <ShowcaseSection
        title="Advanced inputs"
        description="Password strength, autocomplete, tags, multi-select, OTP, stepper, masked and colour fields."
        variants={['password', 'autocomplete', 'tags', 'multi-select', 'otp', 'stepper', 'masked', 'colour', 'rating', 'range']}
        code={`<PasswordInput label="Password" strength value={v} onChange={fn} />\n<Autocomplete label="City" options={list} value={v} onChange={fn} />\n<TagsInput label="Tags" value={tags} onChange={setTags} />\n<MultiSelect label="Departments" options={list} value={arr} onChange={fn} />\n<OTPInput length={6} value={code} onChange={setCode} />\n<MaskedInput mask="phone" label="Phone" />`}
      >
        <div className="row">
          <div className="col-md-6">
            <PasswordInput label="Password" strength value={adv.password} onChange={(e) => setAdv((p) => ({ ...p, password: e.target.value }))} />
            <Autocomplete label="Department" options={departmentOptions} value={adv.city} onChange={(v) => setAdv((p) => ({ ...p, city: v }))} helperText="Type to filter" />
            <TagsInput label="Tags" value={adv.tags} onChange={(v) => setAdv((p) => ({ ...p, tags: v }))} helperText="Enter or comma to add" />
            <MultiSelect label="Departments" options={departmentOptions} value={adv.departments} onChange={(v) => setAdv((p) => ({ ...p, departments: v }))} />
            <MaskedInput mask="phone" label="Phone" placeholder="(555) 000-0000" value={adv.phone} onChange={(e) => setAdv((p) => ({ ...p, phone: e.target.value }))} />
          </div>
          <div className="col-md-6">
            <OTPInput label="Verification code" length={6} value={adv.otp} onChange={(v) => setAdv((p) => ({ ...p, otp: v }))} />
            <NumberStepper label="Quantity" value={adv.quantity} onChange={(v) => setAdv((p) => ({ ...p, quantity: v }))} min={1} max={99} suffix="pcs" />
            <RangeSlider label="Corner radius" value={adv.radius} onChange={(e) => setAdv((p) => ({ ...p, radius: Number(e.target.value) }))} min={0} max={24} format={(v) => `${v}px`} />
            <Rating label="Rating" value={adv.rating} onChange={(v) => setAdv((p) => ({ ...p, rating: v }))} showValue />
            <ColorPicker label="Brand colour" value={adv.color} onChange={(_, hex) => setAdv((p) => ({ ...p, color: hex }))} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Label layouts"
        description="The same control in four layouts — vertical, horizontal, floating and inline."
        variants={['vertical', 'horizontal', 'floating', 'inline']}
        code={`<TextInput label="Name" />                    // vertical (default)\n<TextInput label="Name" horizontal />\n<TextInput label="Name" floating placeholder="Name" />\n<TextInput label="Name" inline />`}
      >
        <div className="row">
          <div className="col-md-6">
            <TextInput label="Vertical" placeholder="Default layout" />
            <TextInput label="Horizontal" horizontal placeholder="Label beside the field" />
          </div>
          <div className="col-md-6">
            <TextInput label="Floating" floating placeholder="Floating label" />
            <SelectInput label="Floating select" floating options={roleOptions} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="RepeaterField & RichTextArea"
        description="Repeating line items and a dependency-free rich-text field."
        variants={['repeater', 'rich text']}
        code={`<RepeaterField value={rows} onChange={setRows} emptyRow={{ description:'', quantity:1 }}\n  renderRow={(row, update) => (\n    <TextInput value={row.description} onChange={e => update({ description: e.target.value })} />\n  )} />`}
      >
        <div className="row">
          <div className="col-lg-6">
            <RepeaterField
              label="Line items"
              value={adv.lines}
              onChange={(v) => setAdv((p) => ({ ...p, lines: v }))}
              emptyRow={{ description: '', quantity: 1 }}
              renderRow={(row, update) => (
                <div className="row g-2">
                  <div className="col-8"><TextInput className="mb-0" placeholder="Description" value={row.description} onChange={(e) => update({ description: e.target.value })} /></div>
                  <div className="col-4"><TextInput className="mb-0" type="number" placeholder="Qty" value={row.quantity} onChange={(e) => update({ quantity: e.target.value })} /></div>
                </div>
              )}
            />
          </div>
          <div className="col-lg-6">
            <RichTextArea label="Description" value={adv.html} onChange={(html) => setAdv((p) => ({ ...p, html }))} minHeight={140} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="FormWizard"
        description="Multi-step form with per-step validation; horizontal or vertical stepper."
        variants={['horizontal', 'vertical']}
        code={`<FormWizard\n  steps={[{ key:'a', label:'Details', content:<Fields/>, validate: () => true }]}\n  onFinish={submit}\n  orientation="horizontal"\n/>`}
        muted
      >
        <FormWizard
          className="mb-0"
          title="Example wizard"
          steps={[
            { key: 's1', label: 'Details', icon: 'person', description: 'Who', content: <TextInput label="Full name" placeholder="John Doe" /> },
            { key: 's2', label: 'Options', icon: 'sliders', description: 'How', content: <SelectInput label="Role" options={roleOptions} /> },
            { key: 's3', label: 'Review', icon: 'check2-circle', description: 'Confirm', content: <p className="text-secondary-soft mb-0">Everything looks good.</p> },
          ]}
        />
      </ShowcaseSection>

    </ContentWrapper>
  );
}
