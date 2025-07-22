import type { ReactNode, ComponentType, HTMLAttributes } from 'react';

export interface CursorContextType {
  mousePosition: { x: number; y: number };
  hoveredElementId: string | null;
  elementDimensions: {
    width: number;
    height: number;
    x: number;
    y: number;
    right?: number;
    bottom?: number;
  };
  registerHoveredElement: (id: string, dimensions: DOMRect) => void;
  unregisterHoveredElement: () => void;
  updateElementDimensions: (dimensions: DOMRect) => void;
  maxOffsetX: number;
  maxOffsetY: number;
  cursorSize: number;
  transitionDuration: number;
  cursorClassName?: string;
}

export interface CursorProviderProps {
  children: ReactNode;
  maxOffsetX?: number;
  maxOffsetY?: number;
  cursorSize?: number;
  transitionDuration?: number;
  cursorClassName?: string;
  cursorColor?: string; // Custom cursor color
}

export interface WithCursorProps {
  id?: string;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseMove?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
}

export type EnhancedComponentProps<P> = P & WithCursorProps;

export type EnhancedComponent<P = {}> = ComponentType<EnhancedComponentProps<P>>;
