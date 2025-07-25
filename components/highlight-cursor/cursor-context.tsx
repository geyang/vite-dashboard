import { createContext, useContext } from 'react';
import type { CursorContextType } from './types';

const defaultDimensions = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

const defaultContext: CursorContextType = {
  mousePosition: { x: 0, y: 0 },
  hoveredElementId: null,
  elementDimensions: defaultDimensions,
  registerHoveredElement: () => {},
  unregisterHoveredElement: () => {},
  updateElementDimensions: () => {},
};

export const CursorContext = createContext<CursorContextType>(defaultContext);

export const useCursor = () => useContext(CursorContext);
