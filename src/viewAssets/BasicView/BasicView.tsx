import React from 'react';
import { ReactThreeFiber } from 'react-three-fiber/types/three';

import { LayoutProps } from 'types';
import { useLayout } from 'hooks';
import { View } from 'viewAssets';

type ViewGroupProps = ReactThreeFiber.Object3DNode<THREE.Group>;

const ViewGroup: React.FC<ViewGroupProps> = ({ children, props }) => {
  const layout = useLayout();
  const position = [layout.left, layout.bottom, layout.zIndex];

  return (
    <group position={position} {...props}>
      {children}
    </group>
  );
};

type Props = LayoutProps & {
  groupProps: ReactThreeFiber.Object3DNode<THREE.Group>;
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
