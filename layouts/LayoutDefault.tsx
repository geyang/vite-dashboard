import './global.css';
import { type PropsWithChildren, StrictMode } from 'react';
import { HelmetProvider } from '@vuer-ai/react-helmet-async';

export default function LayoutDefault({ children }: PropsWithChildren) {
  return (
    <HelmetProvider>
      <StrictMode>{children}</StrictMode>
    </HelmetProvider>
  );
}
