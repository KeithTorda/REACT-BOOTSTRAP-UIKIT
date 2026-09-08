import { getValue } from '../../utils/format';

/** Turn rows + columns into a CSV string. */
export function toCsv(rows = [], columns = []) {
  const escape = (cell) => {
    const text = cell === null || cell === undefined ? '' : String(cell);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  const header = columns.map((c) => escape(c.label ?? c.key)).join(',');
  const body = rows.map((row) => columns.map((c) => escape(getValue(row, c.key))).join(','));
  return [header, ...body].join('\n');
}

/** Download rows as a .csv file in the browser. */
export function downloadCsv(rows, columns, filename = 'export.csv') {
  const blob = new Blob([`﻿${toCsv(rows, columns)}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
