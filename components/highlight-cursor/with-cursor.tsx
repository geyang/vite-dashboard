import { forwardRef, useRef, useId } from 'react';
import type { ComponentType } from 'react';
import { useCursor } from './cursor-context';
import type { EnhancedComponentProps } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * Helper function to determine the visible portion of an element within scrollable containers
 * @param element The DOM element we want to check visibility for
 * @param elementRect The original bounding client rect of the element
 * @returns A DOMRect representing only the visible portion of the element
 */
const getVisibleRect = (element: HTMLElement, elementRect: DOMRect): DOMRect => {
  // Find all scrollable parent containers
  let parent = element.parentElement;
  let visibleRect = {
    ...elementRect,
    left: elementRect.left,
    right: elementRect.right,
    top: elementRect.top,
    bottom: elementRect.bottom,
    width: elementRect.width,
    height: elementRect.height,
    x: elementRect.x,
    y: elementRect.y,
  };

  // Traverse up through parent elements to find scrollable containers
  while (parent) {
    const style = window.getComputedStyle(parent);
    const hasOverflow = [
      style.overflowY,
      style.overflowX,
    ].some(overflow => ['auto', 'scroll', 'hidden'].includes(overflow));

    if (hasOverflow) {
      const parentRect = parent.getBoundingClientRect();

      // Calculate the intersection between the element and its scrollable parent
      const newLeft = Math.max(visibleRect.left, parentRect.left);
      const newTop = Math.max(visibleRect.top, parentRect.top);
      const newRight = Math.min(visibleRect.right, parentRect.right);
      const newBottom = Math.min(visibleRect.bottom, parentRect.bottom);

      // Update the visible rect dimensions
      visibleRect = {
        ...visibleRect,
        left: newLeft,
        top: newTop,
        right: newRight,
        bottom: newBottom,
        width: Math.max(0, newRight - newLeft),
        height: Math.max(0, newBottom - newTop),
        x: newLeft,
        y: newTop
      };

      // If element is completely outside the viewport of the parent, return empty rect
      if (visibleRect.width <= 0 || visibleRect.height <= 0) {
        return new DOMRect(0, 0, 0, 0);
      }
    }

    parent = parent.parentElement;
  }

  return DOMRect.fromRect(visibleRect);
};

export function withCursor<P extends object>(
  Component: ComponentType<P>
) {
  // Create a display name for the enhanced component
  const displayName = Component.displayName || Component.name || 'Component';

  const EnhancedComponent = forwardRef<
    HTMLElement,
    EnhancedComponentProps<P>
  >(({ id: propId, onMouseEnter, onMouseMove, onMouseLeave, ...props }, ref) => {
    const {
      registerHoveredElement,
      unregisterHoveredElement,
      updateElementDimensions,
    } = useCursor();

    const generatedId = useId();
    const id = propId || `cursor-element-${generatedId}`;
    const elementRef = useRef<HTMLElement>(null);

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
      if (elementRef.current) {
        const elementRect = elementRef.current.getBoundingClientRect();
        const visibleRect = getVisibleRect(elementRef.current, elementRect);
        registerHoveredElement(id, visibleRect);
      }
      onMouseEnter?.(event);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
      if (elementRef.current) {
        const elementRect = elementRef.current.getBoundingClientRect();
        const visibleRect = getVisibleRect(elementRef.current, elementRect);
        updateElementDimensions(visibleRect);
      }
      onMouseMove?.(event);
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
      unregisterHoveredElement();
      onMouseLeave?.(event);
    };

    return (
      <Component
        {...(props as P)}
        id={id}
        ref={(node: any) => {
          // Handle both function and object refs
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          elementRef.current = node;
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    );
  });

  EnhancedComponent.displayName = `withCursor(${displayName})`;

  return EnhancedComponent;
}

// Enhanced Button with cursor effect
export const CursorButton = withCursor(Button);

// Enhanced Input with cursor effect
export const CursorInput = withCursor(Input);
