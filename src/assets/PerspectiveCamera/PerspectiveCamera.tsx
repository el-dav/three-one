import React, { FC } from 'react';
import { ReactThreeFiber } from 'react-three-fiber/types/three';

type Props = ReactThreeFiber.Object3DNode<THREE.PerspectiveCamera>;

const DEFAULTS: Partial<Props> = {
  fov: 75,
  aspect: 2,
  near: 1,
  far: 5,
  position: [0, 0, 0]
};

const PerspectiveCamera: FC<Props> = ({ children, ...rest }) => {
  return <perspectiveCamera {...DEFAULTS} {...rest} />;
};

export default PerspectiveCamera;
