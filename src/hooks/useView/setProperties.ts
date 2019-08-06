import yoga from 'yoga-layout';

import { LayoutProperties } from 'types';

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
