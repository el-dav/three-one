import React from 'react';
import { ReactThreeFiber } from 'react-three-fiber/types/three';
import * as THREE from 'three';

type Vertice = [number, number, number];

type Props = {
  lineProps?: ReactThreeFiber.Object3DNode<THREE.Line>;
  geometryProps?: ReactThreeFiber.GeometryNode<THREE.Geometry>;
  materialProps?: ReactThreeFiber.MaterialNode<
    THREE.LineBasicMaterial,
    [THREE.LineBasicMaterialParameters]
  >;
  vertices: Vertice[];
  color?: string | number;
};

const Line: React.FC<Props> = ({
  children,
  lineProps,
  geometryProps,
  materialProps,
  vertices,
  color = 'black'
}) => {
  return (
    <line {...lineProps}>
      <geometry
        attach="geometry"
        vertices={vertices.map(v => new THREE.Vector3(...v))}
        onUpdate={self => (self.verticesNeedUpdate = true)}
        {...geometryProps}
      />
      <lineBasicMaterial attach="material" color={color} {...materialProps} />
      {children}
    </line>
  );
};

export default Line;
