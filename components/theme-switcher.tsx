"use client";

import { Button } from "@/components/ui/button";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/components/theme-provider";

interface Props {
  appearance?: "plain" | "outline";
}

export function ThemeSwitcher({ appearance = "outline", ...props }: Props) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(nextTheme);
  };

  return (
    <Button
      intent={appearance}
      size="sq-sm"
      aria-label="Switch theme"
      onPress={toggleTheme}
      {...props}
    >
      {theme === "light" ? (
        <SunIcon />
      ) : theme === "dark" ? (
        <MoonIcon />
      ) : (
        <ComputerDesktopIcon />
      )}
    </Button>
  );
}
