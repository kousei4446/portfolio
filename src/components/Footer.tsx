import './styles/footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="content-column">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Kudou Kousei</h3>
            <p>Web & AI Emginner</p>
          </div>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Works</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-social">
            <a href="https://github.com/kousei4446" className="social-link">
              GitHub
            </a>
            <a href="https://x.com/k8035004287922?s=11" className="social-link">
              Twitter
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Kudou Kousei. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
