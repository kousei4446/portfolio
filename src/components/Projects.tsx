import { Project, projectsData } from '../data/projectsData';
import './styles/Projects.css';

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="work-card">
    <div className="work-image-inner">
      {/* <img src={project.image || "/home.png"} alt={project.title} /> */}
      <img
        height="250px"
        src={project.image || '/home.png'}
        alt={project.title}
      />
    </div>
    <div className="work-content">
      <div className="work-title">
        <span>{project.title}</span>
      </div>
      <div className="work-period">{project.period}</div>
      <div className="work-description">{project.description}</div>
      <div className="work-tech">
        {project.techStack.map((tech, index) => (
          <span key={index}>{tech}</span>
        ))}
      </div>
      <div className="work-links">
        {project.links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{link.icon}</span> {link.label}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const Projects = () => {
  return (
    <div className="projects-container" id="projects">
      <h2 className="projects-title">Selected Projects</h2>
      {projectsData.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
};

export default Projects;
