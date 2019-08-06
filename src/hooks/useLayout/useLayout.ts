import React from 'react';

import { LayoutContext } from 'viewAssets';

const useLayout = () => {
  const { parentLayout, zIndex } = React.useContext(LayoutContext);
  return { ...parentLayout, zIndex };
};

export default useLayout;
