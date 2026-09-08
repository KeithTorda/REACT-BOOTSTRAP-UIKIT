import { useMemo, useState } from 'react';
import { getValue } from '../utils/format';

/**
 * Client-side search + sort + pagination for an array of rows.
 * Powers <DataTable /> but is usable on its own.
 */
export default function useTableData(rows = [], columns = [], options = {}) {
  const { pageSize: initialPageSize = 10, searchableKeys } = options;

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ key: null, direction: 'asc' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const keys = useMemo(
    () => searchableKeys || columns.filter((c) => c.searchable !== false).map((c) => c.key),
    [searchableKeys, columns]
  );

  const filtered = useMemo(() => {
    let result = rows;

    const activeFilters = Object.entries(filters).filter(([, v]) => v !== '' && v != null);
    if (activeFilters.length) {
      result = result.filter((row) =>
        activeFilters.every(([key, value]) => String(getValue(row, key) ?? '') === String(value))
      );
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((row) =>
        keys.some((key) => String(getValue(row, key) ?? '').toLowerCase().includes(q))
      );
    }

    if (sort.key) {
      const dir = sort.direction === 'desc' ? -1 : 1;
      result = [...result].sort((a, b) => {
        const av = getValue(a, sort.key);
        const bv = getValue(b, sort.key);
        if (av == null) return 1;
        if (bv == null) return -1;
        if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
        return String(av).localeCompare(String(bv), undefined, { numeric: true }) * dir;
      });
    }

    return result;
  }, [rows, filters, query, keys, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = useMemo(
    () => filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filtered, currentPage, pageSize]
  );

  const toggleSort = (key) =>
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );

  const setFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const search = (value) => {
    setQuery(value);
    setPage(1);
  };

  return {
    query, search,
    filters, setFilter, setFilters,
    sort, toggleSort,
    page: currentPage, setPage,
    pageSize, setPageSize,
    totalPages, total: filtered.length,
    rows: paged, allFilteredRows: filtered,
  };
}
