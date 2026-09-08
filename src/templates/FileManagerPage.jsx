import { useState } from 'react';
import { ContentWrapper } from '../components/layout';
import { Card } from '../components/cards';
import { FileManager, ListGroup } from '../components/display';
import { Button, ToggleGroup } from '../components/buttons';
import { Progress, Badge } from '../components/feedback';
import { Drawer } from '../components/overlays';
import { FileUpload } from '../components/forms';
import { files } from '../data/sampleAppData';

/** TEMPLATE — File manager with grid/list toggle and an upload drawer. */
export default function FileManagerPage() {
  const [view, setView] = useState('grid');
  const [uploading, setUploading] = useState(false);

  return (
    <ContentWrapper
      title="Files"
      subtitle="Documents, images and archives"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Files' }]}
      actions={
        <>
          <ToggleGroup
            value={view}
            onChange={setView}
            options={[{ value: 'grid', label: 'Grid', icon: 'grid-3x3-gap' }, { value: 'list', label: 'List', icon: 'list-ul' }]}
          />
          <Button icon="upload" onClick={() => setUploading(true)}>Upload</Button>
        </>
      }
    >
      <div className="row g-3">
        <div className="col-lg-3">
          <Card title="Storage" icon="hdd">
            <Progress className="mb-2" value={64} showLabel label="18.2 GB of 30 GB" />
            <div className="uikit-helper">11.8 GB remaining</div>
          </Card>
          <Card title="Categories" icon="folder">
            <ListGroup
              items={[
                { title: 'Documents', icon: 'file-earmark-text', badge: <Badge tone="soft" variant="primary" counter>24</Badge> },
                { title: 'Images', icon: 'file-earmark-image', badge: <Badge tone="soft" variant="info" counter>112</Badge> },
                { title: 'Spreadsheets', icon: 'file-earmark-spreadsheet', badge: <Badge tone="soft" variant="success" counter>18</Badge> },
                { title: 'Archives', icon: 'file-earmark-zip', badge: <Badge tone="soft" variant="secondary" counter>6</Badge> },
              ]}
            />
          </Card>
        </div>

        <div className="col-lg-9">
          <Card title="All files" subtitle={`${files.length} items`}>
            <FileManager
              items={files}
              view={view}
              actions={[
                { label: 'Open', icon: 'box-arrow-up-right' },
                { label: 'Rename', icon: 'pencil' },
                { label: 'Download', icon: 'download' },
                { divider: true },
                { label: 'Delete', icon: 'trash3', danger: true },
              ]}
            />
          </Card>
        </div>
      </div>

      <Drawer open={uploading} onClose={() => setUploading(false)} title="Upload files" size={380}
        footer={<Button onClick={() => setUploading(false)}>Done</Button>}>
        <FileUpload label={null} multiple helperText="Drop files or browse" />
      </Drawer>
    </ContentWrapper>
  );
}
