"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme,
} from "next-themes";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    // BUG: https://github.com/shadcn-ui/ui/issues/10200 が解決するまではエラーが出る
    <NextThemesProvider enableSystem storageKey="intentui-theme" {...props}>
      {children}
    </NextThemesProvider>
  );
};

export { ThemeProvider, useTheme };
