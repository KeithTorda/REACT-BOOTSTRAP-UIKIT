import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { cn } from '../../utils/cn';

/**
 * Message thread + composer.
 * messages: [{ id, author, avatar, text, time, own }]
 */
export default function ChatPanel({
  messages = [], onSend, placeholder = 'Write a message…', height = 420, header, disabled = false, className,
}) {
  const [draft, setDraft] = useState('');
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }); }, [messages.length]);

  const send = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    onSend?.(draft.trim());
    setDraft('');
  };

  return (
    <div className={cn('d-flex flex-column', className)} style={{ height }}>
      {header && <div className="uikit-card__header">{header}</div>}

      <div className="flex-grow-1 uikit-scroll-y p-3 d-flex flex-column gap-3">
        {messages.map((message) => (
          <div key={message.id} className={cn('d-flex gap-2', message.own && 'flex-row-reverse')}>
            <Avatar name={message.author} src={message.avatar} size={32} />
            <div className={cn('uikit-bubble', message.own && 'uikit-bubble--own')}>
              {!message.own && <div className="fw-semibold mb-1" style={{ fontSize: '.75rem' }}>{message.author}</div>}
              <div style={{ fontSize: '.8125rem' }}>{message.text}</div>
              {message.time && <div className="uikit-bubble__time">{message.time}</div>}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form className="d-flex gap-2 p-3 border-top" onSubmit={send}>
        <input
          className="form-control"
          placeholder={placeholder}
          value={draft}
          disabled={disabled}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={disabled || !draft.trim()} aria-label="Send">
          <i className="bi bi-send" />
        </button>
      </form>
    </div>
  );
}

ChatPanel.propTypes = {
  messages: PropTypes.array, onSend: PropTypes.func, placeholder: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.node, disabled: PropTypes.bool, className: PropTypes.string,
};
