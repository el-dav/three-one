import React from 'react';
import { Node as YogaNodeType, default as yogaType } from 'yoga-layout';
import { Node as NodePrebuilt } from 'yoga-layout-prebuilt';
import { useRender } from 'react-three-fiber';

import {
  LayoutContext,
  Layout,
  defaultLayout,
  LayoutContextType
} from 'viewAssets';
import { areEqualShallow } from 'utils';
import { LayoutProperties } from 'types';

import { setProperties } from './setProperties';

const Node = NodePrebuilt as typeof YogaNodeType;

const useView = (layoutProps?: LayoutProperties) => {
  const { parentNode, parentLayout, zIndex } = React.useContext(LayoutContext);
  const ref = React.useRef<yogaType.YogaNode>(Node.create());
  const [layout, setLayout] = React.useState<Layout>(defaultLayout);
  const node = ref.current;

  useRender(
    () => {
      if (!parentNode) {
        node.calculateLayout();
      }

      const newLayout = node.getComputedLayout();

      if (!areEqualShallow(layout, newLayout)) {
        setLayout(newLayout);
      }
    },
    false,
    [layout, node]
  );

  React.useEffect(() => {
    if (parentNode && !node.getParent()) {
      parentNode.insertChild(node, parentNode.getChildCount());
    }

    return () => {
      if (parentNode) {
        parentNode.removeChild(node);
      }
    };
  }, [parentNode, node]);

  React.useEffect(() => {
    setProperties(node, layoutProps);
  }, [layoutProps, node]);

  const threeLayout = React.useMemo(() => {
    return {
      bottom:
        (parentNode ? parentLayout.height - layout.height - layout.top : 0) ||
        0,
      left: layout.left || 0,
      width: layout.width || 0,
      height: layout.height || 0,
      zIndex
    };
  }, [layout, parentLayout, parentNode, zIndex]);

  const providerValue = React.useMemo(() => {
    const newProviderValue: LayoutContextType = {
      parentNode: node,
      parentLayout: threeLayout,
      zIndex: zIndex + 1
    };
    return newProviderValue;
  }, [node, zIndex, threeLayout]);

  return {
    layout: threeLayout,
    providerValue,
    parentNode
  };
};

export default useView;
