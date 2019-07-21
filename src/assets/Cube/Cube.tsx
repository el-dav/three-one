import React from 'react';

type Props = {
  dimensions?: [number, number, number];
  color?: string | number;
  rotation?: [number, number, number];
};
const Cube: React.FC<Props> = ({
  children,
  dimensions = [1, 1, 1],
  color = 'red',
  rotation = [90, 90, 0]
}) => (
  <mesh rotation={rotation}>
    <boxGeometry attach="geometry" args={dimensions} />
    <meshPhongMaterial attach="material" color={color} />
    {children}
  </mesh>
);

export default Cube;
