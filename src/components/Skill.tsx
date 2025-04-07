import { SkillCategory, skills } from '../data/skills';
import './styles/skill.css';
import { useState } from 'react';

export default function Skill() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('All');

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section className="skills-section" id="skills">
      <div className="content-column">
        <h2 className="section-title">Technical Skills</h2>

        <div className="skills-categories">
          {['All', 'Backend', 'Frontend', 'Tools'].map((category) => (
            <div
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category as SkillCategory)}
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
                  <div
                    className="skill-bar"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
