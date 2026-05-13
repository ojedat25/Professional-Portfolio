import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Menu, Monitor, Moon, Sun, X } from "lucide-react";
import { useTheme, type ThemePreference } from "../hooks/useTheme";
import { useIsNarrowProjects } from "../hooks/useMediaQuery";

function scrollToSection(id: string) {
  const targetElement = document.getElementById(id);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }
}

function scrollToId(event: MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault();
  scrollToSection(id);
}

/** Run after the next frame(s) so layout matches the post-commit DOM (e.g. collapsed mobile nav). */
function scrollToSectionAfterLayout(id: string) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => scrollToSection(id));
  });
}

function scrollToTop(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", window.location.pathname || "/");
}

const MENU_PANEL_ID = "primary-menu";

function ThemeCycleButton() {
  const { theme, resolvedTheme, cycleTheme } = useTheme();

  const cycleOrder: ThemePreference[] = ["system", "light", "dark"];
  const nextPreference =
    cycleOrder[(cycleOrder.indexOf(theme) + 1) % cycleOrder.length];

  const currentLabel =
    theme === "system"
      ? `System (${resolvedTheme === "dark" ? "dark" : "light"} appearance)`
      : theme === "light"
        ? "Light"
        : "Dark";

  const nextHuman =
    nextPreference === "system" ? "system mode" : `${nextPreference} mode`;

  const iconProps = { size: 22, strokeWidth: 2, "aria-hidden": true as const };
  let iconElement;
  if (theme === "system") {
    iconElement = <Monitor {...iconProps} />;
  } else if (theme === "light") {
    iconElement = <Sun {...iconProps} />;
  } else {
    iconElement = <Moon {...iconProps} />;
  }

  const themeLabelText = "Theme";
  const themeModeText =
    theme === "system" ? "Auto" : theme === "light" ? "Light" : "Dark";

  return (
    <button
      type="button"
      className="site-nav__theme-btn"
      onClick={() => cycleTheme()}
      aria-label={`Theme: ${currentLabel}. Activate to switch to ${nextHuman}.`}
      title={`Next: ${nextHuman}`}
    >
      {iconElement}
      <span className="site-nav__theme-text" aria-hidden="true">
        <span className="site-nav__theme-label">{themeLabelText}</span>
        <span className="site-nav__theme-mode">{themeModeText}</span>
      </span>
    </button>
  );
}

/** Mobile navbar */
function NavbarNarrow() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    function onKeyDown(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.key === "Escape") {
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function handleNavClick(
    mouseEvent: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    mouseEvent.preventDefault();
    setMenuOpen(false);
    scrollToSectionAfterLayout(id);
  }

  return (
    <>
      <div className="layout-inner site-nav__inner">
        <a className="site-nav__brand" href="/" onClick={scrollToTop}>
          dev-toni.me
        </a>
        <div className="site-nav__actions">
          <ThemeCycleButton />
          <button
            type="button"
            className="site-nav__menu-btn"
            onClick={() => setMenuOpen((wasOpen) => !wasOpen)}
            aria-expanded={menuOpen}
            aria-controls={MENU_PANEL_ID}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X size={26} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu size={26} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <div className="layout-inner site-nav__mobile-wrap" hidden={!menuOpen}>
        <nav
          id={MENU_PANEL_ID}
          className="site-nav__panel"
          aria-label="Primary"
        >
          <a
            className="site-nav__link site-nav__link--stacked"
            href="#work"
            onClick={(mouseEvent) => handleNavClick(mouseEvent, "work")}
          >
            Work
          </a>
          <a
            className="site-nav__link site-nav__link--stacked"
            href="#skills"
            onClick={(mouseEvent) => handleNavClick(mouseEvent, "skills")}
          >
            Skills
          </a>
          <a
            className="site-nav__link site-nav__link--stacked"
            href="#about"
            onClick={(mouseEvent) => handleNavClick(mouseEvent, "about")}
          >
            About
          </a>
        </nav>
      </div>
      {menuOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              className="site-nav__backdrop"
              aria-hidden="true"
              onClick={() => setMenuOpen(false)}
            />,
            document.body,
          )
        : null}
    </>
  );
}

export default function Navbar() {
  const isNarrow = useIsNarrowProjects();

  return (
    <header className="site-nav">
      {isNarrow ? (
        <NavbarNarrow />
      ) : (
        <div className="layout-inner site-nav__inner">
          <a className="site-nav__brand" href="/" onClick={scrollToTop}>
            dev-toni.me
          </a>
          <div className="site-nav__end">
            <nav className="site-nav__links" aria-label="Primary">
              <a
                className="site-nav__link"
                href="#work"
                onClick={(mouseEvent) => scrollToId(mouseEvent, "work")}
              >
                Work
              </a>
              <a
                className="site-nav__link"
                href="#skills"
                onClick={(mouseEvent) => scrollToId(mouseEvent, "skills")}
              >
                Skills
              </a>
              <a
                className="site-nav__link"
                href="#about"
                onClick={(mouseEvent) => scrollToId(mouseEvent, "about")}
              >
                About
              </a>
            </nav>
            <ThemeCycleButton />
          </div>
        </div>
      )}
    </header>
  );
}
