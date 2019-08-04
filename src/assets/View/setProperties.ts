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

export const setProperties = (
  node: yoga.YogaNode,
  properties?: LayoutProperties
) => {
  if (properties) {
    Object.entries(properties).forEach(([key, value]: [string, any]) => {
      switch (key) {
        case 'alignItems': {
          node.setAlignItems(value);
          break;
        }
        case 'alignSelf': {
          node.setAlignSelf(value);
          break;
        }
        case 'aspectRatio': {
          node.setAspectRatio(value);
          break;
        }
        case 'display': {
          node.setDisplay(value);
          break;
        }
        case 'border': {
          node.setBorder(value[0], value[1]);
          break;
        }
        case 'flex': {
          node.setFlex(value);
          break;
        }
        case 'flexBasis': {
          node.setFlexBasis(value);
          break;
        }
        case 'flexBasisPercent': {
          node.setFlexBasisPercent(value);
          break;
        }
        case 'flexDirection': {
          node.setFlexDirection(value);
          break;
        }
        case 'flexGrow': {
          node.setFlexGrow(value);
          break;
        }
        case 'flexShrink': {
          node.setFlexShrink(value);
          break;
        }
        case 'flexWrap': {
          node.setFlexWrap(value);
          break;
        }
        case 'height': {
          node.setHeight(value);
          break;
        }
        case 'heightAuto': {
          node.setHeightAuto();
          break;
        }
        case 'heightPercent': {
          node.setHeightPercent(value);
          break;
        }
        case 'justifyContent': {
          node.setJustifyContent(value);
          break;
        }
        case 'margin': {
          node.setMargin(value[0], value[1]);
          break;
        }
        case 'marginAuto': {
          node.setMarginAuto(value);
          break;
        }
        case 'marginPercent': {
          node.setMarginPercent(value[0], value[1]);
          break;
        }
        case 'maxHeight': {
          node.setMaxHeight(value);
          break;
        }
        case 'maxHeightPercent': {
          node.setMaxHeightPercent(value);
          break;
        }
        case 'maxWidth': {
          node.setMaxWidth(value);
          break;
        }
        case 'maxWidthPercent': {
          node.setMaxWidthPercent(value);
          break;
        }
        case 'minHeight': {
          node.setMinHeight(value);
          break;
        }
        case 'minHeightPercent': {
          node.setMinHeightPercent(value);
          break;
        }
        case 'minWidth': {
          node.setMinWidth(value);
          break;
        }
        case 'minWidthPercent': {
          node.setMinWidthPercent(value);
          break;
        }
        case 'overflow': {
          node.setOverflow(value);
          break;
        }
        case 'padding': {
          node.setPadding(value[0], value[1]);
          break;
        }
        case 'paddingPercent': {
          node.setPaddingPercent(value[0], value[1]);
          break;
        }
        case 'position': {
          node.setPosition(value[0], value[1]);
          break;
        }
        case 'positionPercent': {
          node.setPositionPercent(value[0], value[1]);
          break;
        }
        case 'positionType': {
          node.setPositionType(value);
          break;
        }
        case 'width': {
          node.setWidth(value);
          break;
        }
        case 'widthAuto': {
          node.setWidthAuto();
          break;
        }
        case 'widthPercent': {
          node.setWidthPercent(value);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
};
