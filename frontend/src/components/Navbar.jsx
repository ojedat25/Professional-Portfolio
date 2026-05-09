function scrollToId(event, id) {
  event.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }
}

function scrollToTop(event) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", window.location.pathname || "/");
}

export default function Navbar() {
  return (
    <header className="site-nav">
      <div className="layout-inner site-nav__inner">
        <a className="site-nav__brand" href="/" onClick={scrollToTop}>
          toni.dev
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
            href="#about"
            onClick={(e) => scrollToId(e, "about")}
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
