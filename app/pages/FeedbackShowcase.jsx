import { ContentWrapper } from '@kit/components/layout';
import { ShowcaseSection } from '@kit/components/docs';
import { Alert, Badge, Spinner, Skeleton, EmptyState, ErrorState, ToastContainer } from '@kit/components/feedback';
import { Button } from '@kit/components/buttons';
import { Card } from '@kit/components/cards';
import useToasts from '@kit/hooks/useToasts';
import { StatusDot, Progress, CircularProgress, SkeletonPreset } from '@kit/components/feedback';

const VARIANTS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

export default function FeedbackShowcase() {
  const { toasts, push, dismiss } = useToasts();

  return (
    <ContentWrapper
      title="Feedback"
      subtitle="Alerts, badges, toasts, loading, empty and error states"
      breadcrumb={[{ label: 'Components', path: '/components' }, { label: 'Feedback' }]}
    >
      <ToastContainer toasts={toasts} onDismiss={dismiss} />

      <ShowcaseSection
        title="Alert"
        description="Inline message with an automatic icon per variant."
        variants={VARIANTS}
        code={`<Alert variant="success" title="Saved" onClose={fn}>\n  Your changes were stored.\n</Alert>`}
      >
        {VARIANTS.map((variant) => (
          <Alert key={variant} variant={variant} title={`${variant[0].toUpperCase()}${variant.slice(1)} alert`}>
            A short, generic message for the {variant} state.
          </Alert>
        ))}
        <Alert variant="info" title="Dismissible" onClose={() => {}}>This one has a close button.</Alert>
      </ShowcaseSection>

      <ShowcaseSection
        title="Badge"
        description="Status pills in a soft or solid tone."
        variants={['soft', 'solid', 'with dot', 'with icon']}
        code={`<Badge variant="success" tone="soft" dot>Active</Badge>\n<Badge variant="danger" tone="solid" icon="x-circle">Rejected</Badge>`}
      >
        <div className="d-flex flex-wrap gap-2 mb-3">
          {[...VARIANTS, 'dark', 'light'].map((variant) => <Badge key={variant} variant={variant} tone="soft">{variant}</Badge>)}
        </div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {[...VARIANTS, 'dark', 'light'].map((variant) => <Badge key={variant} variant={variant} tone="solid">{variant}</Badge>)}
        </div>
        <div className="d-flex flex-wrap gap-2">
          <Badge variant="success" dot>Active</Badge>
          <Badge variant="warning" dot>Pending</Badge>
          <Badge variant="danger" icon="x-circle">Rejected</Badge>
          <Badge variant="info" icon="clock">Scheduled</Badge>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Toast"
        description="Queue managed by the useToasts() hook; render one <ToastContainer /> per layout."
        variants={['primary', 'success', 'danger', 'warning', 'info']}
        code={`const { toasts, push, dismiss } = useToasts();\n\n<ToastContainer toasts={toasts} onDismiss={dismiss} position="top-end" />\n\npush({ variant: 'success', title: 'Saved', message: 'Record updated.' });`}
      >
        <div className="d-flex flex-wrap gap-2">
          {VARIANTS.slice(0, 5).map((variant) => (
            <Button key={variant} variant={variant} size="sm"
              onClick={() => push({ variant, title: `${variant} toast`, message: 'This is a generic notification message.' })}>
              Show {variant}
            </Button>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Loading States"
        description="Spinners and shimmer skeletons."
        variants={['spinner', 'grow', 'skeleton text', 'skeleton block', 'skeleton circle']}
        code={`<Spinner size="lg" label="Loading records…" center />\n\n<Skeleton lines={3} />\n<Skeleton variant="circle" width={48} height={48} />\n<Skeleton variant="block" height={120} />`}
      >
        <div className="row g-3">
          <div className="col-md-4">
            <Card className="mb-0 h-100" title="Spinners">
              <div className="d-flex align-items-center gap-3">
                <Spinner size="sm" />
                <Spinner />
                <Spinner size="lg" variant="secondary" />
                <Spinner grow variant="info" />
              </div>
              <hr />
              <Spinner center label="Loading records…" />
            </Card>
          </div>
          <div className="col-md-8">
            <Card className="mb-0 h-100" title="Skeletons">
              <div className="d-flex gap-3 mb-3">
                <Skeleton variant="circle" width={48} height={48} />
                <div className="flex-grow-1"><Skeleton lines={2} /></div>
              </div>
              <Skeleton variant="block" height={110} className="mb-3" />
              <Skeleton lines={3} />
            </Card>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Empty & Error States"
        description="Placeholders for no data and for failures."
        variants={['empty', 'empty with action', 'error']}
        code={`<EmptyState icon="inbox" title="No records yet"\n  description="Create the first entry."\n  action={{ label: 'Add Record', icon: 'plus-lg', onClick: fn }} />\n\n<ErrorState code={500} onRetry={fn} />`}
        muted
      >
        <div className="row g-3">
          <div className="col-md-6">
            <Card className="mb-0"><EmptyState icon="inbox" title="No records yet" description="Create the first entry to get started." action={{ label: 'Add Record', icon: 'plus-lg' }} /></Card>
          </div>
          <div className="col-md-6">
            <Card className="mb-0"><ErrorState code={500} onRetry={() => {}} /></Card>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Alert tones"
        description="Solid, soft and outline — plus a full-width banner and action buttons."
        variants={['solid', 'soft', 'outline', 'banner', 'with actions']}
        code={`<Alert variant="danger" tone="solid" title="Failed" />\n<Alert variant="info" tone="outline" title="Heads up" />\n<Alert variant="warning" banner actions={<Button size="sm">Review</Button>} />`}
      >
        {Alert.TONES.map((tone) => (
          <Alert key={tone} variant={tone === 'solid' ? 'primary' : tone === 'outline' ? 'info' : 'success'} tone={tone} title={`${tone} alert`}>
            The same component in the {tone} tone.
          </Alert>
        ))}
        <Alert variant="warning" tone="soft" title="With actions" actions={<><Button size="sm" variant="warning">Review</Button><Button size="sm" tone="ghost" variant="warning">Dismiss</Button></>}>
          Three records need attention before the export can run.
        </Alert>
      </ShowcaseSection>

      <ShowcaseSection
        title="Progress, rings & status dots"
        description="Linear bars, circular gauges and pulsing status indicators."
        variants={['bar', 'sm/md/lg', 'ring', 'gauge', 'status dot']}
        code={`<Progress value={64} showLabel label="Storage" />\n<CircularProgress value={72} label="Uptime" />\n<StatusDot variant="success" pulse label="Online" />`}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <Card className="mb-0 h-100" title="Progress">
              <Progress className="mb-3" size="sm" value={28} variant="danger" showLabel label="Small" />
              <Progress className="mb-3" value={64} showLabel label="Default" />
              <Progress className="mb-3" size="lg" value={86} variant="success" showLabel label="Large" striped />
            </Card>
          </div>
          <div className="col-md-6">
            <Card className="mb-0 h-100" title="Rings & status">
              <div className="d-flex align-items-center gap-4 flex-wrap">
                <CircularProgress value={72} label="Uptime" />
                <CircularProgress value={38} variant="warning" size={78} thickness={7} label="Quota" />
                <div className="d-flex flex-column gap-2">
                  <StatusDot variant="success" pulse label="Online" />
                  <StatusDot variant="warning" label="Degraded" />
                  <StatusDot variant="danger" label="Offline" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Skeleton presets"
        description="Ready-made loading shapes — no hand-assembling placeholders."
        variants={SkeletonPreset.PRESETS}
        code={`<SkeletonPreset preset="table" rows={5} />\n<SkeletonPreset preset="stats" />\n<SkeletonPreset preset="profile" />`}
        muted
      >
        <div className="row g-3">
          <div className="col-lg-6"><SkeletonPreset preset="table" rows={3} /></div>
          <div className="col-lg-3"><SkeletonPreset preset="profile" /></div>
          <div className="col-lg-3"><SkeletonPreset preset="chart" /></div>
          <div className="col-12"><SkeletonPreset preset="stats" /></div>
        </div>
      </ShowcaseSection>

    </ContentWrapper>
  );
}
