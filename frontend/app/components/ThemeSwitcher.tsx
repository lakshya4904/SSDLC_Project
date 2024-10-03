// app/components/ThemeSwitcher.tsx
"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";
import { Switch, Button } from "@nextui-org/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="space-x-2 ">
      {/* <Button
        startContent={isDark ? <FaMoon /> : <FaSun />} // Use startContent for the icon
        onClick={toggleTheme}
        color={isDark?"primary":"default"}
        radius="full"
        size="sm"
        isIconOnly
      /> */}
      {/* Display icons next to the switch */}

      <Switch
        defaultSelected={isDark}
        size="lg"
        color="primary"
        isSelected={isDark}
        onChange={toggleTheme}
        thumbIcon={() =>
          isDark ? (
            <FaMoon fill="#11181C"/> //#494: color of the icon is not changing

          ) : (
            <FaSun className="" />

          )
        }
      />
    </div>
  );
}
