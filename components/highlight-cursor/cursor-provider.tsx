import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CursorProviderProps } from './types';
import { CursorContext } from './cursor-context';
import { cn } from '@/lib/utils';

export const CursorProvider = ({
  children,
  maxOffsetX = 5,
  maxOffsetY = 20,
  cursorSize = 20,
  transitionDuration = 100,
  cursorClassName,
  className,
  as: Component = 'div',
  ...props
}: CursorProviderProps) => {
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElementId, setHoveredElementId] = useState<string | null>(null);
  const [elementDimensions, setElementDimensions] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    right: 0,
    bottom: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const registerHoveredElement = useCallback(
    (id: string, dimensions: DOMRect) => {
      setHoveredElementId(id);
      setElementDimensions({
        width: dimensions.width,
        height: dimensions.height,
        x: dimensions.left,
        y: dimensions.top,
        right: dimensions.right,
        bottom: dimensions.bottom,
      });
    },
    [],
  );

  const unregisterHoveredElement = useCallback(() => {
    setHoveredElementId(null);
  }, []);

  const updateElementDimensions = useCallback(
    (dimensions: DOMRect) => {
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
    },
    [hoveredElementId],
  );

  const getCursorPosition = () => {
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
  };

  const handleMouseEnter = useCallback(() => {
    setIsMouseInside(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseInside(false);
    setHoveredElementId(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      // State values that change during component lifecycle
      mousePosition,
      hoveredElementId,
      elementDimensions,

      // Callbacks that should be stable references
      registerHoveredElement,
      unregisterHoveredElement,
      updateElementDimensions,
    }),
    [
      mousePosition,
      hoveredElementId,
      elementDimensions,
      registerHoveredElement,
      unregisterHoveredElement,
      updateElementDimensions,
      // Props that don't change after initial render don't need to be dependencies
      // unless they're used in callback functions that are dependencies
    ],
  );

  const cursorPosition = getCursorPosition();

  const cursorStyleObject = useMemo(
    () => ({
      left: cursorPosition.x,
      top: cursorPosition.y,
      width: hoveredElementId
        ? elementDimensions.width > 0
          ? elementDimensions.width
          : cursorSize
        : cursorSize,
      height: hoveredElementId
        ? elementDimensions.height > 0
          ? elementDimensions.height
          : cursorSize
        : cursorSize,
      willChange: 'transform, width, height',
    }),
    [
      cursorPosition.x,
      cursorPosition.y,
      hoveredElementId,
      elementDimensions.width,
      elementDimensions.height,
      cursorSize,
    ],
  );


  let styleClass;
  if (hoveredElementId) {
    styleClass = `opacity-[0.05] rounded-md transition-[width,height,left,top] duration-${transitionDuration} ease-out`;
  } else {
    styleClass = `opacity-90 rounded-xl z-10 transition-[width,height,left,top] duration-${transitionDuration} ease-out transition-opacity duration-${transitionDuration}`;
  }

  // Create cursor element to be portaled
  const cursorElement = isMouseInside && (
    <div
      className={`fixed pointer-events-none bg-[black] dark:bg-[white] ${styleClass} ${hoveredElementId ? '' : cursorClassName || ''}`}
      style={cursorStyleObject}
    />
  );

  // Use React.Fragment at the top level to avoid any DOM structure that might affect layout
  return (
    <>
      {/* Portal the cursor overlay to document.body to completely avoid layout impact */}
      {typeof document !== 'undefined' &&
        document.body &&
        cursorElement &&
        createPortal(cursorElement, document.body)}
      {/* Context provider with no DOM element */}
      <CursorContext.Provider value={contextValue}>
        {/* Use the Component directly with no extra wrappers */}
        <Component
          {...props}
          className={cn(className)}
          style={{
            cursor: isMouseInside && !hoveredElementId ? 'none' : 'auto',
            ...props.style,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </Component>
      </CursorContext.Provider>
    </>
  );
};
