import { useEffect, useMemo, useState } from "react";

export default function ToggleSwitchDarkMode() {
  // Check dark mode
  const isDarkMode = useMemo(() => {
    const isThemeDark = localStorage.theme === "dark";
    const isNotExistThemeInStorage = !("theme" in localStorage);
    const isOSPreferenceDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    return isThemeDark || (isNotExistThemeInStorage && isOSPreferenceDark);
  }, []);

  // Local state
  const [darkModeEnabled, setDarkModeEnabled] = useState(isDarkMode);

  // Handle change mode
  function handleChangeMode() {
    document.documentElement.classList.toggle("dark", !darkModeEnabled);
    setDarkModeEnabled((pre) => {
      localStorage.theme = !pre ? "dark" : "light";
      return !pre;
    });

    // Whenever the user explicitly chooses to respect the OS preference
    // localStorage.removeItem("theme");
  }

  useEffect(() => {
    // On page load, best to add inline in `head` to avoid FOUC
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);

  return (
    <button
      onClick={() => handleChangeMode()}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
        darkModeEnabled ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          darkModeEnabled ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}
