import React, { FC } from 'react';
import { ReactThreeFiber } from 'react-three-fiber/types/three';
import * as THREE from 'three';

type Props = {
  width?: number;
  height?: number;
  color?: string | number;
  singleSide?: boolean;
  meshProps?: ReactThreeFiber.Object3DNode<THREE.Mesh>;
  planeGeometryProps?: ReactThreeFiber.GeometryNode<THREE.PlaneGeometry>;
  meshPhongMaterialProps?: ReactThreeFiber.MaterialNode<
    THREE.MeshPhongMaterial,
    [THREE.MeshPhongMaterialParameters]
  >;
};

const Plane: FC<Props> = ({
  width = 1,
  height = 1,
  color = 'red',
  singleSide = false,
  meshProps,
  planeGeometryProps,
  meshPhongMaterialProps,
  children
}) => {
  return (
    <mesh {...meshProps}>
      <planeGeometry
        attach="geometry"
        args={[width, height, 1]}
        {...planeGeometryProps}
      />
      <meshPhongMaterial
        attach="material"
        color={color}
        side={singleSide ? THREE.FrontSide : THREE.DoubleSide}
        {...meshPhongMaterialProps}
      />
      {children}
    </mesh>
  );
};

export default Plane;
