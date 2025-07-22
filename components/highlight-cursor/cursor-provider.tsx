import { useEffect, useState, useCallback, useMemo } from 'react';
import type { CursorProviderProps } from './types';
import { CursorContext } from './cursor-context';

export const CursorProvider = ({
  children,
  maxOffsetX = 5,
  maxOffsetY = 20,
  cursorSize = 20,
  transitionDuration = 100,
  cursorClassName,
}: CursorProviderProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElementId, setHoveredElementId] = useState<string | null>(null);
  const [elementDimensions, setElementDimensions] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const registerHoveredElement = useCallback((id: string, dimensions: DOMRect) => {
    setHoveredElementId(id);
    setElementDimensions({
      width: dimensions.width,
      height: dimensions.height,
      x: dimensions.left,
      y: dimensions.top,
    });
  }, []);

  const unregisterHoveredElement = useCallback(() => {
    setHoveredElementId(null);
  }, []);

  const updateElementDimensions = useCallback((dimensions: DOMRect) => {
    if (hoveredElementId) {
      setElementDimensions({
        width: dimensions.width,
        height: dimensions.height,
        x: dimensions.left,
        y: dimensions.top,
      });
    }
  }, [hoveredElementId]);

  const getCursorPosition = useCallback(() => {
    if (!hoveredElementId) {
      return {
        x: mousePosition.x - cursorSize / 2,
        y: mousePosition.y - cursorSize / 2,
      };
    }

    // Calculate the center of the element
    const elementCenterX = elementDimensions.x + elementDimensions.width / 2;
    const elementCenterY = elementDimensions.y + elementDimensions.height / 2;

    // Calculate offset from center (with some dampening for smoothness)
    const offsetX = (mousePosition.x - elementCenterX) * 0.1;
    const offsetY = (mousePosition.y - elementCenterY) * 0.1;

    // Apply bounds to keep cursor within reasonable limits
    const boundedOffsetX = Math.max(-maxOffsetX, Math.min(maxOffsetX, offsetX));
    const boundedOffsetY = Math.max(-maxOffsetY, Math.min(maxOffsetY, offsetY));

    return {
      x: elementDimensions.x + boundedOffsetX,
      y: elementDimensions.y + boundedOffsetY,
    };
  }, [hoveredElementId, mousePosition, elementDimensions, cursorSize, maxOffsetX, maxOffsetY]);

  const cursorPosition = getCursorPosition();

  const contextValue = useMemo(() => ({
      // State values that change during component lifecycle
      mousePosition,
      hoveredElementId,
      elementDimensions,

      // Callbacks that should be stable references
      registerHoveredElement,
      unregisterHoveredElement,
      updateElementDimensions,
  }), [
    mousePosition,
    hoveredElementId,
    elementDimensions,
    registerHoveredElement,
    unregisterHoveredElement,
    updateElementDimensions,
    // Props that don't change after initial render don't need to be dependencies
    // unless they're used in callback functions that are dependencies
  ]);

  return (
    <CursorContext.Provider
      value={contextValue}
    >
      <div
        className={`fixed pointer-events-none z-50 transition-all duration-${transitionDuration} ease-out ${cursorClassName || ''}`}
        style={useMemo(() => ({
          left: cursorPosition.x,
          top: cursorPosition.y,
          width: hoveredElementId ? elementDimensions.width : cursorSize,
          height: hoveredElementId ? elementDimensions.height : cursorSize,
        }), [cursorPosition.x, cursorPosition.y, hoveredElementId, elementDimensions.width, elementDimensions.height, cursorSize])}
      >
        <div
          className={`w-full h-full bg-gray-300/10 backdrop-blur-xxs border border-white/50 shadow-lg transition-all duration-${transitionDuration} ease-out ${hoveredElementId ? 'rounded-md' : 'rounded-full'}`}
          style={useMemo(() => ({
            boxShadow: hoveredElementId
              ? '0 0 25px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              : '0 0 15px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          }), [hoveredElementId])}
        />
      </div>
      <div className={hoveredElementId ? 'cursor-auto' : 'cursor-none'}>
        {children}
      </div>
    </CursorContext.Provider>
  );
};
