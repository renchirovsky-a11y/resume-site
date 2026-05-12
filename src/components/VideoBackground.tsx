"use client";

import { useTheme } from "./ThemeProvider";

export default function VideoBackground() {
  const { theme } = useTheme();

  return (
    <div
      aria-hidden="true"
      className="ambient-field"
      data-ambient-theme={theme}
    >
      <span className="kinetic-ribbon kinetic-ribbon-a" />
      <span className="kinetic-ribbon kinetic-ribbon-b" />
      <span className="kinetic-ribbon kinetic-ribbon-c" />
      <span className="ambient-vignette" />
    </div>
  );
}
