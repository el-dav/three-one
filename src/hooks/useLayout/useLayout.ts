import React from 'react';

import { useStableCallback } from 'hooks';
import { getYogaNode } from 'utils';

const useLayout = func => {
  const ref = React.useRef();

  const layout = useStableCallback(ev => {
    func(ev);
  });

  React.useEffect(() => {
    const yogaParent = getYogaNode(ref.current);
    if (!yogaParent) return;
    yogaParent.addEventListener('layout', layout);
    return () => {
      if (yogaParent) {
        yogaParent.removeEventListener('layout', layout);
      }
    };
  }, [layout]);

  return ref;
};

export default useLayout;
