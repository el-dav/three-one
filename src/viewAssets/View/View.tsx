import React from 'react';

import { LayoutContext } from 'viewAssets';
import { LayoutProperties } from 'types';
import { useView } from 'hooks';

export const VIEW_SCALE = 1000;
const DEFAULT_SCALE_XYZ = [1, 1, 1];
const ROOT_SCALE_XYZ = [1 / VIEW_SCALE, 1 / VIEW_SCALE, 1 / VIEW_SCALE];

type Props = LayoutProperties;

const View: React.FC<Props> = ({ children, ...layoutProps }) => {
  const { providerValue, parentNode } = useView(layoutProps);
  return parentNode ? (
    <LayoutContext.Provider value={providerValue}>
      {children}
    </LayoutContext.Provider>
  ) : (
    <LayoutContext.Provider value={providerValue}>
      <group scale={parentNode ? DEFAULT_SCALE_XYZ : ROOT_SCALE_XYZ}>
        {children}
      </group>
    </LayoutContext.Provider>
  );
};

export default View;
