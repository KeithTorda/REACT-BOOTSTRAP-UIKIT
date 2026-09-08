import { ContentWrapper } from '@kit/components/layout';
import { ShowcaseSection } from '@kit/components/docs';
import { Button, IconButton, ActionButton, ButtonGroup } from '@kit/components/buttons';
import { SplitButton, ToggleGroup, Fab, CopyButton, SocialButton } from '@kit/components/buttons';

const VARIANTS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

export default function ButtonShowcase() {
  return (
    <ContentWrapper
      title="Buttons"
      subtitle="Button, IconButton, ActionButton and ButtonGroup"
      breadcrumb={[{ label: 'Components', path: '/components' }, { label: 'Buttons' }]}
    >
      <ShowcaseSection
        title="Button"
        description="The base button — every other button composes it."
        variants={VARIANTS}
        code={`<Button variant="primary" icon="plus" onClick={handleAdd}>\n  Add Record\n</Button>`}
        props={[
          { name: 'variant', type: 'string', default: "'primary'", description: 'Any Bootstrap contextual colour.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control size.' },
          { name: 'icon', type: 'string', description: 'Bootstrap Icons name, without the `bi-` prefix.' },
          { name: 'iconPosition', type: "'start' | 'end'", default: "'start'", description: 'Where the icon sits.' },
          { name: 'outline', type: 'bool', default: 'false', description: 'Render the outline style.' },
          { name: 'block', type: 'bool', default: 'false', description: 'Full width.' },
          { name: 'loading', type: 'bool', default: 'false', description: 'Shows a spinner and disables the button.' },
        ]}
      >
        <div className="d-flex flex-wrap gap-2 mb-3">
          {VARIANTS.map((variant) => <Button key={variant} variant={variant}>{variant}</Button>)}
        </div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {VARIANTS.slice(0, 6).map((variant) => <Button key={variant} variant={variant} outline>{variant}</Button>)}
        </div>
        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
          <Button size="sm" icon="plus-lg">Small</Button>
          <Button icon="plus-lg">Medium</Button>
          <Button size="lg" icon="plus-lg">Large</Button>
          <Button rounded icon="stars">Rounded</Button>
          <Button icon="arrow-right" iconPosition="end">Icon end</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
        <Button block variant="secondary" icon="check2">Block button</Button>
      </ShowcaseSection>

      <ShowcaseSection
        title="IconButton"
        description="Icon-only button for table rows and toolbars."
        variants={['circle', 'square', 'sm/md/lg']}
        code={`<IconButton icon="pencil" variant="info" label="Edit" onClick={fn} />`}
      >
        <div className="d-flex flex-wrap align-items-center gap-2">
          {['pencil', 'trash3', 'eye', 'download', 'three-dots-vertical'].map((icon) => (
            <IconButton key={icon} icon={icon} label={icon} />
          ))}
          <IconButton icon="pencil" variant="info" label="Edit" />
          <IconButton icon="trash3" variant="danger" label="Delete" />
          <IconButton icon="check2" variant="success" label="Approve" />
          <IconButton icon="gear" variant="primary" outline label="Settings" circle={false} />
          <IconButton icon="plus" size="lg" variant="primary" label="Add" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="ActionButton"
        description="Preset icon + colour + label for common admin actions."
        variants={ActionButton.ACTIONS}
        code={`<ActionButton action="delete" onClick={fn} />`}
      >
        <div className="d-flex flex-wrap gap-2">
          {ActionButton.ACTIONS.map((action) => <ActionButton key={action} action={action} />)}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="ButtonGroup"
        description="Segmented and toolbar groupings."
        variants={['horizontal', 'vertical', 'sizes']}
        code={`<ButtonGroup>\n  <Button variant="light">Day</Button>\n  <Button variant="primary">Week</Button>\n  <Button variant="light">Month</Button>\n</ButtonGroup>`}
      >
        <div className="d-flex flex-wrap gap-3 align-items-start">
          <ButtonGroup>
            <Button variant="light">Day</Button>
            <Button variant="primary">Week</Button>
            <Button variant="light">Month</Button>
          </ButtonGroup>
          <ButtonGroup size="sm">
            <Button variant="light" icon="list" />
            <Button variant="light" icon="grid" />
            <Button variant="light" icon="columns" />
          </ButtonGroup>
          <ButtonGroup vertical>
            <Button variant="light" icon="arrow-up">Up</Button>
            <Button variant="light" icon="arrow-down">Down</Button>
          </ButtonGroup>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Button tones"
        description="One component, six tones — combine with any variant, size and shape."
        variants={Button.TONES}
        code={`<Button variant="primary" tone="soft">Soft</Button>\n<Button variant="danger" tone="ghost">Ghost</Button>\n<Button tone="gradient">Gradient</Button>`}
      >
        {Button.TONES.map((tone) => (
          <div className="d-flex flex-wrap gap-2 mb-2 align-items-center" key={tone}>
            <span className="uikit-helper mt-0" style={{ width: 74 }}>{tone}</span>
            {['primary', 'secondary', 'success', 'danger', 'warning', 'info'].map((variant) => (
              <Button key={variant} variant={variant} tone={tone}>{variant}</Button>
            ))}
          </div>
        ))}
      </ShowcaseSection>

      <ShowcaseSection
        title="Sizes & shapes"
        description="Five sizes, three shapes."
        variants={[...Button.SIZES, ...Button.SHAPES]}
        code={`<Button size="xs" />  <Button size="xl" />\n<Button shape="pill" />  <Button shape="square" />`}
      >
        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
          {Button.SIZES.map((size) => <Button key={size} size={size} icon="plus-lg">{size}</Button>)}
        </div>
        <div className="d-flex flex-wrap align-items-center gap-2">
          {Button.SHAPES.map((shape) => <Button key={shape} shape={shape} tone="soft" icon="stars">{shape}</Button>)}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="SplitButton, ToggleGroup, Fab & CopyButton"
        description="Composite buttons for toolbars and quick actions."
        variants={['split', 'toggle group', 'fab', 'copy']}
        code={`<SplitButton label="Save" items={[{ label: 'Save & new' }]} />\n<ToggleGroup options={['Day','Week','Month']} onChange={fn} />\n<Fab icon="plus-lg" inline />\n<CopyButton value="REF-000482" />`}
      >
        <div className="d-flex flex-wrap align-items-center gap-3">
          <SplitButton label="Save" icon="check2" items={[{ label: 'Save & new', icon: 'plus-lg' }, { label: 'Save as draft', icon: 'file-earmark' }, { divider: true }, { label: 'Discard', icon: 'x-lg', danger: true }]} />
          <ToggleGroup options={['Day', 'Week', 'Month']} />
          <ToggleGroup options={[{ value: 'grid', label: 'Grid', icon: 'grid-3x3-gap' }, { value: 'list', label: 'List', icon: 'list-ul' }]} />
          <Fab icon="plus-lg" inline label="Add" />
          <CopyButton value="REF-000482" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="SocialButton"
        description="Branded sign-in buttons for auth screens."
        variants={SocialButton.BRANDS}
        code={`<SocialButton brand="google" block />\n<SocialButton brand="github" filled />`}
      >
        <div className="row g-2">
          {SocialButton.BRANDS.map((brand) => (
            <div className="col-md-6 col-xl-4" key={brand}><SocialButton brand={brand} block /></div>
          ))}
        </div>
      </ShowcaseSection>

    </ContentWrapper>
  );
}
