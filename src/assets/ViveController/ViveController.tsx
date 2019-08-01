import React, { FC } from 'react';
import { ViveController as ThreeViveController } from 'three/examples/jsm/vr/ViveController';
import { extend, useRender } from 'react-three-fiber';
import { ReactThreeFiber } from 'react-three-fiber/types/three';

import { Cube } from 'assets';

extend({ ViveController: ThreeViveController });

export enum HAND {
  LEFT = 0,
  RIGHT = 1
}

type Props = ReactThreeFiber.Object3DNode<ThreeViveController> & {
  hand?: HAND;
};

const ViveController: FC<Props> = ({
  hand = HAND.RIGHT,
  children,
  ...rest
}) => {
  const ref = React.useRef<ThreeViveController>();

  useRender(() => {
    if (ref && ref.current) {
      ref.current.update();
    }
  });

  return (
    <group position={[0, 0.7, 0]}>
      <viveController ref={ref} args={[hand]} {...rest}>
        <Cube dimensions={[0.1, 0.1, 0.1]} />
        {children}
      </viveController>
    </group>
  );
};

export default ViveController;
