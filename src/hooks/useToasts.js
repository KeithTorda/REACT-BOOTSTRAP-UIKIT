import { useCallback, useState } from 'react';

let seed = 0;

/**
 * Toast queue. Pair with <ToastContainer toasts={toasts} onDismiss={dismiss} />.
 * push({ title, message, variant, duration })
 */
export default function useToasts(defaultDuration = 4000) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (toast) => {
      seed += 1;
      const id = `toast-${seed}`;
      const duration = toast.duration ?? defaultDuration;
      setToasts((list) => [...list, { id, variant: 'primary', ...toast }]);
      if (duration > 0) window.setTimeout(() => dismiss(id), duration);
      return id;
    },
    [defaultDuration, dismiss]
  );

  const clear = useCallback(() => setToasts([]), []);

  return { toasts, push, dismiss, clear };
}
