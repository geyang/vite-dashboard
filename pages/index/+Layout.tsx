import type { PropsWithChildren } from 'react';
import { Helmet } from '@vuer-ai/react-helmet-async';

import { ThemeProvider } from '@/components/theme-provider.tsx';

export default function LandingPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Helmet>
        <title>User Management Dashboard</title>
        <meta
          name='description'
          content='A dashboard for managing users and organizations.'
        />
        <meta name='generator' content='v0.dev' />
      </Helmet>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </>
  );
}
