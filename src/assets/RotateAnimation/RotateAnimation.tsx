import React from 'react';
import { ReactThreeFiber } from 'react-three-fiber/types/three';
import { useRender } from 'react-three-fiber';

export enum Axis {
  X = 'X',
  Y = 'Y',
  Z = 'Z'
}

type Props = {
  groupProps?: ReactThreeFiber.Object3DNode<THREE.Group>;
  axis?: Axis;
  speed?: number;
  reverse?: boolean;
};

const FRAME_MULTIPLIER = 0.001;

const RotateAnimation: React.FC<Props> = ({
  children,
  speed = 1,
  axis = Axis.X,
  reverse = false,
  ...groupProps
}) => {
  const group = React.useRef<THREE.Group>();
  useRender(
    () => {
      if (group && group.current) {
        const { x, y, z } = group.current.rotation;
        let rotationAmount = speed * FRAME_MULTIPLIER;
        if (reverse) {
          rotationAmount = rotationAmount * -1;
        }

        group.current.rotation.set(
          axis === Axis.X ? x + rotationAmount : x,
          axis === Axis.Y ? y + rotationAmount : y,
          axis === Axis.Z ? z + rotationAmount : z
        );
      }
    },
    false,
    [speed, axis, reverse]
  );

  return (
    <group ref={group} {...groupProps}>
      {children}
    </group>
  );
};

export default RotateAnimation;
