"use client";

import { useTheme } from "./ThemeProvider";

export default function VideoBackground() {
  const { theme } = useTheme();

  return (
    <div
      aria-hidden="true"
      className="ambient-field"
      data-ambient-theme={theme}
    />
  );
}
