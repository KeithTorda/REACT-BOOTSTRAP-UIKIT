import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Badge from '../feedback/Badge';
import EmptyState from '../feedback/EmptyState';
import { cn } from '../../utils/cn';
import { truncate } from '../../utils/format';

/**
 * Inbox-style list.
 * <MessageList items={[{ from, avatar, subject, preview, time, unread }]} onSelect={fn} />
 */
export default function MessageList({ items = [], onSelect, maxHeight, className }) {
  if (!items.length) return <EmptyState icon="chat-left-text" title="No messages" />;

  return (
    <div className={cn('uikit-scroll-y', className)} style={maxHeight ? { maxHeight } : undefined}>
      {items.map((item, index) => (
        <button
          type="button"
          key={item.id || index}
          onClick={() => onSelect?.(item)}
          className="uikit-feed__item w-100 border-0 bg-transparent text-start"
          style={{ borderBottom: '1px solid var(--border-soft)' }}
        >
          <Avatar name={item.from} src={item.avatar} size={38} status={item.status} />
          <div className="flex-grow-1 min-width-0">
            <div className="d-flex justify-content-between gap-2">
              <span className={cn('text-truncate', item.unread ? 'fw-semibold' : '')} style={{ fontSize: '.8125rem' }}>
                {item.from}
              </span>
              <span className="uikit-helper mt-0 text-nowrap">{item.time}</span>
            </div>
            {item.subject && <div className="small text-truncate">{item.subject}</div>}
            {item.preview && <div className="uikit-helper mt-0">{truncate(item.preview, 64)}</div>}
          </div>
          {item.unread && <Badge variant="primary" tone="soft">New</Badge>}
        </button>
      ))}
    </div>
  );
}

MessageList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
