import { ContentWrapper } from '@kit/components/layout';
import { ShowcaseSection } from '@kit/components/docs';
import {
  Avatar, AvatarGroup, DetailList, Timeline, ActivityFeed,
  MessageList, NotificationDropdown, CalendarWidget, InvoiceLayout,
} from '@kit/components/display';
import { Card } from '@kit/components/cards';
import { Badge } from '@kit/components/feedback';
import { Button } from '@kit/components/buttons';
import { sampleActivity, sampleTimeline, sampleMessages, sampleNotifications, sampleInvoiceItems, sampleRows } from '@kit/data/sampleTableData';
import { ListGroup, KanbanBoard, FileManager, ChatPanel, CommentThread, PricingCard, Gallery } from '@kit/components/display';
import { ToggleGroup } from '@kit/components/buttons';
import { kanbanColumns, files, gallery, chatMessages, comments, plans } from '@kit/data/sampleAppData';
import { useState } from 'react';

export default function DisplayShowcase() {
  const [checked, setChecked] = useState(['a']);
  const [board, setBoard] = useState(kanbanColumns);
  const [fileView, setFileView] = useState('grid');
  const [messages, setMessages] = useState(chatMessages);

  return (
    <ContentWrapper
      title="Data Display"
      subtitle="Avatars, detail lists, timelines, feeds, messages, calendar and document layout"
      breadcrumb={[{ label: 'Components', path: '/components' }, { label: 'Data Display' }]}
    >
      <ShowcaseSection
        title="Avatar & AvatarGroup"
        description="Initials fall back automatically when no image is supplied."
        variants={['sizes', 'square', 'status', 'group']}
        code={`<Avatar name="Jane Smith" size={40} status="online" />\n<AvatarGroup users={users} max={4} size={34} />`}
      >
        <div className="d-flex flex-wrap align-items-center gap-3">
          <Avatar name="John Doe" size={28} />
          <Avatar name="Jane Smith" size={40} />
          <Avatar name="Alex Morgan" size={56} />
          <Avatar name="Maria Cruz" size={40} square />
          <Avatar name="Daniel Reyes" size={40} status="online" />
          <Avatar name="Priya Nair" size={40} status="busy" />
          <AvatarGroup users={sampleRows.slice(0, 6)} max={4} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="DetailList"
        description="Label/value rows for read-only detail panes."
        variants={['default', 'with icons']}
        code={`<DetailList items={[\n  { label: 'Reference', value: 'REF-000482', icon: 'hash' },\n  { label: 'Status', value: <Badge variant="success">Active</Badge> },\n]} />`}
      >
        <Card className="mb-0" title="Record Details">
          <DetailList
            items={[
              { label: 'Reference', value: 'REF-000482', icon: 'hash' },
              { label: 'Owner', value: 'John Doe', icon: 'person' },
              { label: 'Category', value: 'Category A', icon: 'tag' },
              { label: 'Status', value: <Badge variant="success" dot>Active</Badge>, icon: 'activity' },
              { label: 'Last updated', value: 'Sep 08, 2026', icon: 'clock-history' },
            ]}
          />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="Timeline & ActivityFeed"
        description="Chronological history and a recent-activity stream."
        variants={['timeline', 'feed', 'scrollable feed']}
        code={`<Timeline items={[{ title, description, time, variant }]} />\n\n<ActivityFeed items={[{ user, action, target, time, icon, variant }]}\n              maxHeight={300} />`}
        muted
      >
        <div className="row g-3">
          <div className="col-md-6"><Card className="mb-0 h-100" title="Timeline"><Timeline items={sampleTimeline} /></Card></div>
          <div className="col-md-6"><Card className="mb-0 h-100" title="Activity Feed"><ActivityFeed items={sampleActivity} maxHeight={280} /></Card></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="MessageList & NotificationDropdown"
        description="Inbox-style list and the navbar bell/envelope dropdown."
        variants={['messages', 'notifications']}
        code={`<MessageList items={messages} onSelect={fn} maxHeight={300} />\n\n<NotificationDropdown icon="bell" title="Notifications" items={notifications} />`}
        muted
      >
        <div className="row g-3">
          <div className="col-md-7"><Card className="mb-0 h-100" title="Messages" padded={false} bodyClassName="p-3"><MessageList items={sampleMessages} maxHeight={280} /></Card></div>
          <div className="col-md-5">
            <Card className="mb-0 h-100" title="Notification Dropdown">
              <p className="text-secondary-soft small">Click the bell — the navbar uses the same component.</p>
              <div className="d-flex gap-2">
                <NotificationDropdown icon="bell" title="Notifications" items={sampleNotifications} />
                <NotificationDropdown icon="envelope" title="Messages" items={sampleMessages.map((m) => ({ title: m.from, description: m.subject, time: m.time, icon: 'envelope', unread: m.unread }))} />
              </div>
            </Card>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="CalendarWidget"
        description="Month calendar in pure React — no calendar plugin."
        variants={['default', 'with events']}
        code={`<CalendarWidget\n  events={{ '2026-09-12': 2 }}\n  onSelect={(date, events) => …}\n/>`}
        muted
      >
        <div className="row g-3">
          <div className="col-md-5">
            <Card className="mb-0" title="Calendar">
              <CalendarWidget events={{ [`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-12`]: 2, [`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-21`]: 1 }} />
            </Card>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="InvoiceLayout"
        description="Generic document layout — issuer, recipient, line items, totals. Feed it any {description, quantity, price} rows."
        variants={['invoice', 'quotation', 'receipt']}
        code={`<InvoiceLayout\n  title="Invoice" reference="INV-000123"\n  issuedOn="Sep 01, 2026" dueOn="Sep 15, 2026"\n  from={{ name: 'Your Organization', lines: ['123 Example St'] }}\n  to={{ name: 'Jane Smith', lines: ['jane.smith@example.com'] }}\n  items={items} taxRate={12}\n/>`}
        muted
      >
        <InvoiceLayout
          className="mb-0"
          title="Invoice"
          reference="INV-000123"
          issuedOn="Sep 01, 2026"
          dueOn="Sep 15, 2026"
          from={{ name: 'Your Organization', lines: ['123 Example Street', 'City, Country', 'billing@example.com'] }}
          to={{ name: 'Jane Smith', lines: ['456 Sample Avenue', 'jane.smith@example.com'] }}
          items={sampleInvoiceItems}
          taxRate={12}
          notes="Generic placeholder document — replace the content per project."
          actions={<Button size="sm" variant="light" icon="printer">Print</Button>}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="ListGroup"
        description="Config-driven list in four flavours."
        variants={ListGroup.VARIANTS}
        code={`<ListGroup variant="avatar" items={[{ title, subtitle, avatar, badge }]} />\n<ListGroup variant="checklist" checked={done} onCheck={toggle} items={items} />`}
        muted
      >
        <div className="row g-3">
          <div className="col-md-6">
            <Card className="mb-0 h-100" title="With avatars">
              <ListGroup variant="avatar" items={sampleRows.slice(0, 4).map((row) => ({ title: row.name, subtitle: row.role, badge: <Badge variant="success" tone="soft">{row.status}</Badge> }))} />
            </Card>
          </div>
          <div className="col-md-6">
            <Card className="mb-0 h-100" title="Checklist">
              <ListGroup
                variant="checklist"
                checked={checked}
                onCheck={(key) => setChecked((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]))}
                items={[
                  { id: 'a', title: 'Draft the intake form', subtitle: 'Due today' },
                  { id: 'b', title: 'Review the export', subtitle: 'Due tomorrow' },
                  { id: 'c', title: 'Send the summary', subtitle: 'This week' },
                  { id: 'd', title: 'Archive last quarter', subtitle: 'No due date' },
                ]}
              />
            </Card>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="KanbanBoard"
        description="Drag cards between columns — plain HTML5 drag & drop, no library."
        variants={['drag & drop', 'card tags', 'assignees', 'add card']}
        code={`<KanbanBoard\n  columns={[{ key:'todo', title:'To do', cards:[{ id:'1', title:'Task' }] }]}\n  onChange={setColumns}\n  onCardClick={openCard}\n/>`}
        muted
      >
        <KanbanBoard columns={board} onChange={setBoard} />
      </ShowcaseSection>

      <ShowcaseSection
        title="FileManager & Gallery"
        description="Files in grid or list view, and a thumbnail gallery wired to the lightbox."
        variants={['grid', 'list', 'gallery']}
        code={`<FileManager items={files} view="grid" actions={menu} onOpen={open} />\n<Gallery images={images} columns={4} />`}
        muted
      >
        <div className="row g-3">
          <div className="col-lg-7">
            <Card className="mb-0 h-100" title="Files" actions={<ToggleGroup value={fileView} onChange={setFileView} options={[{ value: 'grid', label: 'Grid', icon: 'grid-3x3-gap' }, { value: 'list', label: 'List', icon: 'list-ul' }]} />}>
              <FileManager items={files} view={fileView} actions={[{ label: 'Rename', icon: 'pencil' }, { label: 'Delete', icon: 'trash3', danger: true }]} />
            </Card>
          </div>
          <div className="col-lg-5">
            <Card className="mb-0 h-100" title="Gallery"><Gallery images={gallery} columns={3} /></Card>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="ChatPanel & CommentThread"
        description="A message thread with composer, and nested comments with inline replies."
        variants={['chat', 'comments']}
        code={`<ChatPanel messages={msgs} onSend={send} height={420} />\n<CommentThread comments={list} onReply={reply} />`}
        muted
      >
        <div className="row g-3">
          <div className="col-lg-6">
            <Card className="mb-0 h-100" padded={false}>
              <ChatPanel height={380} messages={messages} onSend={(text) => setMessages((list) => [...list, { id: `m${Date.now()}`, author: 'You', own: true, text, time: 'now' }])} />
            </Card>
          </div>
          <div className="col-lg-6">
            <Card className="mb-0 h-100" title="Comments"><CommentThread comments={comments} onReply={() => {}} /></Card>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="PricingCard"
        description="Plan tiers with a featured highlight and included/excluded features."
        variants={['standard', 'featured', 'excluded features']}
        code={`<PricingCard name="Team" price="₱1,299" period="/month" featured\n  features={['5 workspaces', { label: 'Priority support', included: false }]}\n  action={{ label: 'Choose Team' }} />`}
        muted
      >
        <div className="row g-3">
          {plans.map((plan) => (
            <div className="col-md-4" key={plan.name}><PricingCard {...plan} /></div>
          ))}
        </div>
      </ShowcaseSection>

    </ContentWrapper>
  );
}
