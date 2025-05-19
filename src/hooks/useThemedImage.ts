import { Theme } from "@/const/common";
import { useEffect, useState } from "react";

export function useThemedImage(lightSrc: string, darkSrc: string) {
  const [src, setSrc] = useState(lightSrc);

  useEffect(() => {
    const getTheme = () =>
      document.documentElement.classList.contains(Theme.DARK)
        ? Theme.DARK
        : Theme.LIGHT;

    const updateImage = () => {
      const theme = getTheme();
      setSrc(theme === Theme.DARK ? darkSrc : lightSrc);
    };

    updateImage();

    const observer = new MutationObserver(updateImage);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [lightSrc, darkSrc]);

  return src;
}
