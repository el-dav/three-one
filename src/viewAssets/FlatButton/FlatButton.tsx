import React from 'react';

import { BasicView, Fill, VIEW_SCALE } from 'viewAssets';
import { Text } from 'assets';
import { yoga } from 'types';
import { useLayout, useTarget } from 'hooks';

type LabelProps = {
  label: string;
};
const Label: React.FC<LabelProps> = ({ label }) => {
  const { width, height } = useLayout();
  const position = [width / 2, height / 2, 1];
  return (
    <group position={position}>
      <Text
        text={label}
        scale={VIEW_SCALE}
        width={width}
        align="center"
        vAlign="center"
      />
    </group>
  );
};
type Props = React.ComponentProps<typeof BasicView> & {
  label: string;
  onClick?: (...args: any) => any;
};
const FlatButton: React.FC<Props> = ({
  children,
  label,
  width = VIEW_SCALE,
  ...layoutProps
}) => {
  const targetConfig = React.useMemo(
    () => ({
      onPointerEnter: () => {},
      onPointerMove: () => {},
      onPointerLeave: () => {},
      onSelectStart: () => {},
      onSelectEnd: () => {},
      onSelect: () => {}
    }),
    []
  );
  const { ref, pointerState, selectState } = useTarget(targetConfig);
  return (
    <BasicView
      minHeight={0.2 * VIEW_SCALE}
      flexDirection={yoga.FLEX_DIRECTION_ROW}
      alignItems={yoga.ALIGN_CENTER}
      justifyContent={yoga.JUSTIFY_CENTER}
      width={width}
      {...layoutProps}
    >
      <Fill innerRef={ref} color="blue" />
      <BasicView width={width}>
        <Label label={pointerState} />
        <Label label={selectState} />
      </BasicView>
      {children}
    </BasicView>
  );
};

export default FlatButton;
