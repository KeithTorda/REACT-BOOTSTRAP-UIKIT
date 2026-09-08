import { useCallback, useState } from 'react';

/** Boolean state with open/close/toggle helpers. */
export default function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const open = useCallback(() => setValue(true), []);
  const close = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return { value, setValue, open, close, toggle };
}
