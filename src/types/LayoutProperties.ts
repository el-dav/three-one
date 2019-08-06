import yoga from 'yoga-layout';

export type LayoutProperties = {
  alignContent?: yoga.YogaAlign;
  alignItems?: yoga.YogaAlign;
  alignSelf?: yoga.YogaAlign;
  aspectRatio?: number;
  display?: yoga.YogaDisplay;
  border?: [yoga.YogaEdge, number];
  flex?: number;
  flexBasis?: number | string;
  flexBasisPercent?: number;
  flexDirection?: yoga.YogaFlexDirection;
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: yoga.YogaFlexWrap;
  height?: number;
  heightAuto?: boolean;
  heightPercent?: number;
  justifyContent?: yoga.YogaJustifyContent;
  margin?: [yoga.YogaEdge, number];
  marginAuto?: yoga.YogaEdge;
  marginPercent?: [yoga.YogaEdge, number];
  maxHeight?: number | string;
  maxHeightPercent?: number;
  maxWidth?: number | string;
  maxWidthPercent?: number;
  minHeight?: number;
  minHeightPercent?: number;
  minWidth?: number;
  minWidthPercent?: number;
  overflow?: yoga.YogaOverflow;
  padding?: [yoga.YogaEdge, number | string];
  paddingPercent?: [yoga.YogaEdge, number];
  position?: [yoga.YogaEdge, number | string];
  positionPercent?: [yoga.YogaEdge, number | string];
  positionType?: yoga.YogaPositionType;
  width?: number | string;
  widthAuto?: boolean;
  widthPercent?: number;
};
