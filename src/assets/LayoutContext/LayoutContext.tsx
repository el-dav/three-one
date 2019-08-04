import React from 'react';
import { default as yogaType } from 'yoga-layout';

export type ThreeLayout = {
  bottom: number;
  left: number;
  width: number;
  height: number;
};

export type Layout = {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
};

export type LayoutContextType = {
  zIndex: number;
  parentNode: yogaType.YogaNode | null;
  parentLayout: ThreeLayout;
};

export const defaultLayout: Layout = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 1,
  height: 1
};

export const LayoutContext = React.createContext<LayoutContextType>({
  zIndex: 0,
  parentNode: null,
  parentLayout: defaultLayout
});
