import React, { useEffect } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { Hand, Controller } from 'types';
import { ControllerContext } from 'assets';

type ActiveTarget = {
  uuid: string;
  distance: number;
  object: THREE.Object3D;
};

enum ActionType {
  SET_CONTROLLER = 'SET_CONTROLLER',
  SET_ACTIVE_TARGET = 'SET_ACTIVE_TARGET'
}

type RegisterPayload = {
  controller: Controller;
  rayCaster: THREE.Raycaster;
  tempMatrix: THREE.Matrix4;
};

type RegisterAction = {
  type: ActionType.SET_CONTROLLER;
  payload: RegisterPayload;
};

type SetActiveTarget = {
  type: ActionType.SET_ACTIVE_TARGET;
  payload: ActiveTarget;
};

type Action = RegisterAction | SetActiveTarget;

type State = {
  controller: Controller | null;
  rayCaster: THREE.Raycaster | null;
  tempMatrix: THREE.Matrix4 | null;
  activeTarget: ActiveTarget | null;
};

const initialState: State = {
  controller: null,
  rayCaster: null,
  tempMatrix: null,
  activeTarget: null
};

const controllerReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET_CONTROLLER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const useController = (hand: Hand) => {
  const {
    registerController,
    unregisterController,
    startControllerSelect,
    endControllerSelect,
    controllersData
  } = React.useContext(ControllerContext);
  const [state, dispatch] = React.useReducer(controllerReducer, initialState);
  const { gl } = useThree();
  React.useEffect(() => {
    if (gl && gl.vr && !controllersData[hand]) {
      const vr = gl.vr as any;

      const newController = vr.getController(hand);
      const newRayCaster = new THREE.Raycaster();
      const newTempMatrix = new THREE.Matrix4();

      newController.addEventListener('selectstart', () => {
        startControllerSelect(hand);
      });
      newController.addEventListener('selectend', () => {
        endControllerSelect(hand);
      });

      dispatch({
        type: ActionType.SET_CONTROLLER,
        payload: {
          controller: newController,
          rayCaster: newRayCaster,
          tempMatrix: newTempMatrix
        }
      });

      registerController({
        hand,
        controller: newController,
        rayCaster: newRayCaster,
        tempMatrix: newTempMatrix,
        isSelecting: false
      });
    }
  }, [
    hand,
    gl,
    dispatch,
    registerController,
    controllersData,
    startControllerSelect,
    endControllerSelect
  ]);

  useEffect(() => {
    return () => {
      unregisterController(hand);
    };
  }, [unregisterController, hand]);

  return state;
};

export default useController;
