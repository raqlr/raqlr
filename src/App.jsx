import { useEffect } from "react";
import AsciiPortrait from "./components/AsciiPortrait";
import ThemeToggle from "./components/ThemeToggle";

const skills = {
  Languages: ["C", "C++", "Java", "JavaScript", "HTML5", "CSS3", "Ruby"],
  Databases: ["SQL", "MySQL", "MariaDB", "PostgreSQL", "Oracle"],
  "Tools & Platforms": ["Linux", "Git", "React", "Vite", "Microsoft Office", "Google Drive"],
  Design: ["UI/UX Design", "Figma"],
};

const projects = [
  {
    title: "PSet SQL - 1",
    desc: "Database project generating, solving, and documenting a general database system using Linux, MySQL/MariaDB, PostgreSQL, and the Oracle platform.",
    tags: ["SQL", "MySQL", "PostgreSQL", "Linux"],
    href: "https://github.com/raqlr/uvv_bd_1_cc1m",
  },
  {
    title: "WeRecycle",
    desc: "A website specialised in collecting and recycling waste, built across Web Software Construction, Database Design, and UX/UI courses at UVV.",
    tags: ["JavaScript", "HTML5", "CSS3", "Ruby", "SQL"],
    href: "https://disciplinas.uvv.br/cc1m/g2/",
  },
  {
    title: "Rabiscoo",
    desc: "An interactive browser game built in HTML, playable directly in the browser.",
    tags: ["HTML5", "JavaScript", "Game"],
    href: "https://github.com/raqlr/Rabiscoo",
  },
];

export default function App() {
  useEffect(() => {
    const phrases = ["Computer Science Student", "Active Learner / Researcher", "Student Developer"];
    let pi = 0, ci = 0, deleting = false;
    const el = document.getElementById("typed");
    if (!el) return;
    const tick = () => {
      const phrase = phrases[pi];
      if (!deleting) {
        el.textContent = phrase.slice(0, ci + 1);
        ci++;
        if (ci === phrase.length) { deleting = true; setTimeout(tick, 1800); return; }
      } else {
        el.textContent = phrase.slice(0, ci - 1);
        ci--;
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 400); return; }
      }
      setTimeout(tick, deleting ? 45 : 80);
    };
    const t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="portfolio">
      <div className="topbar"><ThemeToggle /></div>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-text">
          <h1>Raquel<br />Rigoni</h1>
          <p className="typing-line"><span id="typed"></span><span className="cursor">|</span></p>
          <p className="bio">
            Computer Science student based in Portugal. I build for the web —
            UI/UX design, database development, and software that works.
            Fluent in Portuguese, English, and SQL.
          </p>
          <a href="#work" className="btn-view">
            View Projects
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="2" y1="13" x2="13" y2="2"/>
              <polyline points="5,2 13,2 13,10"/>
            </svg>
          </a>
          <nav className="links">
            <a href="https://github.com/raqlr" className="icon-btn" aria-label="GitHub" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/raql" className="icon-btn" aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:rrbcostaa@gmail.com" className="icon-btn" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </nav>
        </div>
        <div className="hero-portrait">
          <AsciiPortrait size={400} color="var(--accent)" />
        </div>
      </section>

      {/* ── About ── */}
      <section className="about" id="about">
        <p className="section-label">About</p>
        <div className="about-grid">
          <div className="about-text">
            <p>I'm Raquel Rigoni de Brito Costa — a Computer Science student who grew up and completed secondary education in Vancouver, Canada, and am now based in Portugal.</p>
            <p>My focus is on database management, analysis, and software development. I have hands-on experience with UI/UX design for web projects and database development across Oracle, MariaDB, MySQL, PostgreSQL, and Linux platforms.</p>
            <p>I'm open to exploring new areas and gaining real-world experience. Currently seeking internships in IT and software development.</p>
          </div>
          <div className="skills-col">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="skill-group">
                <p className="skill-group-label">{group}</p>
                <div className="skill-tags">
                  {items.map(s => (
                    <span key={s} className={`skill-tag${["Languages","Databases"].includes(group) ? " accent" : ""}`}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work ── */}
      <section className="work" id="work">
        <p className="section-label">Selected work</p>
        <div className="projects">
          {projects.map(p => (
            <a key={p.title} href={p.href} className="project-card" target="_blank" rel="noreferrer">
              <div className="project-top">
                <span className="project-title">{p.title}</span>
                <span className="project-arrow">↗</span>
              </div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 Raquel Rigoni</span>
        <span>Built with React + Vite</span>
      </footer>
    </div>
  );
}