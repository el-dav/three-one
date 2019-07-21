import React from 'react';
import * as THREE from 'three';

const Scene: React.FC = ({ children }) => (
  <scene background={new THREE.Color('skyblue')}>{children}</scene>
);

export default Scene;
