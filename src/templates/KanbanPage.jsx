import { useState } from 'react';
import { ContentWrapper } from '../components/layout';
import { KanbanBoard } from '../components/display';
import { Button, ToggleGroup } from '../components/buttons';
import { Modal } from '../components/overlays';
import { TextInput, TextArea, SelectInput } from '../components/forms';
import { kanbanColumns } from '../data/sampleAppData';

/** TEMPLATE — Kanban board with drag-and-drop and an add-card dialog. */
export default function KanbanPage() {
  const [columns, setColumns] = useState(kanbanColumns);
  const [adding, setAdding] = useState(null);
  const [draft, setDraft] = useState({ title: '', description: '' });

  const addCard = () => {
    setColumns((cols) =>
      cols.map((column) =>
        column.key === adding.key
          ? { ...column, cards: [...column.cards, { id: `c${Date.now()}`, ...draft }] }
          : column
      )
    );
    setDraft({ title: '', description: '' });
    setAdding(null);
  };

  return (
    <ContentWrapper
      title="Board"
      subtitle="Drag cards between columns"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Board' }]}
      actions={<><ToggleGroup options={[{ value: 'board', label: 'Board', icon: 'kanban' }, { value: 'list', label: 'List', icon: 'list-ul' }]} /><Button icon="plus-lg" onClick={() => setAdding(columns[0])}>Add card</Button></>}
    >
      <KanbanBoard columns={columns} onChange={setColumns} onAddCard={setAdding} />

      <Modal
        open={Boolean(adding)}
        onClose={() => setAdding(null)}
        title={`Add card to ${adding?.title || ''}`}
        footer={<><Button variant="light" onClick={() => setAdding(null)}>Cancel</Button><Button onClick={addCard} disabled={!draft.title}>Add card</Button></>}
      >
        <TextInput label="Title" required value={draft.title} onChange={(event) => setDraft((d) => ({ ...d, title: event.target.value }))} />
        <TextArea label="Description" rows={3} value={draft.description} onChange={(event) => setDraft((d) => ({ ...d, description: event.target.value }))} />
        <SelectInput label="Column" options={columns.map((c) => ({ value: c.key, label: c.title }))} value={adding?.key} onChange={(event) => setAdding(columns.find((c) => c.key === event.target.value))} />
      </Modal>
    </ContentWrapper>
  );
}
