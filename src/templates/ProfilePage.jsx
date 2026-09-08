import { ContentWrapper } from '../components/layout';
import { Card, ProfileCard, StatsCard } from '../components/cards';
import { Tabs } from '../components/navigation';
import { DetailList, Timeline, ActivityFeed, Gallery } from '../components/display';
import { Button } from '../components/buttons';
import { Progress, Badge } from '../components/feedback';
import { sampleTimeline, sampleActivity } from '../data/sampleTableData';
import { gallery } from '../data/sampleAppData';

/** TEMPLATE — User / entity profile page. */
export default function ProfilePage() {
  return (
    <ContentWrapper title="Profile" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Profile' }]} actions={<Button icon="pencil">Edit profile</Button>}>
      <div className="row g-3">
        <div className="col-lg-4">
          <ProfileCard
            name="Jane Smith"
            role="Operations Lead"
            status="Active"
            description="Coordinates the records team and owns the monthly reporting cycle."
            meta={[
              { label: 'email', icon: 'envelope', value: 'jane.smith@example.com' },
              { label: 'phone', icon: 'telephone', value: '+63 917 000 0000' },
              { label: 'location', icon: 'geo-alt', value: 'Manila, Philippines' },
              { label: 'joined', icon: 'calendar3', value: 'Joined Jan 2024' },
            ]}
            stats={[{ label: 'Records', value: 248 }, { label: 'Teams', value: 3 }, { label: 'Reports', value: 41 }]}
            actions={<><Button size="sm" icon="chat-dots">Message</Button><Button size="sm" tone="soft" icon="three-dots" /></>}
          />

          <Card title="Skills" icon="stars">
            {[['Reporting', 88], ['Data entry', 74], ['Coordination', 92], ['Training', 61]].map(([label, value]) => (
              <Progress key={label} className="mb-3" label={label} value={value} showLabel />
            ))}
          </Card>
        </div>

        <div className="col-lg-8">
          <div className="row g-3 mb-1">
            <div className="col-6 col-md-4"><StatsCard layout="icon-top" label="Assigned" value="42" icon="inbox" /></div>
            <div className="col-6 col-md-4"><StatsCard layout="icon-top" label="Completed" value="126" icon="check2-circle" variant="success" /></div>
            <div className="col-12 col-md-4"><StatsCard layout="icon-top" label="Overdue" value="3" icon="exclamation-triangle" variant="danger" /></div>
          </div>

          <Card padded={false} bodyClassName="p-3">
            <Tabs
              items={[
                {
                  key: 'about', label: 'About', icon: 'person',
                  content: (
                    <DetailList
                      items={[
                        { label: 'Employee ID', value: 'EMP-00241' },
                        { label: 'Department', value: 'Operations' },
                        { label: 'Reports to', value: 'John Doe' },
                        { label: 'Employment', value: <Badge variant="success" tone="soft">Full time</Badge> },
                        { label: 'Office', value: 'Head office' },
                      ]}
                    />
                  ),
                },
                { key: 'activity', label: 'Activity', icon: 'activity', content: <ActivityFeed items={sampleActivity} /> },
                { key: 'history', label: 'History', icon: 'clock-history', content: <Timeline items={sampleTimeline} /> },
                { key: 'files', label: 'Gallery', icon: 'images', content: <Gallery images={gallery} columns={4} /> },
              ]}
            />
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
}
