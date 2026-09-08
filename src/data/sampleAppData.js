/** Generic fixtures for the page templates. Swap these for your own API data. */

export const kanbanColumns = [
  {
    key: 'backlog', title: 'Backlog', variant: 'secondary',
    cards: [
      { id: 'c1', title: 'Draft the intake form', description: 'Collect the fields the team asked for', tags: [{ label: 'Design', variant: 'info' }], due: 'Sep 12', assignees: [{ name: 'Jane Smith' }, { name: 'Alex Morgan' }] },
      { id: 'c2', title: 'Define record statuses', tags: [{ label: 'Spec', variant: 'secondary' }], assignees: [{ name: 'John Doe' }] },
    ],
  },
  {
    key: 'progress', title: 'In progress', variant: 'primary',
    cards: [
      { id: 'c3', title: 'Build the list screen', description: 'Search, filters and pagination', tags: [{ label: 'Frontend', variant: 'primary' }], due: 'Sep 15', assignees: [{ name: 'Maria Cruz' }] },
    ],
  },
  {
    key: 'review', title: 'Review', variant: 'warning',
    cards: [
      { id: 'c4', title: 'Check the export format', tags: [{ label: 'QA', variant: 'warning' }], assignees: [{ name: 'Daniel Reyes' }, { name: 'Priya Nair' }] },
    ],
  },
  {
    key: 'done', title: 'Done', variant: 'success',
    cards: [
      { id: 'c5', title: 'Set up the project', tags: [{ label: 'Setup', variant: 'success' }], assignees: [{ name: 'John Doe' }] },
      { id: 'c6', title: 'Agree on the colour theme', assignees: [{ name: 'Jane Smith' }] },
    ],
  },
];

export const files = [
  { id: 'f1', name: 'Reports', type: 'folder', size: '12 items', modified: 'Sep 02, 2026' },
  { id: 'f2', name: 'Archive', type: 'folder', size: '4 items', modified: 'Aug 28, 2026' },
  { id: 'f3', name: 'summary-2026.pdf', type: 'pdf', size: '2.4 MB', modified: 'Sep 05, 2026' },
  { id: 'f4', name: 'records-export.xlsx', type: 'sheet', size: '860 KB', modified: 'Sep 04, 2026' },
  { id: 'f5', name: 'cover-photo.png', type: 'image', size: '1.1 MB', modified: 'Sep 01, 2026' },
  { id: 'f6', name: 'proposal.docx', type: 'doc', size: '340 KB', modified: 'Aug 30, 2026' },
  { id: 'f7', name: 'backup.zip', type: 'zip', size: '18 MB', modified: 'Aug 27, 2026' },
  { id: 'f8', name: 'walkthrough.mp4', type: 'video', size: '54 MB', modified: 'Aug 22, 2026' },
];

export const chatMessages = [
  { id: 'm1', author: 'Jane Smith', text: 'Morning — did the export finish last night?', time: '09:02' },
  { id: 'm2', author: 'You', own: true, text: 'It did. 12,480 rows, no errors.', time: '09:04' },
  { id: 'm3', author: 'Jane Smith', text: 'Perfect. Can you send the summary to the team?', time: '09:05' },
  { id: 'm4', author: 'You', own: true, text: 'Sending it now.', time: '09:06' },
];

export const comments = [
  {
    id: 'k1', author: 'Alex Morgan', time: '2 hours ago',
    text: 'Looks good overall. One thought on the second section — should the totals include cancelled rows?',
    replies: [
      { id: 'k1a', author: 'Jane Smith', time: '1 hour ago', text: 'Good catch. They should be excluded.', replies: [] },
    ],
  },
  { id: 'k2', author: 'John Doe', time: 'Yesterday', text: 'Approved from my side.', replies: [] },
];

export const plans = [
  { name: 'Starter', price: '₱0', period: '/month', description: 'For trying things out', features: ['1 workspace', '2 users', 'Basic reports', { label: 'Priority support', included: false }], action: { label: 'Current plan' } },
  { name: 'Team', price: '₱1,299', period: '/month', description: 'For a working team', features: ['5 workspaces', '25 users', 'Advanced reports', 'Priority support'], featured: true, action: { label: 'Choose Team' } },
  { name: 'Business', price: '₱3,499', period: '/month', description: 'For larger operations', features: ['Unlimited workspaces', 'Unlimited users', 'Custom reports', 'Dedicated support'], action: { label: 'Choose Business' } },
];

export const auditLog = [
  { id: 1, actor: 'Jane Smith', action: 'updated', entity: 'Record #2481', field: 'status', from: 'Pending', to: 'Active', at: '2026-09-08 09:14' },
  { id: 2, actor: 'John Doe', action: 'created', entity: 'Record #2482', field: '—', from: '—', to: '—', at: '2026-09-08 08:52' },
  { id: 3, actor: 'Alex Morgan', action: 'deleted', entity: 'Draft #77', field: '—', from: '—', to: '—', at: '2026-09-07 16:20' },
  { id: 4, actor: 'Maria Cruz', action: 'updated', entity: 'Record #2470', field: 'amount', from: '1,200', to: '1,450', at: '2026-09-07 14:03' },
  { id: 5, actor: 'Daniel Reyes', action: 'exported', entity: '312 records', field: '—', from: '—', to: '—', at: '2026-09-06 11:41' },
];

export const gallery = Array.from({ length: 8 }).map((_, index) => ({
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="hsl(${index * 42}, 70%, 62%)"/><stop offset="100%" stop-color="hsl(${index * 42 + 40}, 70%, 48%)"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><text x="50%" y="52%" text-anchor="middle" font-family="sans-serif" font-size="34" fill="rgba(255,255,255,.85)">Image ${index + 1}</text></svg>`
  )}`,
  alt: `Placeholder image ${index + 1}`,
  caption: `Placeholder image ${index + 1}`,
}));

export const notificationsFeed = [
  { id: 1, title: 'Record approved', description: 'Record #2481 moved to Active', time: '5 min ago', icon: 'check-circle', variant: 'success' },
  { id: 2, title: 'New comment', description: 'Alex Morgan commented on Draft #12', time: '32 min ago', icon: 'chat-dots', variant: 'info' },
  { id: 3, title: 'Export finished', description: '312 records exported to CSV', time: '2 hours ago', icon: 'download', variant: 'primary' },
  { id: 4, title: 'Storage warning', description: 'You are using 92% of your quota', time: 'Yesterday', icon: 'hdd', variant: 'warning' },
];
