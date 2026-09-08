import { useState } from 'react';
import PropTypes from 'prop-types';
import Badge from '../feedback/Badge';
import AvatarGroup from './AvatarGroup';
import { cn } from '../../utils/cn';

/**
 * Drag-and-drop board (HTML5 DnD — no library).
 *
 * columns: [{ key, title, variant, cards: [{ id, title, description, tags, assignees, due }] }]
 * <KanbanBoard columns={cols} onChange={setCols} onCardClick={fn} />
 */
export default function KanbanBoard({ columns = [], onChange, onCardClick, onAddCard, className }) {
  const [dragging, setDragging] = useState(null);
  const [overColumn, setOverColumn] = useState(null);

  const drop = (targetKey) => {
    setOverColumn(null);
    if (!dragging || dragging.from === targetKey) { setDragging(null); return; }
    const next = columns.map((column) => {
      if (column.key === dragging.from) return { ...column, cards: column.cards.filter((c) => c.id !== dragging.card.id) };
      if (column.key === targetKey) return { ...column, cards: [...column.cards, dragging.card] };
      return column;
    });
    onChange?.(next);
    setDragging(null);
  };

  return (
    <div className={cn('uikit-kanban', className)}>
      {columns.map((column) => (
        <section
          key={column.key}
          className={cn('uikit-kanban__column', overColumn === column.key && 'is-over')}
          onDragOver={(event) => { event.preventDefault(); setOverColumn(column.key); }}
          onDragLeave={() => setOverColumn(null)}
          onDrop={() => drop(column.key)}
        >
          <header className="uikit-kanban__header">
            <span className="uikit-status-dot" style={{ background: `var(--${column.variant || 'primary'})` }} />
            <span className="fw-semibold" style={{ fontSize: '.8125rem' }}>{column.title}</span>
            <Badge tone="soft" variant="light" counter>{column.cards?.length || 0}</Badge>
            {onAddCard && (
              <button type="button" className="btn btn-sm btn-light ms-auto" onClick={() => onAddCard(column)} aria-label={`Add to ${column.title}`}>
                <i className="bi bi-plus-lg" />
              </button>
            )}
          </header>

          <div className="uikit-kanban__cards">
            {(column.cards || []).map((card) => (
              <article
                key={card.id}
                draggable
                onDragStart={() => setDragging({ card, from: column.key })}
                onDragEnd={() => setDragging(null)}
                onClick={() => onCardClick?.(card, column)}
                className={cn('uikit-kanban__card', dragging?.card?.id === card.id && 'is-dragging')}
              >
                {card.tags?.length > 0 && (
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {card.tags.map((tag) => (
                      <Badge key={typeof tag === 'string' ? tag : tag.label} variant={tag.variant || 'primary'} tone="soft">
                        {typeof tag === 'string' ? tag : tag.label}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="fw-semibold" style={{ fontSize: '.8125rem' }}>{card.title}</div>
                {card.description && <p className="uikit-helper mt-1 mb-0">{card.description}</p>}
                <footer className="d-flex align-items-center justify-content-between mt-2">
                  {card.due && (
                    <span className="uikit-helper mt-0"><i className="bi bi-calendar3 me-1" />{card.due}</span>
                  )}
                  {card.assignees?.length > 0 && <AvatarGroup users={card.assignees} size={24} max={3} />}
                </footer>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

KanbanBoard.propTypes = {
  columns: PropTypes.array, onChange: PropTypes.func,
  onCardClick: PropTypes.func, onAddCard: PropTypes.func, className: PropTypes.string,
};
