import * as THREE from 'three';
import { extend } from 'react-three-fiber';
import yoga, { Node } from 'yoga-layout-prebuilt';

import { getYogaNode } from 'utils';

export class Layout extends THREE.Group {
  yogaChildren: any[];
  yogaNode: any;

  constructor() {
    super();

    this.yogaChildren = [];
    this.yogaNode = Node.create();

    this.addEventListener('added', this.added);
    this.addEventListener('layout', this.layout);
  }

  set width(value) {
    this.yogaNode.setWidth(value);
  }
  set height(value) {
    this.yogaNode.setHeight(value);
  }
  set flexDirection(value) {
    this.yogaNode.setFlexDirection(
      value === 'row' ? yoga.FLEX_DIRECTION_ROW : yoga.FLEX_DIRECTION_COLUMN
    );
  }
  set padding(value) {
    this.yogaNode.setPadding(yoga.EDGE_ALL, value);
  }

  set margin(value) {
    this.yogaNode.setMargin(yoga.EDGE_ALL, value);
  }

  set flexWrap(value) {
    this.yogaNode.setFlexWrap(
      {
        wrap: yoga.WRAP_WRAP,
        'no-wrap': yoga.WRAP_NO_WRAP,
        'wrap-reverse': yoga.WRAP_WRAP_REVERSE
      }[value]
    );
  }

  set flex(value) {
    this.yogaNode.setFlex(value);
  }
  set flexBasis(value) {
    this.yogaNode.setFlexBasis(value);
  }
  set alignItems(value) {
    this.yogaNode.setAlignItems(
      {
        center: yoga.ALIGN_CENTER,
        'flex-end': yoga.ALIGN_FLEX_END,
        'flex-start': yoga.ALIGN_FLEX_START,
        auto: yoga.ALIGN_AUTO,
        'space-around': yoga.ALIGN_SPACE_AROUND,
        'space-between': yoga.ALIGN_SPACE_BETWEEN,
        baseline: yoga.ALIGN_BASELINE,
        stretch: yoga.ALIGN_STRETCH
      }[value]
    );
  }
  set justifyContent(value) {
    this.yogaNode.setJustifyContent(
      {
        center: yoga.JUSTIFY_CENTER,
        'flex-start': yoga.JUSTIFY_FLEX_START,
        'flex-end': yoga.JUSTIFY_FLEX_END,
        'space-around': yoga.JUSTIFY_SPACE_AROUND,
        'space-between': yoga.JUSTIFY_SPACE_BETWEEN,
        'space-evenly': yoga.JUSTIFY_SPACE_EVENLY
      }[value]
    );
  }

  added = () => {
    const yogaParent = getYogaNode(this.parent);
    if (yogaParent) {
      // TODO: We must calculate the index of this node because we can't rely on the ordering
      yogaParent.yogaNode.insertChild(
        this.yogaNode,
        yogaParent.yogaNode.getChildCount()
      );
      yogaParent.yogaChildren.push(this);
    }
  };

  layout = ev => {
    this.position.set(ev.layout.left, ev.layout.bottom, 0);
  };
}

extend({ Layout });
