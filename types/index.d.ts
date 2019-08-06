import React from 'react';
import * as THREE from 'three';
import { ReactThreeFiber } from 'react-three-fiber/types/three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ViveController } from 'three/examples/jsm/vr/ViveController';

import { Layout } from '../src/primitives';

declare global {
  declare namespace JSX {
    interface IntrinsicElements {
      primitive: ReactThreeFiber.Object3DNode<any>;
      orbitControls: ReactThreeFiber.Node<OrbitControls>;
      viveController: ReactThreeFiber.Object3DNode<ViveController>;
      layout: ReactThreeFiber.Object3DNode<Layout>;
    }
  }

  declare namespace NodeJS {
    interface Global {
      THREE: any;
    }
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    primitive: ReactThreeFiber.Object3DNode<any>;
    orbitControls: ReactThreeFiber.Node<OrbitControls>;
    viveController: ReactThreeFiber.Object3DNode<ViveController>;
    layout: ReactThreeFiber.Object3DNode<Layout>;
  }
}

declare namespace NodeJS {
  interface Global {
    THREE: any;
  }
}

declare module 'webxr-polyfill';
