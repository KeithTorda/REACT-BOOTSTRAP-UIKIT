import PropTypes from 'prop-types';

/** Small props reference table for the documentation pages. */
export default function PropsTable({ rows = [] }) {
  if (!rows.length) return null;
  return (
    <div className="table-responsive mt-3">
      <table className="table uikit-table uikit-prop-table">
        <thead>
          <tr><th style={{ width: 160 }}>Prop</th><th style={{ width: 200 }}>Type</th><th style={{ width: 120 }}>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td><code>{row.name}</code></td>
              <td className="text-secondary-soft">{row.type}</td>
              <td className="text-secondary-soft">{row.default ?? '—'}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

PropsTable.propTypes = { rows: PropTypes.arrayOf(PropTypes.object) };
