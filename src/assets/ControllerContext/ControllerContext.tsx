import React from 'react';
import { useRender } from 'react-three-fiber';
import THREE from 'three';

import { Hand, Controller, ControllerTarget, TargetConfig } from 'types';

type ActiveTarget = {
  uuid: string;
  distance: number;
  hand: Hand;
};

type ActiveTargetList = {
  [hand: string]: ActiveTarget;
};

type Targets = {
  [uuid: string]: ControllerTarget;
};

type ControllerData = {
  hand: Hand;
  isSelecting: boolean;
  controller: Controller;
  rayCaster: THREE.Raycaster;
  tempMatrix: THREE.Matrix4;
};

type ControllerWithTargetData = ControllerData & {
  activeTarget: ActiveTarget;
};

type ControllersData = {
  [hand: string]: ControllerWithTargetData;
};

type State = {
  controllersData: ControllersData;
  targets: Targets;
  activeTargetList: ActiveTargetList;
};

export const ControllerContext = React.createContext<ControllerContext>(
  null as any
);

enum ActionType {
  REGISTER_CONTROLLER = 'REGISTER_CONTROLLER',
  UNREGISTER_CONTROLLER = 'UNREGISTER_CONTROLLER',
  REGISTER_TARGET = 'REGISTER_TARGET',
  UNREGISTER_TARGET = 'UNREGISTER_TARGET',
  SET_ACTIVE_TARGET = 'SET_ACTIVE_TARGET',
  REMOVE_ACTIVE_TARGET = 'REMOVE_ACTIVE_TARGET',
  START_CONTROLLER_SELECT = 'START_CONTROLLER_SELECT',
  END_CONTROLLER_SELECT = 'END_CONTROLLER_SELECT'
}

type RegisterController = {
  type: ActionType.REGISTER_CONTROLLER;
  payload: ControllerData;
};

type UnregisterController = {
  type: ActionType.UNREGISTER_CONTROLLER;
  payload: Hand;
};

type RegisterTarget = {
  type: ActionType.REGISTER_TARGET;
  payload: ControllerTarget;
};

type UnregisterTarget = {
  type: ActionType.UNREGISTER_TARGET;
  payload: string;
};

type SetActiveTarget = {
  type: ActionType.SET_ACTIVE_TARGET;
  payload: {
    hand: Hand;
    target: ActiveTarget;
  };
};

type RemoveActiveTarget = {
  type: ActionType.REMOVE_ACTIVE_TARGET;
  payload: Hand;
};

type StartControllerSelect = {
  type: ActionType.START_CONTROLLER_SELECT;
  payload: Hand;
};

type EndControllerSelect = {
  type: ActionType.END_CONTROLLER_SELECT;
  payload: Hand;
};

type Action =
  | RegisterController
  | UnregisterController
  | RegisterTarget
  | UnregisterTarget
  | SetActiveTarget
  | RemoveActiveTarget
  | StartControllerSelect
  | EndControllerSelect;

type ControllerContext = {
  registerController: (controllerData: ControllerData) => void;
  unregisterController: (hand: Hand) => void;
  registerTarget: (
    target: ControllerTarget,
    targetConfig?: TargetConfig
  ) => void;
  unregisterTarget: (uuid: string) => void;
  startControllerSelect: (hand: Hand) => void;
  endControllerSelect: (hand: Hand) => void;
  controllersData: ControllersData;
  targetList: ControllerTarget[];
  activeTargetList: ActiveTargetList;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.REGISTER_CONTROLLER:
      const { hand } = action.payload;
      return {
        ...state,
        controllersData: { ...state.controllersData, [hand]: action.payload }
      };
    case ActionType.UNREGISTER_CONTROLLER:
      const newControllersData = state.controllersData;
      delete newControllersData[action.payload];
      return { ...state, controllersData: newControllersData };
    case ActionType.REGISTER_TARGET:
      return {
        ...state,
        targets: {
          ...state.targets,
          [action.payload.uuid]: action.payload
        }
      };
    case ActionType.UNREGISTER_TARGET:
      const newTargets = state.targets;
      delete newTargets[action.payload];
      return {
        ...state,
        targets: { ...newTargets }
      };
    case ActionType.SET_ACTIVE_TARGET:
      return {
        ...state,
        activeTargetList: {
          [action.payload.hand]: action.payload.target
        }
      };

    case ActionType.REMOVE_ACTIVE_TARGET:
      const newActiveTargetList = state.activeTargetList;
      delete newActiveTargetList[action.payload];
      return {
        ...state,
        activeTargetList: { ...newActiveTargetList }
      };

    case ActionType.START_CONTROLLER_SELECT:
      return {
        ...state,
        controllersData: {
          ...state.controllersData,
          [action.payload]: {
            ...state.controllersData[action.payload],
            isSelecting: true
          }
        }
      };
    case ActionType.END_CONTROLLER_SELECT:
      return {
        ...state,
        controllersData: {
          ...state.controllersData,
          [action.payload]: {
            ...state.controllersData[action.payload],
            isSelecting: false
          }
        }
      };
    default:
      return state;
  }
};

const initialState: State = {
  controllersData: {},
  targets: {},
  activeTargetList: {}
};

export const ControllerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { controllersData, targets, activeTargetList } = state;

  const targetList = React.useMemo(() => {
    return Object.values(targets);
  }, [targets]);

  useRender(
    () => {
      Object.values(controllersData).forEach(controllerData => {
        const { hand, controller, rayCaster, tempMatrix } = controllerData;
        const activeTarget = activeTargetList[hand];

        tempMatrix.identity().extractRotation(controller.matrixWorld);
        rayCaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
        rayCaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
        // get the list of objects the ray intersected
        const intersections = rayCaster.intersectObjects(targetList);

        if (intersections.length) {
          const intersection = intersections[0];

          const target = {
            uuid: intersection.object.uuid,
            distance: intersection.distance,
            hand
          };

          dispatch({
            type: ActionType.SET_ACTIVE_TARGET,
            payload: {
              hand,
              target
            }
          });
        } else if (activeTarget) {
          dispatch({
            type: ActionType.REMOVE_ACTIVE_TARGET,
            payload: hand
          });
        }
      });
    },
    false,
    [controllersData, targetList, dispatch, activeTargetList]
  );

  const registerController = React.useCallback(
    (controllerData: ControllerData) => {
      dispatch({
        type: ActionType.REGISTER_CONTROLLER,
        payload: controllerData
      });
    },
    [dispatch]
  );

  const unregisterController = React.useCallback(
    (hand: Hand) => {
      dispatch({
        type: ActionType.UNREGISTER_CONTROLLER,
        payload: hand
      });
    },
    [dispatch]
  );

  const registerTarget = React.useCallback(
    (target: ControllerTarget) => {
      dispatch({
        type: ActionType.REGISTER_TARGET,
        payload: target
      });
    },
    [dispatch]
  );

  const unregisterTarget = React.useCallback(
    (uuid: string) => {
      dispatch({
        type: ActionType.UNREGISTER_TARGET,
        payload: uuid
      });
    },
    [dispatch]
  );

  const startControllerSelect = React.useCallback(
    (hand: Hand) => {
      dispatch({
        type: ActionType.START_CONTROLLER_SELECT,
        payload: hand
      });
    },
    [dispatch]
  );

  const endControllerSelect = React.useCallback(
    (hand: Hand) => {
      dispatch({
        type: ActionType.END_CONTROLLER_SELECT,
        payload: hand
      });
    },
    [dispatch]
  );

  React.useEffect(() => {
    // console.log(state);
  }, [state]);
  return (
    <ControllerContext.Provider
      value={{
        registerController,
        unregisterController,
        registerTarget,
        unregisterTarget,
        controllersData,
        targetList,
        activeTargetList,
        startControllerSelect,
        endControllerSelect
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
};
