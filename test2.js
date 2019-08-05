import React from 'react';
import ReactDOM from 'react-dom';

import yoga, { Node } from 'yoga-layout';

const LayoutContext = React.createContext({
  rootNode: null,
  rootLayout: null,
  setRootLayout: null,
  parentNode: null,
  setParentLayout: null,
  parentLayout: null,
  layout: null
});

const areEqualShallow = (a, b) => {
  if (a === null && b === null) {
    return true;
  }
  if (!a || !b) {
    return false;
  }

  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
};

const RootView = ({ color, width, height, children }) => {
  const {
    rootNode,
    rootLayout,
    setRootLayout,
    parentNode,
    setParentLayout,
    parentLayout
  } = React.useContext(LayoutContext);
  const nodeRef = React.useRef(Node.create());
  const [layout, setLayout] = React.useState(null);
  const node = nodeRef.current;

  React.useEffect(() => {
    node.setWidth(width);
    node.setHeight(height);
    if (rootNode) {
      rootNode.calculateLayout();
      const newRootLayout = rootNode.getComputedLayout();
      if (!areEqualShallow(newRootLayout, rootLayout)) {
        setRootLayout(newRootLayout);
      }
    }
  }, [width, height, rootNode, rootLayout, setRootLayout, node]);

  React.useEffect(() => {
    node.setJustifyContent(yoga.JUSTIFY_CENTER);
    node.setAlignItems(yoga.ALIGN_CENTER);
    node.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    if (rootNode) {
      if (!node.getParent()) {
        parentNode.insertChild(node, parentNode.getChildCount());
        rootNode.calculateLayout();
      }
    }

    node.calculateLayout();
    setLayout(node.getComputedLayout());
  }, [setLayout, node, width, height, parentNode, rootNode]);

  const providerValue = React.useMemo(() => {
    return {
      parentNode: node,
      parentLayout: layout,
      setParentLayout: setLayout,
      layout: layout,
      rootNode: rootNode || node,
      rootLayout: rootLayout || layout,
      setRootLayout: setRootLayout || setLayout
    };
  }, [node, rootNode, rootLayout, setRootLayout, layout]);

  return (
    <div style={{ position: 'absolute', ...layout, background: color }}>
      <h1>View</h1>
      <LayoutContext.Provider value={providerValue}>
        {children}
      </LayoutContext.Provider>
    </div>
  );
};

const App = () => {
  const [rootWidth, setRootWidth] = React.useState(300);
  const [child1Width, setChild1Width] = React.useState(100);
  return (
    <div>
      <button
        onClick={() => {
          setRootWidth(rootWidth + 20);
        }}
      >
        Increase Root Width
      </button>
      <button
        onClick={() => {
          setChild1Width(child1Width + 20);
        }}
      >
        Increase Child1 Width
      </button>
      <div style={{ position: 'absolute' }}>
        <RootView color="red" width={rootWidth} height="300">
          <RootView color="green" width={child1Width} height="100" />
          <RootView color="blue" width="100" height="100" />
        </RootView>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
