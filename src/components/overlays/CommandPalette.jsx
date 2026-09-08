import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * ⌘K / Ctrl+K quick launcher.
 * <CommandPalette commands={[{ label:'Go to Records', icon:'table', group:'Navigate', onRun: fn }]} />
 * Controlled via `open`/`onOpenChange`, or let it manage its own shortcut.
 */
export default function CommandPalette({
  commands = [], open: controlledOpen, onOpenChange, placeholder = 'Type a command or search…', hotkey = 'k',
}) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const open = controlledOpen ?? uncontrolled;
  const setOpen = (next) => { setUncontrolled(next); onOpenChange?.(next); };
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === hotkey) {
        event.preventDefault();
        setOpen(!open);
      }
      if (event.key === 'Escape' && open) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return commands.filter((c) => !q || `${c.label} ${c.group || ''} ${c.keywords || ''}`.toLowerCase().includes(q));
  }, [commands, query]);

  const groups = useMemo(() => {
    const map = new Map();
    matches.forEach((command) => {
      const group = command.group || 'Commands';
      if (!map.has(group)) map.set(group, []);
      map.get(group).push(command);
    });
    return [...map.entries()];
  }, [matches]);

  if (!open) return null;

  const run = (command) => { setOpen(false); setQuery(''); command.onRun?.(command); };
  let flatIndex = -1;

  return createPortal(
    <div className="uikit-modal" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="uikit-backdrop" onClick={() => setOpen(false)} />
      <div className="uikit-modal__dialog uikit-modal__dialog--lg" style={{ marginTop: '12vh', maxWidth: 620 }}>
        <div className="uikit-modal__content overflow-hidden">
          <div className="d-flex align-items-center gap-2 px-3 py-3 border-bottom">
            <i className="bi bi-search text-secondary-soft" />
            <input
              autoFocus
              className="border-0 flex-grow-1 bg-transparent"
              style={{ outline: 'none', color: 'inherit', fontSize: '.9375rem' }}
              placeholder={placeholder}
              value={query}
              onChange={(event) => { setQuery(event.target.value); setCursor(0); }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') { event.preventDefault(); setCursor((c) => Math.min(c + 1, matches.length - 1)); }
                if (event.key === 'ArrowUp') { event.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
                if (event.key === 'Enter' && matches[cursor]) run(matches[cursor]);
              }}
            />
            <kbd className="uikit-kbd">esc</kbd>
          </div>

          <div className="uikit-scroll-y p-2" style={{ maxHeight: 380 }}>
            {matches.length === 0 && <div className="text-center text-secondary-soft py-4 small">No commands found</div>}
            {groups.map(([group, list]) => (
              <div key={group}>
                <div className="uikit-dropdown__header">{group}</div>
                {list.map((command) => {
                  flatIndex += 1;
                  const index = flatIndex;
                  return (
                    <button
                      key={command.label}
                      type="button"
                      className={cn('uikit-dropdown__item', index === cursor && 'is-active-command')}
                      onMouseEnter={() => setCursor(index)}
                      onClick={() => run(command)}
                    >
                      {command.icon && <i className={`bi bi-${command.icon}`} />}
                      <span className="flex-grow-1">{command.label}</span>
                      {command.shortcut && <kbd className="uikit-kbd">{command.shortcut}</kbd>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

CommandPalette.propTypes = {
  commands: PropTypes.array, open: PropTypes.bool, onOpenChange: PropTypes.func,
  placeholder: PropTypes.string, hotkey: PropTypes.string,
};
