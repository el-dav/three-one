import React from 'react';
import { useRender } from 'react-three-fiber';
import yoga from 'yoga-layout-prebuilt';

import { areEqualShallow } from 'utils';

type Obj = {
  [key: string]: any;
};

const useRootYogaNode = () => {
  const ref = React.useRef<Obj>();

  useRender(() => {
    if (ref && ref.current) {
      ref.current.yogaNode.calculateLayout(NaN, NaN, yoga.DIRECTION_LTR);

      const dispatch = (parent: Obj | null, obj: Obj) => {
        const newComputed = obj.yogaNode.getComputedLayout();
        if (obj._cachedComputed) {
          if (areEqualShallow(newComputed, obj._cachedComputed)) return;
        }
        obj._cachedComputed = newComputed;

        // Convert to y-up coords
        const newLayout = {
          bottom: parent
            ? parent._cachedComputed.height -
              newComputed.height -
              newComputed.top
            : 0,
          left: newComputed.left,
          width: newComputed.width,
          height: newComputed.height
        };

        obj.dispatchEvent({ type: 'layout', layout: newLayout });
        obj.yogaChildren.forEach((child: Obj) => {
          dispatch(obj, child);
        });
      };

      dispatch(null, ref.current);
    }
  });
  return ref;
};

export default useRootYogaNode;
