import React, { FC } from 'react';

import { Cube, Line, ControllerContext, Sphere } from 'assets';
import { Hand } from 'types';
import { useController } from 'hooks';

const CUBE_SIZE = 0.1;
const SPHERE_SIZE = 0.05;

type Props = {
  hand?: Hand;
};

const ViveController: FC<Props> = ({ hand = Hand.RIGHT, children }) => {
  const { controller, rayCaster } = useController(hand);
  const { activeTargetList } = React.useContext(ControllerContext);
  const activeTarget = activeTargetList[hand];

  const lineVertices = React.useMemo(() => {
    const distance = activeTarget ? activeTarget.distance : 10;
    return [[0, 0, 0], [0, 0, -distance]] as Array<[number, number, number]>;
  }, [activeTarget]);

  if (controller && rayCaster) {
    return (
      <primitive object={controller}>
        <Cube dimensions={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
        <Line vertices={lineVertices} color="red" />
        {activeTarget && (
          <Sphere
            radius={SPHERE_SIZE}
            color="white"
            meshProps={{
              position: [0, 0, -activeTarget.distance]
            }}
          />
        )}
        {children}
      </primitive>
    );
  }
  return null;
};

export default ViveController;
