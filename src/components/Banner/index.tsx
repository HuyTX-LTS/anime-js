import ToggleSwitchDarkMode from "../ToggleSwitchDarkMode";
// import Logo from "@/assets/logo.png";
// import LogoDark from "@/assets/logo-dark-theme.png";
import { HeaderNav } from "./headerNavData";
// import { useThemedImage } from "@/hooks/useThemedImage";

export default function Banner() {
  // const srcLogo = useThemedImage(Logo, LogoDark);

  return (
    <div className="bg-bg-nav shadow-sm flex items-center justify-center gap-5 px-4 py-2">
      <div className="mr-[15%]">
        {/* <img alt="logo" src={srcLogo} /> */}
        <p className="bg-gradient-to-r from-gradient-logo-nav-l to-pink-300 bg-clip-text text-5xl font-extrabold text-transparent ...">
          HUY TX
        </p>
      </div>

      <div className="flex items-center justify-self-center gap-7">
        {HeaderNav?.map((v, i) => {
          return (
            <div
              key={i}
              className="bg-gradient-to-r from-gradient-link-nav-l to-gradient-link-nav-r bg-clip-text text-transparent hover:"
            >
              <a href={v?.href}>{v?.label}</a>
            </div>
          );
        })}
      </div>

      <ToggleSwitchDarkMode />
    </div>
  );
}
