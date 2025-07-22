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
# Highlight Cursor Component

A customizable cursor highlight effect for interactive elements in your React application.

## Features

- Smooth cursor following with subtle movement
- Highlights hovered elements
- Automatically adjusts to element size
- Smart detection of partially visible elements in scrollable containers
- Customizable appearance including colors and sizes
- Dark mode support

## Usage

### Basic Setup

1. Wrap your application with the `CursorProvider`:

```tsx
import { CursorProvider } from '@/components/highlight-cursor';

function App() {
  return (
    <CursorProvider>
      <YourApp />
    </CursorProvider>
  );
}
```

### Using Enhanced Components

Use the pre-enhanced components that come with cursor effects:

```tsx
import { CursorButton, CursorInput, CursorTableRow } from '@/components/highlight-cursor';

function MyComponent() {
  return (
    <div>
      <CursorButton>Click Me</CursorButton>
      <CursorInput placeholder="Type here..." />
      <Table>
        <CursorTableRow>Your table content</CursorTableRow>
      </Table>
    </div>
  );
}
```

### Creating Custom Components

You can enhance any component with cursor effects using the `withCursor` HOC:

```tsx
import { withCursor } from '@/components/highlight-cursor';
import { YourComponent } from './your-component';

const CursorYourComponent = withCursor(YourComponent);
```

## Customization

You can customize the cursor appearance by passing props to the `CursorProvider`:

```tsx
<CursorProvider
  cursorSize={24} // Size of the cursor when not hovering (default: 20)
  maxOffsetX={10} // Maximum X offset when following cursor (default: 5)
  maxOffsetY={15} // Maximum Y offset when following cursor (default: 20)
  transitionDuration={150} // Animation duration in ms (default: 100)
  cursorColor="rgba(100, 200, 255, 1)" // Custom cursor color (RGB format recommended)
  cursorClassName="my-custom-cursor" // Additional CSS classes
>
  <YourApp />
</CursorProvider>
```

### Styling

The cursor uses a subtle minimalist design with Tailwind CSS classes:
- Light primary color with low opacity for a gentle highlight effect
- Thin ring border that adapts automatically to light/dark mode
- Subtle backdrop blur for a modern glass-like effect
- Responsive opacity levels for a non-intrusive presence
- Circular shape for default cursor, rounded corners when highlighting elements
```

## How It Works

The cursor highlight works by:

1. Tracking mouse position across the document
2. Detecting when the mouse enters interactive elements
3. Calculating the visible portion of the element (handling overflow containers)
4. Rendering a styled overlay that follows the cursor and adapts to element shapes
5. Smoothly transitioning between states for a polished effect

## Browser Compatibility

This component works in all modern browsers that support React. For optimal performance, browsers with good CSS transition support are recommended.
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
