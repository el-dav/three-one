import React from 'react';
import { ReactThreeFiber } from 'react-three-fiber/types/three';
import { animated, useSpring } from 'react-spring/three';

import { LayoutProperties } from 'types';
import { useLayout } from 'hooks';
import { View } from 'viewAssets';

type ViewGroupProps = ReactThreeFiber.Object3DNode<THREE.Group>;

const ViewGroup: React.FC<ViewGroupProps> = ({ children, props }) => {
  const layout = useLayout();

  const { position } = useSpring({
    position: [layout.left, layout.bottom, layout.zIndex]
  });

  return (
    <animated.group position={position} {...props}>
      {children}
    </animated.group>
  );
};

type Props = LayoutProperties & {
  groupProps?: ReactThreeFiber.Object3DNode<THREE.Group>;
};

const BasicView: React.FC<Props> = ({
  children,
  groupProps,
  ...layoutProps
}) => {
  return (
    <View {...layoutProps}>
      <ViewGroup {...groupProps}>{children}</ViewGroup>
    </View>
  );
};

export default BasicView;
