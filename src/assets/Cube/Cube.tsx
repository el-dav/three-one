import React from 'react';
import { ReactThreeFiber } from 'react-three-fiber/types/three';

type Props = {
  dimensions?: [number, number, number];
  color?: string | number;
  rotation?: [number, number, number];
  meshProps?: ReactThreeFiber.Object3DNode<THREE.Mesh>;
  boxGeometryProps?: ReactThreeFiber.GeometryNode<THREE.BoxGeometry>;
  meshPhongMaterialProps?: ReactThreeFiber.MaterialNode<
    THREE.MeshPhongMaterial,
    [THREE.MeshPhongMaterialParameters]
  >;
};
const Cube: React.FC<Props> = ({
  children,
  dimensions = [1, 1, 1],
  color = 'red',
  rotation = [90, 90, 0],
  meshProps,
  boxGeometryProps,
  meshPhongMaterialProps
}) => (
  <mesh rotation={rotation} {...meshProps}>
    <boxGeometry attach="geometry" args={dimensions} {...boxGeometryProps} />
    <meshPhongMaterial
      attach="material"
      color={color}
      {...meshPhongMaterialProps}
    />
    {children}
  </mesh>
);

export default Cube;
