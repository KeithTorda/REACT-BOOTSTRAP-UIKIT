import { useMemo, useState } from 'react';
import { ContentWrapper } from '@kit/components/layout';
import { Card } from '@kit/components/cards';
import { SearchInput } from '@kit/components/forms';
import { CopyButton } from '@kit/components/buttons';
import { Badge } from '@kit/components/feedback';

const ENTRIES = [
  ['Layout', 'AdminLayout', '<AdminLayout navigation={nav} brand="App" user={user} />', 'sidebar · horizontal · stacked · rail · boxed'],
  ['Layout', 'AuthLayout', '<AuthLayout variant="split" image={url}><LoginCard /></AuthLayout>', 'centered · split · full · minimal'],
  ['Layout', 'Sidebar', '<Sidebar items={navigationData} collapsed={false} />', 'light · dark · floating · gradient · transparent'],
  ['Layout', 'Navbar', '<Navbar user={user} notifications={list} onSearch={fn} />', 'light · dark · transparent'],
  ['Layout', 'PageHeader', '<PageHeader title="Records" breadcrumb={crumbs} actions={<Button/>} />', ''],
  ['Layout', 'ContentWrapper', '<ContentWrapper title="Page" subtitle="…">{children}</ContentWrapper>', ''],
  ['Layout', 'ThemeCustomizer', '<ThemeCustomizer />  // inside AdminLayout by default', ''],
  ['Theme', 'ThemeProvider', '<ThemeProvider defaultSettings={{ mode:"dark", color:"blue" }}>…</ThemeProvider>', ''],
  ['Theme', 'useTheme', 'const { settings, set, isDark, toggleMode } = useTheme();', ''],
  ['Cards', 'Card', '<Card variant="elevated" title="Panel" actions={…} footer={…}>…</Card>', 'bordered · elevated · flat · filled · gradient · accent · glass · overlay'],
  ['Cards', 'StatsCard', '<StatsCard layout="progress" label="Storage" value="68 GB" progress={68} />', 'icon-left · icon-right · icon-top · big · gradient · progress · ring · spark · split'],
  ['Cards', 'ProfileCard', '<ProfileCard name="Jane" role="Lead" stats={[…]} />', ''],
  ['Cards', 'ChartCard', '<ChartCard title="Revenue" height={280}><BarChart …/></ChartCard>', ''],
  ['Cards', 'ActionCard', '<ActionCard icon="folder-plus" title="New" action={{label:"Create"}} />', ''],
  ['Buttons', 'Button', '<Button variant="primary" tone="soft" size="lg" shape="pill" icon="plus">Add</Button>', 'solid · outline · soft · ghost · link · gradient'],
  ['Buttons', 'IconButton', '<IconButton icon="pencil" variant="info" label="Edit" />', ''],
  ['Buttons', 'ActionButton', '<ActionButton action="delete" onClick={fn} />', 'create · edit · delete · view · save · cancel · export · import · print · refresh · filter'],
  ['Buttons', 'SplitButton', '<SplitButton label="Save" items={[{label:"Save & new"}]} />', ''],
  ['Buttons', 'ToggleGroup', '<ToggleGroup options={["Day","Week"]} value={v} onChange={fn} />', ''],
  ['Buttons', 'Fab', '<Fab icon="plus-lg" label="Add" />', ''],
  ['Buttons', 'SocialButton', '<SocialButton brand="google" block />', 'google · facebook · github · microsoft · apple · twitter · linkedin'],
  ['Buttons', 'CopyButton', '<CopyButton value="text to copy" />', ''],
  ['Forms', 'TextInput', '<TextInput label="Name" value={v} onChange={fn} required error="…" />', ''],
  ['Forms', 'TextArea', '<TextArea label="Notes" rows={4} maxLength={280} showCount />', ''],
  ['Forms', 'RichTextArea', '<RichTextArea label="Body" value={html} onChange={setHtml} />', ''],
  ['Forms', 'SelectInput', '<SelectInput label="Role" options={roles} value={v} onChange={fn} />', ''],
  ['Forms', 'MultiSelect', '<MultiSelect label="Tags" options={list} value={arr} onChange={fn} />', ''],
  ['Forms', 'Autocomplete', '<Autocomplete label="City" options={list} value={v} onChange={fn} />', ''],
  ['Forms', 'TagsInput', '<TagsInput label="Tags" value={arr} onChange={fn} />', ''],
  ['Forms', 'PasswordInput', '<PasswordInput label="Password" strength value={v} onChange={fn} />', ''],
  ['Forms', 'OTPInput', '<OTPInput length={6} value={code} onChange={setCode} />', ''],
  ['Forms', 'NumberStepper', '<NumberStepper label="Qty" value={n} onChange={setN} min={1} />', ''],
  ['Forms', 'MaskedInput', '<MaskedInput mask="phone" label="Phone" value={v} onChange={fn} />', 'phone · mobile · date · card · time · zip · currency · pattern'],
  ['Forms', 'RangeSlider', '<RangeSlider label="Radius" value={v} onChange={fn} min={0} max={24} />', ''],
  ['Forms', 'Rating', '<Rating value={4} onChange={fn} />', ''],
  ['Forms', 'ColorPicker', '<ColorPicker label="Brand" value={hex} onChange={fn} />', ''],
  ['Forms', 'DateInput', '<DateInput label="Start" mode="date" value={v} onChange={fn} />', 'date · time · datetime · month · week'],
  ['Forms', 'DateRangePicker', '<DateRangePicker label="Period" value={range} onChange={setRange} />', ''],
  ['Forms', 'FileUpload', '<FileUpload label="Files" multiple accept="image/*" onChange={fn} />', ''],
  ['Forms', 'Checkbox / Switch', '<Checkbox label="Agree" /> · <Switch label="Active" />', ''],
  ['Forms', 'RadioGroup', '<RadioGroup name="plan" options={list} value={v} onChange={fn} inline />', ''],
  ['Forms', 'RepeaterField', '<RepeaterField value={rows} onChange={setRows} renderRow={(row, update) => …} />', ''],
  ['Forms', 'FormCard', '<FormCard title="Details" onSubmit={fn} actions={…}>…</FormCard>', ''],
  ['Forms', 'FormWizard', '<FormWizard steps={steps} onFinish={fn} orientation="vertical" />', ''],
  ['Tables', 'DataTable', '<DataTable columns={cols} data={rows} searchable pagination selectable exportable />', 'default · dense · cards'],
  ['Tables', 'DataTable (advanced)', '<DataTable expandable renderExpanded={fn} stickyHeader columnToggle showTotals editable onCellEdit={fn} />', ''],
  ['Tables', 'DataTable (server)', '<DataTable serverSide total={count} onQueryChange={fetchPage} />', ''],
  ['Tables', 'downloadCsv', 'downloadCsv(rows, columns, "export.csv")', ''],
  ['Feedback', 'Alert', '<Alert variant="success" tone="soft" title="Saved" onClose={fn}>…</Alert>', 'solid · soft · outline · banner'],
  ['Feedback', 'Badge', '<Badge variant="success" tone="soft" dot>Active</Badge>', 'solid · soft · outline'],
  ['Feedback', 'StatusDot', '<StatusDot variant="success" pulse label="Online" />', ''],
  ['Feedback', 'Progress', '<Progress value={64} showLabel label="Storage" />', ''],
  ['Feedback', 'CircularProgress', '<CircularProgress value={72} label="Uptime" />', ''],
  ['Feedback', 'Spinner', '<Spinner size="lg" label="Loading…" center />', ''],
  ['Feedback', 'Skeleton', '<Skeleton lines={3} /> · <SkeletonPreset preset="table" />', 'card · table · list · profile · chart · stats'],
  ['Feedback', 'EmptyState', '<EmptyState icon="inbox" title="No records" action={{label:"Add"}} />', ''],
  ['Feedback', 'ErrorState', '<ErrorState code={500} onRetry={fn} />', ''],
  ['Feedback', 'Toasts', 'const { toasts, push, dismiss } = useToasts(); <ToastContainer toasts={toasts} onDismiss={dismiss} />', 'top-end · top-start · bottom-end'],
  ['Overlays', 'Modal', '<Modal open={open} onClose={fn} title="Edit" size="lg" footer={…}>…</Modal>', 'sm · md · lg · xl · fullscreen'],
  ['Overlays', 'ConfirmModal', '<ConfirmModal open onConfirm={fn} title="Delete?" confirmLabel="Delete" />', ''],
  ['Overlays', 'Drawer', '<Drawer open placement="end" title="Filters" onClose={fn}>…</Drawer>', 'start · end · top · bottom'],
  ['Overlays', 'Dropdown', '<Dropdown label="Actions" items={[{label:"Edit", icon:"pencil"}]} />', ''],
  ['Overlays', 'Tooltip / Popover', '<Tooltip content="Delete"><IconButton/></Tooltip> · <Popover title="Info" content={…}>…</Popover>', ''],
  ['Overlays', 'ContextMenu', '<ContextMenu items={items}><Row/></ContextMenu>', ''],
  ['Overlays', 'CommandPalette', '<CommandPalette commands={commands} />  // ⌘K / Ctrl+K', ''],
  ['Overlays', 'Lightbox', '<Lightbox images={images} open={open} onClose={fn} />', ''],
  ['Navigation', 'Tabs', '<Tabs items={tabs} variant="pills" />', 'underline · pills · boxed · vertical · icons'],
  ['Navigation', 'Accordion', '<Accordion items={items} allowMultiple />', ''],
  ['Navigation', 'Pagination', '<Pagination page={p} totalPages={n} onChange={fn} variant="simple" />', 'numbered · simple · load-more'],
  ['Navigation', 'Stepper', '<Stepper steps={steps} current={i} variant="vertical" />', 'horizontal · vertical · dots · progress'],
  ['Navigation', 'NavMenu', '<NavMenu items={navigationData} horizontal />', ''],
  ['Charts', 'LineChart', '<LineChart labels={labels} datasets={sets} area />', ''],
  ['Charts', 'BarChart', '<BarChart labels={labels} datasets={sets} stacked horizontal />', ''],
  ['Charts', 'PieChart / DoughnutChart', '<DoughnutChart labels={l} data={d} centerValue="1,248" />', ''],
  ['Charts', 'RadarChart / PolarChart', '<RadarChart labels={l} datasets={sets} />', ''],
  ['Charts', 'ScatterChart', '<ScatterChart datasets={sets} bubble />', ''],
  ['Charts', 'Sparkline', '<Sparkline data={[3,5,4,8]} variant="bar" />', ''],
  ['Display', 'Avatar / AvatarGroup', '<Avatar name="Jane" status="online" /> · <AvatarGroup users={list} max={4} />', ''],
  ['Display', 'DetailList', '<DetailList items={[{label:"Ref", value:"REF-01"}]} />', ''],
  ['Display', 'ListGroup', '<ListGroup variant="avatar" items={items} />', 'simple · actions · avatar · checklist'],
  ['Display', 'Timeline', '<Timeline items={items} variant="alternating" />', 'vertical · horizontal · alternating'],
  ['Display', 'ActivityFeed', '<ActivityFeed items={items} maxHeight={300} />', ''],
  ['Display', 'MessageList', '<MessageList items={threads} onSelect={fn} />', ''],
  ['Display', 'KanbanBoard', '<KanbanBoard columns={cols} onChange={setCols} />', ''],
  ['Display', 'FileManager', '<FileManager items={files} view="grid" actions={menu} />', 'grid · list'],
  ['Display', 'ChatPanel', '<ChatPanel messages={msgs} onSend={fn} />', ''],
  ['Display', 'CommentThread', '<CommentThread comments={list} onReply={fn} />', ''],
  ['Display', 'PricingCard', '<PricingCard name="Pro" price="₱1,299" features={list} featured />', ''],
  ['Display', 'Gallery', '<Gallery images={images} columns={4} />', ''],
  ['Display', 'CalendarWidget', '<CalendarWidget events={{ "2026-09-12": 2 }} onSelect={fn} />', ''],
  ['Display', 'InvoiceLayout', '<InvoiceLayout items={lines} taxRate={12} from={…} to={…} />', ''],
  ['Auth', 'LoginCard', '<LoginCard onSubmit={fn} loading={busy} error={errors} />', ''],
  ['Auth', 'RegisterCard / ForgotPasswordCard', '<RegisterCard onSubmit={fn} />', ''],
  ['Auth', 'ResetPasswordCard', '<ResetPasswordCard onSubmit={fn} />', ''],
  ['Auth', 'OTPVerifyCard', '<OTPVerifyCard onSubmit={fn} onResend={fn} length={6} />', ''],
  ['Auth', 'LockScreenCard', '<LockScreenCard user={user} onUnlock={fn} />', ''],
  ['Hooks', 'useToggle', 'const { value, open, close, toggle } = useToggle();', ''],
  ['Hooks', 'useToasts', 'const { toasts, push, dismiss } = useToasts();', ''],
  ['Hooks', 'useMediaQuery', 'const isMobile = useMediaQuery("(max-width: 991.98px)");', ''],
  ['Hooks', 'useClickOutside', 'useClickOutside(ref, () => setOpen(false), open);', ''],
  ['Hooks', 'useTableData', 'const table = useTableData(rows, columns, { pageSize: 10 });', ''],
  ['Utils', 'format', 'formatCurrency(1200, "PHP") · formatDate(d) · formatNumber(n) · initialsOf(name) · truncate(s, 40)', ''],
  ['Utils', 'cn', 'cn("btn", isActive && "active")', ''],
];

export default function Cheatsheet() {
  const [query, setQuery] = useState('');
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? ENTRIES.filter((e) => e.join(' ').toLowerCase().includes(q)) : ENTRIES;
  }, [query]);
  const groups = useMemo(() => [...new Set(shown.map((e) => e[0]))], [shown]);

  return (
    <ContentWrapper
      title="Cheatsheet"
      subtitle="Every component and hook with a one-line usage snippet — Ctrl+F or use the search"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Cheatsheet' }]}
      actions={<SearchInput value={query} onChange={setQuery} onClear={() => setQuery('')} placeholder="Filter…" width={240} />}
    >
      {groups.map((group) => (
        <Card key={group} title={group} className="mb-3">
          {shown.filter((entry) => entry[0] === group).map(([, name, snippet, variants]) => (
            <div className="uikit-cheat-row" key={name}>
              <div className="uikit-cheat-row__name">
                <div className="fw-semibold">{name}</div>
                {variants && (
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {variants.split(' · ').map((variant) => (
                      <Badge key={variant} tone="soft" variant="secondary">{variant}</Badge>
                    ))}
                  </div>
                )}
              </div>
              <code className="uikit-cheat-row__code">{snippet}</code>
              <CopyButton value={snippet} label="" copiedLabel="" size="sm" />
            </div>
          ))}
        </Card>
      ))}
    </ContentWrapper>
  );
}
