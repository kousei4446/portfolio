import "./styles/skill.css"
import { useState } from "react";

const skills = [
    { name: "Python", icon: "🐍", level: 90, category: "Backend", img: "/python.png" },
    { name: "Django", icon: "🎸", level: 85, category: "Backend", img: "/django.png" },
    { name: "PHP", icon: "🐘", level: 75, category: "Backend", img: "/php.png" },
    { name: "Laravel", icon: "🐘", level: 75, category: "Backend", img: "/laravel.png" },
    { name: "JavaScript", icon: "📜", level: 85, category: "Frontend", img: "/javascript.png" },
    { name: "React", icon: "⚛️", level: 90, category: "Frontend", img: "/react.png" },
    { name: "ReactNative", icon: "⚛️", level: 90, category: "Frontend", img: "/react.png" },
    { name: "Express", icon: "🚂", level: 80, category: "Backend", img: "/express.png" },
    { name: "HTML5", icon: "🌍", level: 95, category: "Frontend", img: "/html.png" },
    { name: "CSS3", icon: "🎨", level: 90, category: "Frontend", img: "/css.png" },
    { name: "Git", icon: "🔧", level: 85, category: "Tools", img: "/git.png" },
    { name: "GitHub", icon: "🔧", level: 85, category: "Tools", img: "/github.png" },
    { name: "MySQL", icon: "📊", level: 75, category: "Tools", img: "/mysql.png" },
    { name: "Firebase", icon: "🐳", level: 70, category: "Tools", img: "/firebase.png" },
];

export default function Skill() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredSkills =
        activeCategory === "All"
            ? skills
            : skills.filter((skill) => skill.category === activeCategory);

    return (
        <section className="skills-section" id="skills">
            <div className="content-column">
                <h2 className="section-title">Technical Skills</h2>

                <div className="skills-categories">
                    {["All", "Backend", "Frontend", "Tools"].map((category) => (
                        <div
                            key={category}
                            className={`category-tab ${activeCategory === category ? "active" : ""}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </div>
                    ))}
                </div>

                <div className="skills-container">
                    {filteredSkills.map((skill, index) => (
                        <div className="skill-item" key={index}>
                            {skill.img ? (
                                <img className="skill-icon" src={skill.img} alt={skill.name} />
                            ) : (
                                <div className="skill-icon">{skill.icon}</div>
                            )}
                            <div className="skill-info">
                                <h3>{skill.name}</h3>
                                <div className="skill-bar-container">
                                    <div className="skill-bar" style={{ width: `${skill.level}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
