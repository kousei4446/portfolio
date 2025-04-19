import { Internship, internships } from '../data/internExperience';
import './styles/experience.css';


const TimelineItem = ({ internship }: { internship: Internship }) => (
  <div className="timeline-item">
    <div className="timeline-dot"></div>
    <div className="timeline-content">
      <h3>{internship.role}</h3>
      <h4>{internship.company}</h4>
      <p className="timeline-date">{internship.duration}</p>
      <p>{internship.description}</p>
      <ul className="timeline-skills">
        {internship.skills.map((skill, index) => (
          <li key={index}>
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Experience = () => {
  return (
    <section className="experience-section" id="experience">
      <div className="content-column">
        <h2 className="section-title">Internship Experience</h2>
        <div className="timeline">
          {internships.map((internship, index) => (
            <TimelineItem key={index} internship={internship} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
