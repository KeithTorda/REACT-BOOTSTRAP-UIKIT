/** Generic placeholder records — no domain meaning. Replace per project. */

export const sampleRows = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Administrator', department: 'Operations', status: 'Active', amount: 4200, createdAt: '2026-01-12' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Manager', department: 'Finance', status: 'Active', amount: 3150, createdAt: '2026-01-28' },
  { id: 3, name: 'Alex Morgan', email: 'alex.morgan@example.com', role: 'Editor', department: 'Marketing', status: 'Pending', amount: 1890, createdAt: '2026-02-04' },
  { id: 4, name: 'Maria Cruz', email: 'maria.cruz@example.com', role: 'Viewer', department: 'Support', status: 'Inactive', amount: 760, createdAt: '2026-02-15' },
  { id: 5, name: 'Daniel Reyes', email: 'daniel.reyes@example.com', role: 'Manager', department: 'Operations', status: 'Active', amount: 5320, createdAt: '2026-02-21' },
  { id: 6, name: 'Priya Nair', email: 'priya.nair@example.com', role: 'Editor', department: 'Marketing', status: 'Active', amount: 2440, createdAt: '2026-03-02' },
  { id: 7, name: 'Tom Baker', email: 'tom.baker@example.com', role: 'Viewer', department: 'Finance', status: 'Pending', amount: 980, createdAt: '2026-03-11' },
  { id: 8, name: 'Grace Lim', email: 'grace.lim@example.com', role: 'Administrator', department: 'Support', status: 'Active', amount: 6110, createdAt: '2026-03-19' },
  { id: 9, name: 'Oscar Diaz', email: 'oscar.diaz@example.com', role: 'Editor', department: 'Operations', status: 'Inactive', amount: 1370, createdAt: '2026-04-01' },
  { id: 10, name: 'Hana Sato', email: 'hana.sato@example.com', role: 'Manager', department: 'Marketing', status: 'Active', amount: 4890, createdAt: '2026-04-09' },
  { id: 11, name: 'Luis Fernandez', email: 'luis.fernandez@example.com', role: 'Viewer', department: 'Finance', status: 'Active', amount: 2010, createdAt: '2026-04-18' },
  { id: 12, name: 'Amina Yusuf', email: 'amina.yusuf@example.com', role: 'Editor', department: 'Support', status: 'Pending', amount: 1620, createdAt: '2026-04-27' },
  { id: 13, name: 'Peter Novak', email: 'peter.novak@example.com', role: 'Administrator', department: 'Operations', status: 'Active', amount: 7250, createdAt: '2026-05-06' },
  { id: 14, name: 'Sofia Rossi', email: 'sofia.rossi@example.com', role: 'Manager', department: 'Marketing', status: 'Inactive', amount: 3300, createdAt: '2026-05-14' },
  { id: 15, name: 'Kevin Tan', email: 'kevin.tan@example.com', role: 'Viewer', department: 'Finance', status: 'Active', amount: 1150, createdAt: '2026-05-23' },
];

export const statusOptions = ['Active', 'Pending', 'Inactive'];
export const roleOptions = ['Administrator', 'Manager', 'Editor', 'Viewer'];
export const departmentOptions = ['Operations', 'Finance', 'Marketing', 'Support'];

export const sampleActivity = [
  { user: 'Jane Smith', action: 'created a new record in', target: 'Registry', time: '5 minutes ago', icon: 'plus-circle', variant: 'primary' },
  { user: 'Alex Morgan', action: 'updated', target: 'Item #2481', time: '32 minutes ago', icon: 'pencil-square', variant: 'info' },
  { user: 'John Doe', action: 'approved', target: 'Request #114', time: '2 hours ago', icon: 'check-circle', variant: 'success' },
  { user: 'Maria Cruz', action: 'archived', target: '3 documents', time: 'Yesterday', icon: 'archive', variant: 'warning' },
  { user: 'Daniel Reyes', action: 'deleted', target: 'Draft #77', time: '2 days ago', icon: 'trash3', variant: 'danger' },
];

export const sampleTimeline = [
  { title: 'Record created', description: 'Initial entry submitted by John Doe', time: '09:14', variant: 'primary' },
  { title: 'Reviewed', description: 'Checked by Jane Smith', time: '10:02', variant: 'info' },
  { title: 'Approved', description: 'Signed off by Alex Morgan', time: '11:45', variant: 'success' },
  { title: 'Archived', description: 'Moved to long-term storage', time: '16:20', variant: 'secondary' },
];

export const sampleNotifications = [
  { title: 'New record submitted', description: 'A new entry is waiting for review', time: '3 min ago', icon: 'file-earmark-plus', variant: 'primary' },
  { title: 'Report generated', description: 'Monthly summary is ready', time: '1 hour ago', icon: 'file-bar-graph', variant: 'info' },
  { title: 'Storage almost full', description: '92% of quota used', time: '3 hours ago', icon: 'hdd', variant: 'warning', unread: false },
];

export const sampleMessages = [
  { from: 'Jane Smith', subject: 'Re: Weekly summary', preview: 'Thanks — the numbers look right to me, forwarding to the team now.', time: '10:24', unread: true, status: 'online' },
  { from: 'Alex Morgan', subject: 'Draft attached', preview: 'Left a couple of comments in the second section.', time: 'Yesterday', unread: true, status: 'away' },
  { from: 'John Doe', subject: 'Access request', preview: 'Could you add me to the reporting group?', time: 'Mon', status: 'offline' },
];

export const sampleInvoiceItems = [
  { description: 'Service item A', quantity: 3, price: 250 },
  { description: 'Service item B', quantity: 1, price: 1200 },
  { description: 'Service item C', quantity: 6, price: 85 },
];
