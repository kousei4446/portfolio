import "./styles/experience.css"

interface Internship {
  role: string
  company: string
  duration: string
  description: string
  skills: string[]
}

const internships: Internship[] = [
  {
    role: "フロントエンドUX改善",
    company: "株式会社クイック",
    duration: "2024年8月2日 ~ 2024年8月4日 (3Days)",
    description:
      "サービス「社内のWebポータル」のフロントエンドUX改善を担当。React+TypeScript、PHP(Laravel)を使用し、既存システムに質問機能を追加。バックエンド実装を通じてMVCモデルの概念を学び、サーバー側で質問テーブルとユーザー情報テーブルの結合処理を実装。",
    skills: ["React", "TypeScript", "Laravel", "Git"],
  },
  {
    role: "Web開発インターン",
    company: "株式会社Sky",
    duration: "2024年9月2日 ~ 9月13日",
    description:
      "Sky株式会社の「Skyスタイル部」にて社内DXに関する開発を経験。現場社員から実務の流れを学び、Web開発スキルを向上。実際の成果物を作成し、開発現場の業務内容を深く理解。",
    skills: ["Next.js", "TypeScript", "Chakra UI", "Figma"],
  },
  {
    role: "カレンダーアプリのバグ修正",
    company: "株式会社ジーニー",
    duration: "2024年10月11日 (1Day)",
    description:
      "架空サービスのカレンダーアプリのバグ修正を担当。React+TypeScriptを使用。初めてReact FullCalendarを扱うため、公式ドキュメントを参考にしながら実装。",
    skills: ["React", "TypeScript", "FullCalendar"],
  },
  {
    role: "TypeScript移行・フロント改善",
    company: "c-live株式会社",
    duration: "2025年3月 - 現在",
    description:
      "ReactプロジェクトのTypeScript移行を担当。既存コードの型付けやリファクタリングを進めつつ、コードの保守性・可読性向上に貢献",
    skills: ["React", "TypeScript", "Git"],
  }
]

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
)

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
  )
}

export default Experience
