import React from 'react';

import { useLayout } from 'hooks';
import { Plane } from 'assets';

type Props = {
  color: string | number;
};

const AnimatedFill: React.FC<Props> = ({ children, color }) => {
  const { width, height } = useLayout();

  const meshProps = React.useMemo(
    () => ({
      position: [width / 2, height / 2, 0]
    }),
    [width, height]
  );

  return (
    <Plane color={color} width={width} height={height} meshProps={meshProps}>
      {children}
    </Plane>
  );
};

export default AnimatedFill;
