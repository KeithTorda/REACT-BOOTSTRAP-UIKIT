import { useState } from 'react';
import { ContentWrapper } from '@kit/components/layout';
import { ShowcaseSection } from '@kit/components/docs';
import { Modal, ConfirmModal, Dropdown, Tooltip } from '@kit/components/overlays';
import { Button, IconButton } from '@kit/components/buttons';
import { TextInput, SelectInput } from '@kit/components/forms';
import { roleOptions } from '@kit/data/sampleTableData';
import { Drawer, Popover, ContextMenu, CommandPalette, Lightbox } from '@kit/components/overlays';
import { gallery } from '@kit/data/sampleAppData';

export default function OverlayShowcase() {
  const [basic, setBasic] = useState(false);
  const [large, setLarge] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [drawer, setDrawer] = useState(null);
  const [palette, setPalette] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  return (
    <ContentWrapper
      title="Overlays"
      subtitle="Modal, ConfirmModal, Dropdown and Tooltip — all pure React, no Bootstrap JS"
      breadcrumb={[{ label: 'Components', path: '/components' }, { label: 'Overlays' }]}
    >
      <ShowcaseSection
        title="Modal"
        description="Portal-rendered dialog with backdrop, Escape handling and body scroll lock."
        variants={['sm', 'md', 'lg', 'xl', 'scrollable']}
        code={`const [open, setOpen] = useState(false);\n\n<Modal open={open} onClose={() => setOpen(false)} title="Edit Record"\n       footer={<><Button variant="light" onClick={close}>Cancel</Button>\n                <Button onClick={save}>Save</Button></>}>\n  <TextInput label="Name" />\n</Modal>`}
        props={[
          { name: 'open', type: 'bool', description: 'Visibility — you own the state.' },
          { name: 'onClose', type: 'func', description: 'Called by the close button, backdrop and Escape.' },
          { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Dialog width.' },
          { name: 'footer', type: 'node', description: 'Right-aligned footer actions.' },
          { name: 'scrollable', type: 'bool', default: 'false', description: 'Caps the body height and scrolls it.' },
        ]}
      >
        <div className="d-flex flex-wrap gap-2">
          <Button onClick={() => setBasic(true)}>Open modal</Button>
          <Button variant="secondary" onClick={() => setLarge(true)}>Open large modal</Button>
          <Button variant="danger" onClick={() => setConfirm(true)}>Open confirm dialog</Button>
        </div>

        <Modal
          open={basic}
          onClose={() => setBasic(false)}
          title="Edit Record"
          footer={<><Button variant="light" onClick={() => setBasic(false)}>Cancel</Button><Button icon="check2" onClick={() => setBasic(false)}>Save</Button></>}
        >
          <TextInput label="Name" placeholder="John Doe" />
          <SelectInput label="Role" options={roleOptions} />
        </Modal>

        <Modal open={large} onClose={() => setLarge(false)} title="Large Modal" size="lg" scrollable
          footer={<Button variant="light" onClick={() => setLarge(false)}>Close</Button>}>
          <p className="text-secondary-soft">A wider dialog for forms, tables or detail views.</p>
          {Array.from({ length: 12 }).map((_, index) => (
            <p key={index} className="text-secondary-soft small mb-2">Scrollable body line {index + 1}.</p>
          ))}
        </Modal>

        <ConfirmModal
          open={confirm}
          onClose={() => setConfirm(false)}
          onConfirm={() => setConfirm(false)}
          title="Delete this record?"
          message="This action cannot be undone."
          confirmLabel="Delete"
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="ConfirmModal"
        description="Destructive-action confirmation built on Modal."
        variants={['danger', 'warning', 'primary']}
        code={`<ConfirmModal\n  open={open} onClose={close} onConfirm={handleDelete}\n  title="Delete this record?"\n  message="This action cannot be undone."\n  confirmLabel="Delete" variant="danger"\n/>`}
      >
        <p className="text-secondary-soft mb-0">Trigger it with the “Open confirm dialog” button above — same component, preset for destructive actions.</p>
      </ShowcaseSection>

      <ShowcaseSection
        title="Dropdown"
        description="Config-driven menu with outside-click and Escape handling."
        variants={['button trigger', 'custom trigger', 'aligned end', 'with header/footer']}
        code={`<Dropdown\n  label="Actions" icon="gear"\n  items={[\n    { label: 'Edit', icon: 'pencil', onClick: fn },\n    { divider: true },\n    { label: 'Delete', icon: 'trash3', danger: true, onClick: fn },\n  ]}\n/>`}
      >
        <div className="d-flex flex-wrap gap-2 align-items-start">
          <Dropdown
            label="Actions" icon="gear"
            items={[
              { label: 'Edit', icon: 'pencil' },
              { label: 'Duplicate', icon: 'files' },
              { divider: true },
              { label: 'Delete', icon: 'trash3', danger: true },
            ]}
          />
          <Dropdown
            variant="primary" label="Create" icon="plus-lg"
            items={[{ label: 'Blank record', icon: 'file-earmark' }, { label: 'From template', icon: 'file-earmark-text' }]}
          />
          <Dropdown
            align="end"
            trigger={<IconButton icon="three-dots-vertical" label="More" />}
            header="Options"
            items={[{ label: 'Refresh', icon: 'arrow-clockwise' }, { label: 'Export', icon: 'download' }]}
            footer={<button type="button" className="btn btn-link btn-sm p-0">View all</button>}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Tooltip"
        description="Hover/focus tooltip in four placements."
        variants={['top', 'bottom', 'left', 'right']}
        code={`<Tooltip content="Delete" placement="top">\n  <IconButton icon="trash3" variant="danger" />\n</Tooltip>`}
      >
        <div className="d-flex flex-wrap gap-4 py-4 justify-content-center">
          {['top', 'bottom', 'left', 'right'].map((placement) => (
            <Tooltip key={placement} content={`Tooltip on ${placement}`} placement={placement}>
              <Button variant="light">{placement}</Button>
            </Tooltip>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Drawer / Offcanvas"
        description="Slide-in panel from any edge — filters, details, quick forms."
        variants={['start', 'end', 'top', 'bottom']}
        code={`<Drawer open={open} onClose={close} placement="end" title="Filters" size={340}>\n  <SelectInput label="Status" options={list} />\n</Drawer>`}
      >
        <div className="d-flex flex-wrap gap-2">
          {['start', 'end', 'top', 'bottom'].map((placement) => (
            <Button key={placement} variant="light" onClick={() => setDrawer(placement)}>{placement}</Button>
          ))}
        </div>
        <Drawer
          open={Boolean(drawer)}
          onClose={() => setDrawer(null)}
          placement={drawer || 'end'}
          size={drawer === 'top' || drawer === 'bottom' ? 260 : 340}
          title={`Drawer — ${drawer}`}
          footer={<Button onClick={() => setDrawer(null)}>Apply</Button>}
        >
          <SelectInput label="Status" options={['Active', 'Pending', 'Inactive']} />
          <TextInput label="Keyword" placeholder="Search…" />
        </Drawer>
      </ShowcaseSection>

      <ShowcaseSection
        title="Popover & ContextMenu"
        description="Click/hover popovers and a right-click menu around any content."
        variants={['popover', 'hover popover', 'context menu']}
        code={`<Popover title="Details" content="…" placement="top"><Button/></Popover>\n\n<ContextMenu items={[{ label:'Rename', icon:'pencil' }]}>\n  <div>Right-click me</div>\n</ContextMenu>`}
      >
        <div className="d-flex flex-wrap gap-3 align-items-center py-3">
          <Popover title="Quick info" content="Popovers hold richer content than a tooltip — text, lists, even small forms.">
            <Button variant="light" icon="info-circle">Click popover</Button>
          </Popover>
          <Popover trigger="hover" placement="bottom" content="Opens on hover instead of click.">
            <Button variant="light" icon="cursor">Hover popover</Button>
          </Popover>
          <ContextMenu
            items={[
              { label: 'Open', icon: 'box-arrow-up-right' },
              { label: 'Rename', icon: 'pencil', shortcut: 'F2' },
              { divider: true },
              { label: 'Delete', icon: 'trash3', danger: true },
            ]}
          >
            <div className="border rounded px-4 py-3 text-secondary-soft" style={{ borderStyle: 'dashed' }}>
              Right-click inside this box
            </div>
          </ContextMenu>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="CommandPalette"
        description="⌘K / Ctrl+K launcher with grouped commands, arrow-key navigation and search."
        variants={['hotkey', 'grouped', 'shortcuts']}
        code={`<CommandPalette\n  commands={[\n    { label: 'Go to Records', group: 'Navigate', icon: 'table', onRun: () => navigate('/records') },\n    { label: 'New record', group: 'Actions', icon: 'plus-lg', shortcut: 'N', onRun: create },\n  ]}\n/>`}
      >
        <Button icon="command" onClick={() => setPalette(true)}>Open command palette</Button>
        <span className="ms-3 uikit-helper mt-0">…or press <kbd className="uikit-kbd">Ctrl</kbd> + <kbd className="uikit-kbd">K</kbd></span>
        <CommandPalette
          open={palette}
          onOpenChange={setPalette}
          commands={[
            { label: 'Go to Overview', group: 'Navigate', icon: 'speedometer2', onRun: () => {} },
            { label: 'Go to Records', group: 'Navigate', icon: 'table', onRun: () => {} },
            { label: 'Go to Settings', group: 'Navigate', icon: 'gear', onRun: () => {} },
            { label: 'New record', group: 'Actions', icon: 'plus-lg', shortcut: 'N', onRun: () => {} },
            { label: 'Export CSV', group: 'Actions', icon: 'download', shortcut: 'E', onRun: () => {} },
            { label: 'Toggle dark mode', group: 'Preferences', icon: 'moon-stars', onRun: () => {} },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Lightbox"
        description="Fullscreen image viewer with keyboard navigation. Used by <Gallery />."
        variants={['keyboard', 'captions', 'counter']}
        code={`<Lightbox images={images} index={0} open={open} onClose={close} />`}
      >
        <Button variant="light" icon="images" onClick={() => setLightbox(true)}>Open lightbox</Button>
        <Lightbox images={gallery} open={lightbox} onClose={() => setLightbox(false)} />
      </ShowcaseSection>

    </ContentWrapper>
  );
}
