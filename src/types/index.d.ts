import React from 'react';
import * as THREE from 'three';
import { ReactThreeFiber } from 'react-three-fiber/types/three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: ReactThreeFiber.Object3DNode<any>;
    }
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    primitive: ReactThreeFiber.Object3DNode<any>;
  }
}
