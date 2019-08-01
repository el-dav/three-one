import React, { FC } from 'react';
import { ReactThreeFiber } from 'react-three-fiber/types/three';
import * as THREE from 'three';

type Props = {
  radius?: number;
  segments?: number;
  color?: string | number;
  meshProps?: ReactThreeFiber.Object3DNode<THREE.Mesh>;
  sphereGeometryProps?: ReactThreeFiber.GeometryNode<THREE.SphereGeometry>;
  meshPhongMaterialProps?: ReactThreeFiber.MaterialNode<
    THREE.MeshPhongMaterial,
    [THREE.MeshPhongMaterialParameters]
  >;
};

const Sphere: FC<Props> = ({
  radius = 0.5,
  segments = 20,
  color = 'red',
  meshProps,
  sphereGeometryProps,
  meshPhongMaterialProps,
  children
}) => {
  return (
    <mesh {...meshProps}>
      <sphereGeometry
        attach="geometry"
        args={[radius, segments, segments]}
        {...sphereGeometryProps}
      />
      <meshPhongMaterial
        attach="material"
        color={color}
        {...meshPhongMaterialProps}
      />
      {children}
    </mesh>
  );
};

export default Sphere;
