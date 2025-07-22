import { forwardRef, useRef, useId } from 'react';
import type { ComponentType } from 'react';
import { useCursor } from './cursor-context';
import type { EnhancedComponentProps } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
        registerHoveredElement(id, elementRef.current.getBoundingClientRect());
      }
      onMouseEnter?.(event);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
      if (elementRef.current) {
        updateElementDimensions(elementRef.current.getBoundingClientRect());
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
