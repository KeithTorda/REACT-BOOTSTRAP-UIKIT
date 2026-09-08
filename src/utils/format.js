/** Generic formatting helpers — no domain logic. */

export function formatNumber(value, options = {}) {
  if (value === null || value === undefined || value === '') return '—';
  return new Intl.NumberFormat('en-US', options).format(Number(value));
}

export function formatCurrency(value, currency = 'USD', locale = 'en-US') {
  if (value === null || value === undefined || value === '') return '—';
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(Number(value));
}

export function formatDate(value, options = { year: 'numeric', month: 'short', day: '2-digit' }) {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function initialsOf(name = '') {
  return String(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function truncate(text = '', max = 60) {
  const value = String(text);
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

/** Read a possibly-nested key ("user.email") off an object. */
export function getValue(row, key) {
  if (!key) return undefined;
  return String(key).split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), row);
}
