import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { useIsNarrowProjects } from "../hooks/useMediaQuery";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
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

/** Mobile navbar */
function NavbarNarrow() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function handleNavClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSectionAfterLayout(id);
  }

  return (
    <>
      <div className="layout-inner site-nav__inner">
        <a className="site-nav__brand" href="/" onClick={scrollToTop}>
          dev-toni.me
        </a>
        <button
          type="button"
          className="site-nav__menu-btn"
          onClick={() => setMenuOpen((open) => !open)}
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
      <div className="layout-inner site-nav__mobile-wrap" hidden={!menuOpen}>
        <nav id={MENU_PANEL_ID} className="site-nav__panel" aria-label="Primary">
          <a
            className="site-nav__link site-nav__link--stacked"
            href="#work"
            onClick={(e) => handleNavClick(e, "work")}
          >
            Work
          </a>
          <a
            className="site-nav__link site-nav__link--stacked"
            href="#skills"
            onClick={(e) => handleNavClick(e, "skills")}
          >
            Skills
          </a>
          <a
            className="site-nav__link site-nav__link--stacked"
            href="#about"
            onClick={(e) => handleNavClick(e, "about")}
          >
            About
          </a>
        </nav>
      </div>
      {menuOpen ? (
        <button
          type="button"
          className="site-nav__backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
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
        /** Desktop navbar */
        <div className="layout-inner site-nav__inner">
          <a className="site-nav__brand" href="/" onClick={scrollToTop}>
            dev-toni.me
          </a>
          <nav className="site-nav__links" aria-label="Primary">
            <a
              className="site-nav__link"
              href="#work"
              onClick={(e) => scrollToId(e, "work")}
            >
              Work
            </a>
            <a
              className="site-nav__link"
              href="#skills"
              onClick={(e) => scrollToId(e, "skills")}
            >
              Skills
            </a>
            <a
              className="site-nav__link"
              href="#about"
              onClick={(e) => scrollToId(e, "about")}
            >
              About
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
