import React from 'react';

// A callback that always closes over the latest data but keeps the same
// identity and will not be called after component unmounts

const useStableCallback = (callback: (...args: any) => any) => {
  const callbackRef = React.useRef<(...args: any) => any>();
  const memoCallback = React.useCallback(
    (...args) => callbackRef.current && callbackRef.current(...args),
    []
  );
  React.useEffect(() => {
    callbackRef.current = callback;
    return () => (callbackRef.current = undefined);
  });
  return memoCallback;
};

export default useStableCallback;
