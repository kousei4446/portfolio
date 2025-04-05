import "./styles/Projects.css"
import work1 from "/work1.png"
import work2 from "/work2.png"
interface Project {
  title: string
  period: string
  description: string
  image: string
  techStack: string[]
  links: { url: string; label: string; icon: string }[]
}

const projectsData: Project[] = [
  {
    title: "🔍 迷子・落とし物検索アプリ",
    period: "2024年6月 - 2024年7月",
    description:
      "大学の実践系授業で開発した防災支援Webアプリ。日常では落とし物探しに活用し、災害時には迷子やペット捜索を支援。",
    image: `${work1}?height=180&width=240`,
    techStack: ["React", "Firebase"],
    links: [
      { url: "https://figare.web.app/", label: "App Store", icon: "📱" },
      { url: "https://github.com/kousei4446/figare", label: "Source Code", icon: "💻" },
    ],
  },
  {
    title: "📅 予定管理アプリ",
    period: "2025年3月 - 2025年4月",
    description:
      "chatGPTを活用した予定管理アプリ。ユーザーは自然言語で予定を入力し、アプリが自動的にカレンダーに追加。",
    image: `${work2}?height=180&width=240`,

    techStack: ["React Native", "Express", "Supabase", "OpenAI API"],
    links: [
      { url: "https://www.youtube.com/watch?v=xhm78ikoPEc", label: "Live Demo", icon: "🔗" },
      { url: "https://github.com/Community-Production-2025-3", label: "Source Code", icon: "💻" },
    ],
  },
]

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="work-card">
    <div className="work-image-inner">
      {/* <img src={project.image || "/home.png"} alt={project.title} /> */}
      <img height="250px" src={project.image || "/home.png"} alt={project.title} />
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
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
            <span>{link.icon}</span> {link.label}
          </a>
        ))}
      </div>
    </div>
  </div>
)

const Projects = () => {
  return (
    <div className="projects-container" id="projects">
      <h2 className="projects-title">Selected Projects</h2>
      {projectsData.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  )
}

export default Projects

