import { useEffect, useState, useCallback, useMemo } from 'react';
import type { CursorProviderProps } from './types';
import { CursorContext } from './cursor-context';

// Define CSS variables for cursor styling
const getCursorStyles = (color?: string) => {
  // We'll use Tailwind's primary color via classes instead of CSS variables
  return `
:root {
  /* We're now using Tailwind classes for colors */
}

.dark {
  /* Dark mode handled by Tailwind dark: variant */
}
`;
};

export const CursorProvider = ({
  children,
  maxOffsetX = 5,
  maxOffsetY = 20,
  cursorSize = 20,
  transitionDuration = 100,
  cursorClassName,
  cursorColor,
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
      right: dimensions.right,
      bottom: dimensions.bottom,
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
        right: dimensions.right,
        bottom: dimensions.bottom,
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
      <style dangerouslySetInnerHTML={{ __html: getCursorStyles(cursorColor) }} />
      <div
        className={`fixed pointer-events-none z-50 transition-all duration-${transitionDuration} ease-out ${hoveredElementId ? 'opacity-50' : 'opacity-35'} ${cursorClassName || ''}`}
        style={useMemo(() => ({
          left: cursorPosition.x,
          top: cursorPosition.y,
          width: hoveredElementId ? (elementDimensions.width > 0 ? elementDimensions.width : cursorSize) : cursorSize,
          height: hoveredElementId ? (elementDimensions.height > 0 ? elementDimensions.height : cursorSize) : cursorSize,
          willChange: 'transform, width, height',
        }), [cursorPosition.x, cursorPosition.y, hoveredElementId, elementDimensions.width, elementDimensions.height, cursorSize])}
      >
        <div
          className={`w-full h-full transition-all duration-${transitionDuration} ease-out ${hoveredElementId ? 'rounded-md' : 'rounded-full'} bg-primary/5 dark:bg-primary/10 backdrop-blur-[1px] ring-1 ring-primary/5 dark:ring-primary/10`}
        />
      </div>
      <div className={hoveredElementId ? 'cursor-auto' : 'cursor-none'}>
        {children}
      </div>
    </CursorContext.Provider>
  );
};
