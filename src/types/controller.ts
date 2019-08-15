import React from 'react';
import * as THREE from 'three';

export enum Hand {
  LEFT = 0,
  RIGHT = 1
}

export type Controller = any;

export type ControllerTarget = THREE.Object3D;

export type Targetable<T> = T & {
  innerRef?: React.RefObject<any>;
};

export type TargetConfig = {
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onPointerMove?: () => void;
  onSelectStart?: () => void;
  onSelectEnd?: () => void;
  onSelect?: () => void;
};
