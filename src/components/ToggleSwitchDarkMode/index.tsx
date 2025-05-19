import LineMdSunnyFilledLoop from "@/assets/LineMdSunnyFilledLoop";
import LineMdSunnyOutlineToMoonAltLoopTransition from "@/assets/LineMdSunnyOutlineToMoonAltLoopTransition";
import { Theme } from "@/const/common";
import { animate, utils } from "animejs";
import { useEffect, useMemo, useRef, useState } from "react";

export default function ToggleSwitchDarkMode() {
  // Check dark mode
  const isDarkMode = useMemo(() => {
    const isThemeDark = localStorage.theme === Theme.DARK;
    const isNotExistThemeInStorage = !("theme" in localStorage);
    const isOSPreferenceDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    return isThemeDark || (isNotExistThemeInStorage && isOSPreferenceDark);
  }, []);

  // Local state
  const [darkModeEnabled, setDarkModeEnabled] = useState(isDarkMode);

  // Ref
  const sunRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);

  // Handle change mode
  function handleChangeMode() {
    document.documentElement.classList.toggle(Theme.DARK, !darkModeEnabled);
    setDarkModeEnabled((pre) => {
      localStorage.theme = !pre ? Theme.DARK : Theme.LIGHT;
      return !pre;
    });
  }

  useEffect(() => {
    // On page load, best to add inline in `head` to avoid FOUC
    document.documentElement.classList.toggle(
      Theme.DARK,
      localStorage.theme === Theme.DARK ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);

  useEffect(() => {
    utils.set(["#moonRef", "#sunRef"], {
      position: "absolute",
      inset: "0",
      display: "flex",
      alignItems: "center",
      zIndex: "0",
      width: "fit-content",
      color: "#FFFFFF",
    });

    animate("#moonRef", {
      x: darkModeEnabled ? "25px" : "5px",
      opacity: darkModeEnabled ? [0, 1] : [1, 0],
      scale: darkModeEnabled ? [0, 1] : [1, 0],
      rotate: "1turn",
      duration: 300,
      ease: "inOutQuart",
      alternate: true,
      onComplete: () => {
        animate("#sunRef", {
          rotate: "0turn",
          duration: 300,
          ease: "inOutQuart",
          reversed: true,
        });
      },
    });

    animate("#sunRef", {
      x: darkModeEnabled ? "25px" : "5px",
      opacity: darkModeEnabled ? [1, 0] : [0, 1],
      scale: darkModeEnabled ? [1, 0] : [0, 1],
      rotate: "1turn",
      duration: 300,
      ease: "inOutQuart",
      alternate: true,
      onComplete: () => {
        animate("#moonRef", {
          rotate: "0turn",
          duration: 300,
          ease: "inOutQuart",
          reversed: true,
        });
      },
    });
  }, [darkModeEnabled]);

  return (
    <button
      onClick={() => handleChangeMode()}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 z-[1] cursor-pointer bg-toggle-switch"
    >
      <div ref={moonRef} id="moonRef">
        <LineMdSunnyOutlineToMoonAltLoopTransition />
      </div>
      <div ref={sunRef} id="sunRef">
        <LineMdSunnyFilledLoop />
      </div>
    </button>
  );
}
