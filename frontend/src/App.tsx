import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import About from "./sections/About";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="main">
        <Hero />
        <section
          id="work"
          className="section section--work"
          aria-labelledby="work-label"
        >
          <div className="layout-inner section__inner">
            <Projects />
          </div>
        </section>
        <section
          id="skills"
          className="section section--skills"
          aria-labelledby="skills-label"
        >
          <div className="layout-inner section__inner">
            <Skills />
          </div>
        </section>
        <section
          id="about"
          className="section section--about"
          aria-labelledby="about-label"
        >
          <div className="layout-inner section__inner">
            <About />
          </div>
        </section>
      </main>
    </>
  );
}
