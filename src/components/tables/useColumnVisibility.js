import { useMemo, useState } from 'react';

/** Track which columns are visible; used by DataTable's column-toggle menu. */
export default function useColumnVisibility(columns = []) {
  const [hidden, setHidden] = useState(() => columns.filter((c) => c.hidden).map((c) => c.key));
  const visible = useMemo(() => columns.filter((c) => !hidden.includes(c.key)), [columns, hidden]);
  const toggle = (key) => setHidden((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]));
  return { visible, hidden, toggle, setHidden };
}
