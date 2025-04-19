import { aboutTexts } from '../data/aboutText';
import './styles/about.css';
import image1 from '/aboutMe.png';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="content-column">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-image">
            <img src={image1} alt="prof" />
          </div>
          <div className="about-text">
            {aboutTexts.map((aboutText, index) => (
              <p key={index}>
                {aboutText}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
