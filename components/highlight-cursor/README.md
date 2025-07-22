# Highlight Cursor Component

A React component that provides a customizable cursor highlight effect when hovering over elements. The cursor follows the mouse and can morph to highlight the hovered element.

## Features

- Custom cursor that follows mouse movement
- Morphing effect when hovering over elements
- Configurable offset and animation properties
- HOC pattern for easy integration with existing components
- Ready-to-use enhanced components (TableRow, Div, etc.)

## Usage

### Basic Usage with Provider

Wrap your application or a section with the `CursorProvider` to enable the cursor highlight effect:

```tsx
import { CursorProvider } from '@/components/highlight-cursor';

export default function App() {
  return (
    <CursorProvider>
      {/* Your app content */}
    </CursorProvider>
  );
}
```

### Using Enhanced Components

Use the pre-enhanced components that already have cursor highlight functionality:

```tsx
import { CursorTableRow, CursorDiv } from '@/components/highlight-cursor';

export default function MyComponent() {
  return (
    <Table>
      <TableBody>
        {items.map((item) => (
          <CursorTableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
          </CursorTableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Using the HOC

Enhance your own components with cursor highlight functionality:

```tsx
import { withCursor } from '@/components/highlight-cursor';

const MyComponent = ({ children }) => (
  <div className="my-custom-component">{children}</div>
);

const CursorMyComponent = withCursor(MyComponent);

export default function App() {
  return (
    <CursorProvider>
      <CursorMyComponent id="unique-id">
        Hover over me!
      </CursorMyComponent>
    </CursorProvider>
  );
}
```

## Configuration

The `CursorProvider` accepts optional configuration props:

```tsx
<CursorProvider 
  maxOffsetX={5}  // Maximum X offset for cursor within highlighted element
  maxOffsetY={20} // Maximum Y offset for cursor within highlighted element
  cursorSize={20} // Size of cursor when not highlighting
  transitionDuration={100} // Duration of transition animations in ms
  cursorClassName="my-custom-cursor-class" // Custom class for cursor
>
  {/* Your app content */}
</CursorProvider>
```

## Examples

Check out the example implementation at `/pages/examples/highlight-cursor/+Page.tsx`.
