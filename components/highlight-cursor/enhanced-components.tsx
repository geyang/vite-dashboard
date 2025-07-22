import { forwardRef } from 'react';
import { withCursor } from './with-cursor';
import { TableRow } from '@/components/ui/table';

// Enhanced div with cursor effect
const Div = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return <div ref={ref} {...props} />;
});
Div.displayName = 'Div';

// Apply the HOC to create enhanced components
export const CursorDiv = withCursor(Div);
export const CursorTableRow = withCursor(TableRow);
