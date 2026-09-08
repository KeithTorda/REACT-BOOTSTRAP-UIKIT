import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import IconButton from '../buttons/IconButton';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const toKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

function buildMatrix(year, month) {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  return Array.from({ length: 6 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const date = new Date(start);
      date.setDate(start.getDate() + week * 7 + day);
      return date;
    })
  );
}

/**
 * Month calendar built with React state only (no plugin).
 * <CalendarWidget events={{ '2026-09-12': 2 }} onSelect={date => …} />
 */
export default function CalendarWidget({ value, events = {}, onSelect, onMonthChange, className }) {
  const initial = value ? new Date(value) : new Date();
  const [cursor, setCursor] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));
  const [selected, setSelected] = useState(value ? toKey(new Date(value)) : null);

  const matrix = useMemo(() => buildMatrix(cursor.getFullYear(), cursor.getMonth()), [cursor]);
  const todayKey = toKey(new Date());

  const shift = (delta) => {
    const next = new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1);
    setCursor(next);
    onMonthChange?.(next);
  };

  return (
    <div className={cn('uikit-calendar', className)}>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <IconButton icon="chevron-left" size="sm" variant="light" label="Previous month" onClick={() => shift(-1)} />
        <strong style={{ fontSize: '.875rem' }}>{MONTHS[cursor.getMonth()]} {cursor.getFullYear()}</strong>
        <IconButton icon="chevron-right" size="sm" variant="light" label="Next month" onClick={() => shift(1)} />
      </div>
      <table>
        <thead>
          <tr>{WEEKDAYS.map((day) => <th key={day}>{day}</th>)}</tr>
        </thead>
        <tbody>
          {matrix.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((date) => {
                const key = toKey(date);
                return (
                  <td key={key}>
                    <button
                      type="button"
                      className={cn(
                        'uikit-calendar__day',
                        date.getMonth() !== cursor.getMonth() && 'is-muted',
                        key === todayKey && 'is-today',
                        key === selected && 'is-selected',
                        events[key] && 'has-event'
                      )}
                      onClick={() => { setSelected(key); onSelect?.(date, events[key]); }}
                    >
                      {date.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

CalendarWidget.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  events: PropTypes.object,
  onSelect: PropTypes.func,
  onMonthChange: PropTypes.func,
  className: PropTypes.string,
};
