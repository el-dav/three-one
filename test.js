import React from 'react';
import ReactDOM from 'react-dom';

import yoga, { Node } from 'yoga-layout';

const RootView = () => {
  const [width, setWidth] = React.useState(500);
  const nodeRef = React.useRef(Node.create());
  const [layout, setLayout] = React.useState(null);
  const node = nodeRef.current;

  React.useEffect(() => {
    node.setHeight(300);
    node.setWidth(width);
    // node.setAlignItems(yoga.ALIGN_CENTER);
    node.setJustifyContent(yoga.JUSTIFY_CENTER);
    node.setAlignItems(yoga.ALIGN_CENTER);
    node.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    node.calculateLayout();
    setLayout(node.getComputedLayout());
  }, [setLayout, node, width]);

  console.log('R', layout);

  return (
    <div style={{ position: 'absolute', ...layout, background: 'blue' }}>
      <button
        onClick={() => {
          setWidth(width + 10);
        }}
      >
        click
      </button>
      <h1>Root</h1>
      <ChildView
        parentNode={nodeRef.current}
        setParentLayout={setLayout}
        parentLayout={layout}
        color="red"
      />
      <ChildView
        parentNode={nodeRef.current}
        setParentLayout={setLayout}
        parentLayout={layout}
        color="green"
      />
    </div>
  );
};

const ChildView = ({
  parentNode,
  setParentLayout,
  children,
  color,
  parentLayout
}) => {
  const nodeRef = React.useRef(Node.create());
  const [layout, setLayout] = React.useState(null);
  const node = nodeRef.current;

  React.useEffect(() => {
    node.setWidth(100);
    node.setHeight(100);
    if (!node.getParent()) {
      parentNode.insertChild(node, parentNode.getChildCount());
      parentNode.calculateLayout();
      const newParentLayout = parentNode.getComputedLayout();
      if (newParentLayout !== parentLayout) {
        setParentLayout(parentNode.getComputedLayout());
      }
    }
    setLayout(node.getComputedLayout());
  }, [setLayout, parentNode, setParentLayout, parentLayout, node]);

  console.log(color, layout);

  return (
    <div style={{ position: 'absolute', ...layout, background: color }}>
      <h1>Child</h1>
    </div>
  );
};

const App = () => (
  <div>
    <h1>Hello</h1>
    <RootView />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
