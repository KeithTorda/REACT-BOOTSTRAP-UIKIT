import { ContentWrapper } from '../components/layout';
import { Card, InfoCard, ProfileCard } from '../components/cards';
import { Tabs } from '../components/navigation';
import { Timeline, ActivityFeed, CommentThread, DetailList } from '../components/display';
import { Badge } from '../components/feedback';
import { Button, ActionButton } from '../components/buttons';
import { sampleTimeline, sampleActivity } from '../data/sampleTableData';
import { comments } from '../data/sampleAppData';

/** TEMPLATE — Record detail page with tabs. */
export default function DetailPage() {
  const tabs = [
    {
      key: 'overview', label: 'Overview', icon: 'info-circle',
      content: (
        <div className="row g-3">
          <div className="col-lg-7">
            <InfoCard
              title="Details"
              items={[
                { label: 'Reference', value: 'REF-000482', icon: 'hash' },
                { label: 'Category', value: 'Category A', icon: 'tag' },
                { label: 'Owner', value: 'Jane Smith', icon: 'person' },
                { label: 'Department', value: 'Operations', icon: 'building' },
                { label: 'Status', value: <Badge variant="success" dot>Active</Badge>, icon: 'activity' },
                { label: 'Created', value: 'Jan 12, 2026', icon: 'calendar3' },
              ]}
            />
          </div>
          <div className="col-lg-5">
            <Card title="Metadata">
              <DetailList
                items={[
                  { label: 'Created by', value: 'John Doe' },
                  { label: 'Last edited', value: 'Sep 08, 2026' },
                  { label: 'Version', value: '4' },
                  { label: 'Visibility', value: 'Internal' },
                ]}
              />
            </Card>
          </div>
        </div>
      ),
    },
    { key: 'history', label: 'History', icon: 'clock-history', content: <Card><Timeline items={sampleTimeline} /></Card> },
    { key: 'activity', label: 'Activity', icon: 'activity', content: <Card><ActivityFeed items={sampleActivity} /></Card> },
    {
      key: 'comments', label: 'Comments', icon: 'chat-dots',
      badge: <Badge variant="primary" tone="soft" counter>2</Badge>,
      content: <Card><CommentThread comments={comments} onReply={() => {}} /></Card>,
    },
  ];

  return (
    <ContentWrapper
      title="Record REF-000482"
      subtitle="Full detail view"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Records', path: '#' }, { label: 'REF-000482' }]}
      actions={<><Button tone="soft" icon="printer">Print</Button><ActionButton action="edit" /></>}
    >
      <div className="row g-3">
        <div className="col-xl-3">
          <ProfileCard
            name="Jane Smith"
            role="Record owner"
            status="Active"
            meta={[{ label: 'email', icon: 'envelope', value: 'jane.smith@example.com' }, { label: 'dept', icon: 'building', value: 'Operations' }]}
            stats={[{ label: 'Records', value: 24 }, { label: 'Open', value: 3 }]}
            actions={<Button size="sm" icon="chat-dots">Message</Button>}
          />
        </div>
        <div className="col-xl-9">
          <Card padded={false} bodyClassName="p-3"><Tabs items={tabs} /></Card>
        </div>
      </div>
    </ContentWrapper>
  );
}
