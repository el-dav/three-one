import React from 'react';

import { useLayout } from 'hooks';

const withLayout = Component => props => {
  const [layout, setLayout] = React.useState();
  const ref = useLayout(ev => {
    setLayout(ev.layout);
  });

  return (
    <group ref={ref}>
      {layout ? <Component {...layout} {...props} /> : null}
    </group>
  );
};

export default withLayout;
