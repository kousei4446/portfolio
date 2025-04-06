import About from '../components/About';
import Contact from '../components/Contact';
import Experience from '../components/Experience';
import Footer from '../components/Footer';
import Skills from '../components/Skill';
import Projects from '../components/Projects';
import './styles/Home.css';

function Home() {
  return (
    <div className="container">
      {/* ===== 1st VIEW: CREATIVE PORTFOLIO (Full-screen Hero) ===== */}
      <section className="first-view">
        <div className="overlay">
          <h1 className="big-title">
            INNOVATIVE
            <br />
            PORTFOLIO
          </h1>
          <p className="name-title">
            Kudou Kousei
            <br />
            University Student
            <br />
            Web & AI Emginner
          </p>
          <a href="#contact" className="work-with-me">
            CONTACT ME
          </a>
        </div>
      </section>
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
