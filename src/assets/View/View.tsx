import React, { useEffect } from 'react';
import { useRender } from 'react-three-fiber';
import { ReactThreeFiber } from 'react-three-fiber/types/three';
import { Node as NodePrebuilt } from 'yoga-layout-prebuilt';
import { Node as YogaNodeType, default as yogaType } from 'yoga-layout';
import * as THREE from 'three';

import { areEqualShallow } from 'utils';
import {
  Plane,
  LayoutContext,
  LayoutContextType,
  Layout,
  defaultLayout
} from 'assets';

import { LayoutProperties, setProperties } from './setProperties';

export const SCALE = 1000;
const DEFAULT_SCALE_XYZ = [1, 1, 1];
const ROOT_SCALE_XYZ = [1 / SCALE, 1 / SCALE, 1 / SCALE];

const Node = NodePrebuilt as typeof YogaNodeType;

type Props = {
  groupProps?: ReactThreeFiber.Object3DNode<THREE.Group>;
  layoutProps?: LayoutProperties;
  color: string;
  animated?: boolean;
};

const View: React.FC<Props> = ({
  children,
  layoutProps,
  color,
  groupProps
}) => {
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

  useEffect(() => {
    if (parentNode && !node.getParent()) {
      parentNode.insertChild(node, parentNode.getChildCount());
    }

    return () => {
      if (parentNode) {
        parentNode.removeChild(node);
      }
    };
  }, [parentNode, node]);

  useEffect(() => {
    setProperties(node, layoutProps);
  }, [layoutProps, node]);

  const threeLayout = React.useMemo(() => {
    return {
      bottom:
        (parentNode ? parentLayout.height - layout.height - layout.top : 0) ||
        0,
      left: layout.left || 0,
      width: layout.width || 0,
      height: layout.height || 0
    };
  }, [layout, parentLayout, parentNode]);

  const providerValue = React.useMemo(() => {
    const newProviderValue: LayoutContextType = {
      parentNode: node,
      parentLayout: layout,
      zIndex: zIndex + 1
    };
    return newProviderValue;
  }, [node, layout, zIndex]);

  const position = [threeLayout.left, threeLayout.bottom, zIndex];

  return (
    <LayoutContext.Provider value={providerValue}>
      <group
        scale={parentNode ? DEFAULT_SCALE_XYZ : ROOT_SCALE_XYZ}
        position={position}
        {...groupProps}
      >
        <Plane
          meshProps={{
            position: [threeLayout.width / 2, threeLayout.height / 2, 0]
          }}
          color={color}
          width={layout.width}
          height={layout.height}
        />
        {children}
      </group>
    </LayoutContext.Provider>
  );
};

export default View;
