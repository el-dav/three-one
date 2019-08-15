import React, { useEffect } from 'react';

import { ControllerContext } from 'assets';
import { TargetConfig, Hand } from 'types';

type TargetEvent = keyof TargetConfig;

enum ActionType {
  REGISTER_CONTROLLER = 'REGISTER_CONTROLLER',
  POINTER_ENTER = 'POINTER_ENTER',
  POINTER_LEAVE = 'POINTER_LEAVE',
  POINTER_SELECT_START = 'POINTER_SELECT_START',
  POINTER_SELECT_END = 'POINTER_SELECT_END'
}

type RegisterController = {
  type: ActionType.REGISTER_CONTROLLER;
  payload: Hand;
};

type PointerEnter = {
  type: ActionType.POINTER_ENTER;
  payload: Hand;
};

type PointerLeave = {
  type: ActionType.POINTER_LEAVE;
  payload: Hand;
};

type PointerSelectStart = {
  type: ActionType.POINTER_SELECT_START;
  payload: Hand;
};

type PointerSelectEnd = {
  type: ActionType.POINTER_SELECT_END;
  payload: Hand;
};

type Action =
  | PointerEnter
  | PointerLeave
  | PointerSelectStart
  | PointerSelectStart
  | PointerSelectEnd
  | RegisterController;

type State = {
  [hand: number]: {
    hand: Hand;
    hovered: boolean;
    selected: boolean;
  };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.POINTER_ENTER: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          hovered: true
        }
      };
    }
    case ActionType.POINTER_LEAVE: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          hovered: false
        }
      };
    }
    case ActionType.POINTER_SELECT_START: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          selected: true
        }
      };
    }
    case ActionType.POINTER_SELECT_END: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          selected: false
        }
      };
    }
    case ActionType.REGISTER_CONTROLLER: {
      return {
        ...state,
        [action.payload]: {
          hand: action.payload,
          hovered: false,
          selected: false
        }
      };
    }
    default: {
      return state;
    }
  }
};

const useTarget = (targetConfig?: TargetConfig) => {
  const [state, dispatch] = React.useReducer(reducer, {});

  const ref = React.useRef<any>();
  const {
    registerTarget,
    unregisterTarget,
    activeTargetList,
    controllersData
  } = React.useContext(ControllerContext);
  const target = ref.current;

  const onEvent = React.useMemo(
    () => (event: TargetEvent) => {
      if (targetConfig && targetConfig[event]) {
        console.log(event);
        targetConfig[event]!();
      }
    },
    [targetConfig]
  );

  useEffect(() => {
    if (target) {
      registerTarget(target);
    }
    return () => {
      if (target) {
        unregisterTarget(target.uuid);
      }
    };
  }, [target, registerTarget, unregisterTarget]);

  useEffect(() => {
    Object.values(controllersData).forEach(controllerData => {
      if (!state[controllerData.hand]) {
        dispatch({
          type: ActionType.REGISTER_CONTROLLER,
          payload: controllerData.hand
        });
      }
    });
  }, [controllersData, state, dispatch]);

  useEffect(() => {
    if (target) {
      Object.values(state).forEach(controller => {
        const controllerData = controllersData[controller.hand];
        const controllerIsSelecting = controllerData.isSelecting;

        const controllerTarget = activeTargetList[controller.hand];
        const targetIsActive =
          controllerTarget && controllerTarget.uuid === target.uuid;
        if (targetIsActive) {
          if (!controller.hovered) {
            onEvent('onPointerEnter');
            dispatch({
              type: ActionType.POINTER_ENTER,
              payload: controller.hand
            });
          } else {
            onEvent('onPointerMove');
            if (controllerIsSelecting && !controller.selected) {
            }
          }
        } else {
          if (controller.hovered) {
            onEvent('onPointerLeave');
            dispatch({
              type: ActionType.POINTER_LEAVE,
              payload: controller.hand
            });
          }
        }
      });
    }
  }, [onEvent, dispatch, state, activeTargetList, target, controllersData]);

  const targetState = React.useMemo(() => {
    return {
      ref,
      hovered: Object.values(state).reduce(
        (acc, val) => val.hovered || acc,
        false
      ),
      selected: Object.values(state).reduce(
        (acc, val) => val.selected || acc,
        false
      )
    };
  }, [ref, state]);

  return targetState;
};

export default useTarget;
