import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type Theme = 'light' | 'dark' | 'system';

type ThemeProviderProps = PropsWithChildren<{
  attribute?: 'class' | 'data-theme';
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}>;

export type ThemeValueT = {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeValueT | undefined>(undefined);

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const getSystemTheme = () =>
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

    const applyTheme = (themeToApply: Theme) => {
      const root = document.documentElement;

      const actual =
        themeToApply === 'system' ? getSystemTheme() : themeToApply;

      if (disableTransitionOnChange) {
        root.classList.add('[&_*]:!transition-none');
        setTimeout(() => {
          root.classList.remove('[&_*]:!transition-none');
        }, 0);
      }

      if (attribute === 'class') {
        root.classList.remove('light', 'dark');
        root.classList.add(actual);
      } else if (attribute === 'data-theme') {
        root.setAttribute('data-theme', actual);
      }

      setResolvedTheme(actual);
    };

    applyTheme(theme);

    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = () => applyTheme('system');
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    }
  }, [theme, attribute, disableTransitionOnChange]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
