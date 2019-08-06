import React from 'react';
import { animated, useSpring, interpolate } from 'react-spring/three';

import { useLayout } from 'hooks';
import { Plane } from 'assets';

const AnimatedPlane = animated(Plane);

type Props = {
  color: string | number;
};

const AnimatedFill: React.FC<Props> = ({ children, color }) => {
  const { width, height } = useLayout();

  const { position, ...props } = useSpring({
    width,
    height,
    color
  });

  return (
    <AnimatedPlane
      meshProps={interpolate([props.width, props.height], (w, h) => ({
        position: [w / 2, h / 2, 0]
      }))}
      {...props}
    >
      {children}
    </AnimatedPlane>
  );
};

export default AnimatedFill;
