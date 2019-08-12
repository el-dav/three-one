import React, { useEffect } from 'react';

import { ControllerContext } from 'assets';
import { TargetConfig } from 'types';

type TargetEvent = keyof TargetConfig;

const useTarget = (targetConfig?: TargetConfig) => {
  const [pointerState, setPointerState] = React.useState<string>('inactive');
  const [selectState, setSelectState] = React.useState<string>('unselected');
  const ref = React.useRef<any>();
  const {
    registerTarget,
    unregisterTarget,
    activeTargetList,
    controllersData
  } = React.useContext(ControllerContext);
  const target = ref.current;

  const intersection = React.useMemo(() => {
    if (target) {
      return Object.values(activeTargetList).find(
        activeTarget => activeTarget.uuid === target.uuid
      );
    }
    return undefined;
  }, [target, activeTargetList]);

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
    if (intersection) {
      if (pointerState === 'inactive') {
        onEvent('onPointerEnter');
        setPointerState('active');
      } else {
        onEvent('onPointerMove');
      }
    } else {
      if (pointerState === 'active') {
        onEvent('onPointerLeave');
      }
      setPointerState('inactive');
    }
  }, [intersection, pointerState, setPointerState, onEvent]);

  useEffect(() => {
    if (intersection) {
      const controller = controllersData[intersection.hand];
      if (controller.isSelecting) {
        if (selectState === 'unselected') {
          onEvent('onSelectStart');
          setSelectState('selected');
        }
      } else {
        onEvent('onSelectEnd');
        onEvent('onSelect');
        setSelectState('unselected');
      }
    } else {
      if (selectState === 'selected') {
        onEvent('onSelectEnd');
        onEvent('onSelect');
        setSelectState('unselected');
      }
    }
  }, [intersection, controllersData, selectState, setSelectState, onEvent]);

  return {
    ref,
    selectState,
    pointerState
  };
};

export default useTarget;
