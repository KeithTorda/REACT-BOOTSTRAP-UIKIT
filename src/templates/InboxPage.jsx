import { useState } from 'react';
import { ContentWrapper } from '../components/layout';
import { Card } from '../components/cards';
import { MessageList, ChatPanel, Avatar, ListGroup } from '../components/display';
import { Badge } from '../components/feedback';
import { Button } from '../components/buttons';
import { SearchInput } from '../components/forms';
import { sampleMessages } from '../data/sampleTableData';
import { chatMessages } from '../data/sampleAppData';

/** TEMPLATE — Inbox / chat page: folders, thread list, conversation. */
export default function InboxPage() {
  const [messages, setMessages] = useState(chatMessages);
  const [active, setActive] = useState(sampleMessages[0]);
  const [query, setQuery] = useState('');

  return (
    <ContentWrapper
      title="Inbox"
      subtitle="Conversations and messages"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Inbox' }]}
      actions={<Button icon="pencil-square">Compose</Button>}
    >
      <div className="row g-3">
        <div className="col-lg-3">
          <Card title="Folders" icon="inbox">
            <ListGroup
              items={[
                { title: 'Inbox', icon: 'inbox', badge: <Badge variant="primary" tone="soft" counter>2</Badge> },
                { title: 'Sent', icon: 'send' },
                { title: 'Drafts', icon: 'file-earmark', badge: <Badge variant="secondary" tone="soft" counter>1</Badge> },
                { title: 'Archive', icon: 'archive' },
                { title: 'Trash', icon: 'trash3' },
              ]}
              onItemClick={() => {}}
            />
          </Card>
        </div>

        <div className="col-lg-4">
          <Card title="Threads" padded={false} bodyClassName="p-3"
            actions={<SearchInput size="sm" width={130} value={query} onChange={setQuery} placeholder="Search" />}>
            <MessageList
              items={sampleMessages.filter((m) => !query || `${m.from} ${m.subject}`.toLowerCase().includes(query.toLowerCase()))}
              onSelect={setActive}
              maxHeight={440}
            />
          </Card>
        </div>

        <div className="col-lg-5">
          <Card padded={false}>
            <ChatPanel
              height={520}
              messages={messages}
              onSend={(text) => setMessages((list) => [...list, { id: `m${Date.now()}`, author: 'You', own: true, text, time: 'now' }])}
              header={
                <div className="d-flex align-items-center gap-2">
                  <Avatar name={active?.from} size={36} status="online" />
                  <div>
                    <div className="fw-semibold" style={{ fontSize: '.8125rem' }}>{active?.from}</div>
                    <div className="uikit-helper mt-0">{active?.subject}</div>
                  </div>
                </div>
              }
            />
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
}
