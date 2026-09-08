import { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Button from '../buttons/Button';
import { cn } from '../../utils/cn';

/**
 * Nested comments with inline reply boxes.
 * comments: [{ id, author, avatar, text, time, replies: [...] }]
 */
export default function CommentThread({ comments = [], onReply, depth = 0, className }) {
  return (
    <div className={cn(depth > 0 && 'uikit-comment__children', className)}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onReply={onReply} depth={depth} />
      ))}
    </div>
  );
}

function Comment({ comment, onReply, depth }) {
  const [replying, setReplying] = useState(false);
  const [draft, setDraft] = useState('');

  return (
    <div className="uikit-comment">
      <div className="d-flex gap-3">
        <Avatar name={comment.author} src={comment.avatar} size={36} />
        <div className="flex-grow-1">
          <div className="d-flex align-items-baseline gap-2">
            <span className="fw-semibold" style={{ fontSize: '.8125rem' }}>{comment.author}</span>
            <span className="uikit-helper mt-0">{comment.time}</span>
          </div>
          <p className="mb-1 mt-1" style={{ fontSize: '.8125rem' }}>{comment.text}</p>
          {onReply && (
            <button type="button" className="btn btn-link btn-sm p-0" onClick={() => setReplying((v) => !v)}>
              <i className="bi bi-reply me-1" />Reply
            </button>
          )}

          {replying && (
            <div className="d-flex gap-2 mt-2">
              <input className="form-control form-control-sm" placeholder="Write a reply…" value={draft} onChange={(event) => setDraft(event.target.value)} />
              <Button size="sm" onClick={() => { onReply?.(comment, draft); setDraft(''); setReplying(false); }}>Send</Button>
            </div>
          )}

          {comment.replies?.length > 0 && (
            <CommentThread comments={comment.replies} onReply={onReply} depth={depth + 1} />
          )}
        </div>
      </div>
    </div>
  );
}

CommentThread.propTypes = { comments: PropTypes.array, onReply: PropTypes.func, depth: PropTypes.number, className: PropTypes.string };
Comment.propTypes = { comment: PropTypes.object, onReply: PropTypes.func, depth: PropTypes.number };
