import ToggleSwitchDarkMode from "../ToggleSwitchDarkMode";
import Logo from "@/assets/logo.png";
import LogoDark from "@/assets/logo-dark-theme.png";
import { HeaderNav } from "./headerNavData";
import { useThemedImage } from "@/hooks/useThemedImage";

export default function Banner() {
  const srcLogo = useThemedImage(Logo, LogoDark);

  return (
    <div className="bg-bg-nav shadow-sm flex items-center justify-center gap-5">
      <div className="mr-[15%]">
        <img alt="logo" src={srcLogo} />
      </div>

      <div className="flex items-center justify-self-center gap-7">
        {HeaderNav?.map((v, i) => {
          return (
            <div key={i}>
              <a href={v?.href}>{v?.label}</a>
            </div>
          );
        })}
      </div>

      <ToggleSwitchDarkMode />
    </div>
  );
}
