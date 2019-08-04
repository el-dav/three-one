import React from 'react';

import { LayoutContext } from 'assets';

const useLayout = () => {
  const layoutContext = React.useContext(LayoutContext);
  return layoutContext.parentLayout;
};

export default useLayout;
