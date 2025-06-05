"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";

const themes = ["light", "dark", "system"] as const;

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [index, setIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const current = themes.indexOf(theme as (typeof themes)[number]);
    setIndex(current >= 0 ? current : 0);
  }, [theme]);

  const nextTheme = () => {
    const nextIndex = (index + 1) % themes.length;
    setIndex(nextIndex);
    setTheme(themes[nextIndex]);
  };

  const iconMap = {
    light: <Sun className="h-[18px] w-[18px] text-amber-500 transition-all" />,
    dark: <Moon className="h-[18px] w-[18px] text-indigo-400 transition-all" />,
    system: (
      <Laptop className="h-[18px] w-[18px] text-blue-400 transition-all" />
    ),
  };

  return (
    <div className="">
      <button
        onClick={nextTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xs hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        aria-label="Toggle theme"
      >
        {iconMap[themes[index]]}
      </button>

      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {themes[(index + 1) % themes.length]} mode
          <div className="absolute top-full left-1/2 w-2 h-2 bg-gray-800 dark:bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
        </div>
      )}

      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {themes.map((_, i) => (
          <span
            key={i}
            className={`block h-1 w-1 rounded-full transition-all duration-200 ${
              i === index
                ? "bg-blue-500 scale-125"
                : "bg-gray-300 dark:bg-gray-500 scale-90"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
