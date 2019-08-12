import React from 'react';

import { useLayout } from 'hooks';
import { Plane } from 'assets';
import { Targetable } from 'types';

type Props = Targetable<{
  color: string | number;
}>;

const AnimatedFill: React.FC<Props> = ({ children, color, innerRef }) => {
  const { width, height } = useLayout();

  const meshProps = React.useMemo(
    () => ({
      position: [width / 2, height / 2, 0]
    }),
    [width, height]
  );

  return (
    <Plane
      color={color}
      width={width}
      height={height}
      meshProps={meshProps}
      innerRef={innerRef}
    >
      {children}
    </Plane>
  );
};

export default AnimatedFill;
