'use client';

import { useState, useCallback } from 'react';
import {
  PROJECTS,
  SKILLS,
  EXPERIENCE,
  ACHIEVEMENTS,
  SOCIALS,
  BIO,
  HERO_NAME,
  HERO_LABEL,
  RESUME_URL,
  QUOTE,
  CONTACT_HEADING,
} from '../constants/data';

export type Context = 'root' | 'projects' | 'about' | 'experience';

export interface TerminalEntry {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: number;
}

const BOOT_SEQUENCE = [
  'booting prateek@portfolio ...',
  'mounting filesystems ... ok',
  'loading skills ... ok',
  'initializing terminal ... done',
  '─── type help to start ───',
];

export function useTerminal() {
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [currentContext, setCurrentContext] = useState<Context>('root');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const getSuggestions = useCallback((context: Context): string[] => {
    const base = ['help', 'whoami', 'about', 'projects', 'experience', 'skills', 'resume', 'contact'];
    switch (context) {
      case 'projects':
        return ['courseflow', 'ghostnote', 'pitchperfect', 'back', ...base];
      default:
        return base;
    }
  }, []);

  const generateOutput = useCallback((input: string): React.ReactNode => {
    const cmd = input.trim().toLowerCase();
    const parts = cmd.split(' ');
    const mainCmd = parts[0];
    const arg = parts.slice(1).join(' ');

    switch (mainCmd) {
      // ─── HELP ──────────────────────────────────────────────
      case 'help':
        return (
          <div>
            <div className="section-header">═══ COMMANDS ═══</div>
            <div className="terminal-help-grid">
              <span className="cmd">whoami</span><span className="desc">About me</span>
              <span className="cmd">about</span><span className="desc">Background & achievements</span>
              <span className="cmd">projects</span><span className="desc">Browse projects</span>
              <span className="cmd">experience</span><span className="desc">Work history</span>
              <span className="cmd">skills</span><span className="desc">Technical skills</span>
              <span className="cmd">resume</span><span className="desc">Download / view resume</span>
              <span className="cmd">contact</span><span className="desc">Get in touch</span>
              <span className="cmd">ls</span><span className="desc">List sections</span>
              <span className="cmd">clear</span><span className="desc">Clear terminal</span>
              <span className="cmd">cat {'<project>'}</span><span className="desc">Project details</span>
              <span className="cmd">tour</span><span className="desc">Auto-guided tour</span>
            </div>
            <div className="text-muted mt-3" style={{ fontSize: '0.75rem' }}>
              Tip: click any button below, or type a command + Enter. Tab for autocomplete.
            </div>
          </div>
        );

      // ─── WHOAMI ─────────────────────────────────────────────
      case 'whoami':
        return (
          <div>
            <div className="mb-1">
              <span className="welcome-name"><span className="highlight">{HERO_NAME}</span></span>
            </div>
            <div className="text-term-green mb-1" style={{ fontSize: '0.9rem' }}>
              {HERO_LABEL}
            </div>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>
              CS @ Shiv Nadar University · Class of 2027 · CGPA 9.20
            </div>
            <div className="text-muted-light mt-2" style={{ fontSize: '0.8rem', fontFamily: 'var(--font-body)', color: 'var(--muted-light)', maxWidth: 500, lineHeight: 1.5 }}>
              {QUOTE}
            </div>
          </div>
        );

      // ─── ABOUT ──────────────────────────────────────────────
      case 'about':
        setCurrentContext('about');
        return (
          <div>
            <div className="section-header">═══ ABOUT ═══</div>
            {BIO.map((line, i) => (
              <p key={i} className="mb-2" style={{ fontSize: '0.8rem', color: 'var(--muted-light)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                {line}
              </p>
            ))}

            <div className="section-subheader">achievements</div>
            {ACHIEVEMENTS.map((a) => (
              <div key={a.id} className="ach-badge">
                <span className="ach-icon">◆</span>
                <span className="ach-title">{a.title}</span>
                <span className="ach-desc">— {a.description}</span>
              </div>
            ))}

            <div className="text-muted mt-3" style={{ fontSize: '0.7rem' }}>
              try: experience, skills, contact, resume
            </div>
          </div>
        );

      // ─── PROJECTS ───────────────────────────────────────────
      case 'projects':
        setCurrentContext('projects');
        return (
          <div>
            <div className="section-header">═══ PROJECTS ═══</div>
            <div className="text-muted" style={{ fontSize: '0.7rem', marginBottom: '0.75rem' }}>
              {PROJECTS.length} projects · {PROJECTS.filter(p => p.live).length} live · {PROJECTS.filter(p => p.size === 'large').length} large · {[...new Set(PROJECTS.flatMap(p => p.tags))].length} techs
            </div>
            {PROJECTS.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-card-header">
                  <span className="project-card-name">
                    {project.name}
                    {project.live && <span className="live-badge">live</span>}
                  </span>
                  <span className={`project-size-tag ${project.size}`}>{project.size}</span>
                </div>
                <div className="project-card-tagline">{project.tagline}</div>
                <div className="project-card-desc project-card-desc-list">{project.description}</div>
                <div className="project-card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-card-tag">{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card-link">
                    → source on github
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-card-link" style={{ color: 'var(--term-green)' }}>
                      ↗ live demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      // ─── INDIVIDUAL PROJECT ─────────────────────────────────
      case 'courseflow':
      case 'ghostnote':
      case 'pitchperfect': {
        const project = PROJECTS.find((p) => p.id === mainCmd);
        if (project) {
          return (
            <div>
              <div className="project-card" style={{ borderColor: 'var(--accent)' }}>
                <div className="project-card-header">
                  <span className="project-card-name">
                    {project.name}
                    {project.live && <span className="live-badge">live</span>}
                  </span>
                  <span className={`project-size-tag ${project.size}`}>{project.size}</span>
                </div>
                <div className="project-card-tagline">{project.tagline}</div>
                <div className="project-card-desc" style={{ marginTop: '0.5rem' }}>
                  {project.description}
                </div>
                <div className="project-card-tags" style={{ marginTop: '0.75rem' }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-card-tag">{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card-link">
                    → source on github
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-card-link" style={{ color: 'var(--term-green)' }}>
                    ↗ live demo
                    </a>
                  )}
                </div>
              </div>
              <div className="text-muted" style={{ fontSize: '0.7rem' }}>try: projects, back</div>
            </div>
          );
        }
        return <span className="text-term-red">cat: {mainCmd}: No such project</span>;
      }

      // ─── EXPERIENCE ─────────────────────────────────────────
      case 'experience':
        setCurrentContext('experience');
        return (
          <div>
            <div className="section-header">═══ EXPERIENCE ═══</div>
            {EXPERIENCE.map((exp) => (
              <div key={exp.id} className="exp-card">
                <div className="exp-role">{exp.role}</div>
                <div className="exp-company">{exp.company}</div>
                <div className="exp-meta">{exp.date} · {exp.location}</div>
                {exp.bullets.map((b, i) => (
                  <div key={i} className="exp-bullet">{b}</div>
                ))}
              </div>
            ))}
            <div className="text-muted" style={{ fontSize: '0.7rem' }}>
              try: about, skills, resume
            </div>
          </div>
        );

      // ─── SKILLS ─────────────────────────────────────────────
      case 'skills':
        return (
          <div>
            <div className="section-header">═══ SKILLS ═══</div>
            <div className="skill-group">
              <div className="skill-group-label">Languages</div>
              <div>
                {SKILLS.languages.map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="skill-group">
              <div className="skill-group-label">Frameworks &amp; Tools</div>
              <div>
                {SKILLS.frameworks.map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="skill-group">
              <div className="skill-group-label">Infrastructure</div>
              <div>
                {SKILLS.infrastructure.map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="text-muted mt-2" style={{ fontSize: '0.7rem' }}>
              tip: try 'curl skills' for json output
            </div>
          </div>
        );

      // ─── RESUME ─────────────────────────────────────────────
      case 'resume':
        return (
          <div>
            <div className="section-header">═══ RESUME ═══</div>
            <div className="text-muted-light mb-3" style={{ fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>
              Full work history, education, and skills breakdown.
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="resume-cta">
                ↓ download resume (pdf)
              </a>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="resume-cta secondary">
                preview
              </a>
            </div>
            <div className="exp-card" style={{ fontSize: '0.8rem' }}>
              <div className="text-muted mb-1">quick summary</div>
              <div className="text-muted-light"><span className="text-term-green">education:</span> BTech CS @ Shiv Nadar University · Class of 2027</div>
              <div className="text-muted-light"><span className="text-term-green">cgpa:</span> 9.20 / 10.0</div>
              <div className="text-muted-light"><span className="text-term-green">current:</span> Software Engineering Intern @ HPE</div>
              <div className="text-muted-light"><span className="text-term-green">focus:</span> Distributed Systems, Backend Engineering, Systems Programming</div>
            </div>
          </div>
        );

      // ─── LS ─────────────────────────────────────────────────
      case 'ls':
        if (arg === 'projects') {
          return (
            <div>
              {PROJECTS.map((p) => (
                <div key={p.id} style={{ fontSize: '0.8rem' }}>
                  <span className="text-term-gray">drwxr-xr-x</span>{' '}
                  <span className="text-accent">{p.id}/</span>
                </div>
              ))}
              <div className="text-muted mt-2" style={{ fontSize: '0.7rem' }}>type {'<project-name>'} to open</div>
            </div>
          );
        }
        return (
          <div style={{ fontSize: '0.8rem' }}>
            <span className="text-term-green">drwxr-xr-x</span> <span className="text-accent">about/</span><br />
            <span className="text-term-green">drwxr-xr-x</span> <span className="text-accent">projects/</span><br />
            <span className="text-term-green">drwxr-xr-x</span> <span className="text-accent">experience/</span><br />
            <span className="text-term-green">-rw-r--r--</span> <span className="text-accent">skills</span><br />
            <span className="text-term-green">-rw-r--r--</span> <span className="text-accent">resume</span>
            <div className="text-muted mt-2" style={{ fontSize: '0.7rem' }}>type 'ls &lt;dir&gt;' to browse</div>
          </div>
        );

      // ─── CD ─────────────────────────────────────────────────
      case 'cd':
        if (!arg || arg === '~' || arg === '/') {
          setCurrentContext('root');
          return <span className="text-term-green">~/portfolio</span>;
        }
        if (arg === '..') {
          setCurrentContext('root');
          return <span className="text-term-green">../</span>;
        }
        if (['about', 'projects', 'experience'].includes(arg)) {
          setCurrentContext(arg as Context);
          return <span className="text-term-green">cd: {arg}/</span>;
        }
        return <span className="text-term-red">cd: {arg}: No such directory</span>;

      // ─── CAT ────────────────────────────────────────────────
      case 'cat':
        if (!arg) return <span className="text-term-red">cat: missing file operand</span>;
        if (arg === 'about') return generateOutput('about');
        if (arg === 'experience') return generateOutput('experience');
        if (arg === 'skills') return generateOutput('skills');
        if (PROJECTS.find((p) => p.id === arg)) return generateOutput(arg);
        return <span className="text-term-red">cat: {arg}: No such file or directory</span>;

      // ─── CURL ───────────────────────────────────────────────
      case 'curl':
        if (arg === 'skills') {
          return (
            <pre className="text-sm" style={{ color: 'var(--muted-light)' }}>
{JSON.stringify(
  { languages: SKILLS.languages, frameworks: SKILLS.frameworks, infrastructure: SKILLS.infrastructure },
  null,
  2
)}
            </pre>
          );
        }
        return <span className="text-term-red">curl: {arg || 'missing url'}</span>;

      // ─── OPEN ───────────────────────────────────────────────
      case 'open': {
        if (!arg) return <span className="text-term-red">open: missing project name</span>;
        const project = PROJECTS.find((p) => p.id === arg);
        if (project) {
          return (
            <span>
              opening {project.name} on github ...{' '}
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                {project.github}
              </a>
            </span>
          );
        }
        return <span className="text-term-red">open: {arg}: project not found</span>;
      }

      // ─── CONTACT ────────────────────────────────────────────
      case 'contact':
        return (
          <div>
            <div className="section-header">═══ {CONTACT_HEADING} ═══</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="contact-icon">
                    {s.icon === 'mail' ? '✉' : s.icon === 'github' ? '◆' : '◈'}
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        );

      // ─── TOUR ───────────────────────────────────────────────
      case 'tour':
        return (
          <div>
            <div className="section-header">═══ AUTO-TOUR ═══</div>
            <div className="text-muted-light mb-3" style={{ fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>
              Run these commands in order to get the full picture:
            </div>
            <div style={{ fontSize: '0.8rem', lineHeight: 2 }}>
              <div><span className="text-accent">1. whoami</span> <span className="text-muted">— who I am</span></div>
              <div><span className="text-accent">2. about</span> <span className="text-muted">— background & achievements</span></div>
              <div><span className="text-accent">3. experience</span> <span className="text-muted">— work history</span></div>
              <div><span className="text-accent">4. projects</span> <span className="text-muted">— what I've built</span></div>
              <div><span className="text-accent">5. skills</span> <span className="text-muted">— tech stack</span></div>
              <div><span className="text-accent">6. resume</span> <span className="text-muted">— download CV</span></div>
              <div><span className="text-accent">7. contact</span> <span className="text-muted">— get in touch</span></div>
            </div>
            <div className="text-muted mt-2" style={{ fontSize: '0.7rem' }}>
              click any command in the dock below or type them in.
            </div>
          </div>
        );

      // ─── PWD ────────────────────────────────────────────────
      case 'pwd':
        return <span className="text-term-lime">/home/prateek/portfolio</span>;

      // ─── UNAME ──────────────────────────────────────────────
      case 'uname':
        return (
          <div>
            <span className="text-term-lime">PortfolioOS</span> 2.1.0<br />
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>prateek@portfolio · 2026</span>
          </div>
        );

      // ─── ECHO ───────────────────────────────────────────────
      case 'echo':
        return <span>{parts.slice(1).join(' ')}</span>;

      // ─── CLEAR ──────────────────────────────────────────────
      case 'clear':
        setHistory([]);
        return null;

      // ─── HISTORY ────────────────────────────────────────────
      case 'history':
        return (
          <div>
            {commandHistory.slice(-20).map((c, i) => (
              <div key={i} className="text-muted" style={{ fontSize: '0.75rem' }}>
                <span className="text-term-gray">{String(i + 1).padStart(4, ' ')}</span>  {c}
              </div>
            ))}
          </div>
        );

      // ─── BACK / HOME ────────────────────────────────────────
      case 'back':
      case 'home':
        setCurrentContext('root');
        return <span className="text-term-green">← back to root</span>;

      case '':
        return null;

      // ─── FALLBACK ──────────────────────────────────────────
      default:
        if (['courseflow', 'ghostnote', 'pitchperfect'].includes(mainCmd)) {
          const found = PROJECTS.find((p) => p.id === mainCmd);
          if (found) {
            return (
              <div>
                <div className="project-card" style={{ borderColor: 'var(--accent)' }}>
                  <div className="project-card-header">
                    <span className="project-card-name">
                    {found.name}
                    {found.live && <span className="live-badge">live</span>}
                  </span>
                    <span className={`project-size-tag ${found.size}`}>{found.size}</span>
                  </div>
                  <div className="project-card-tagline">{found.tagline}</div>
                  <div className="project-card-desc" style={{ marginTop: '0.5rem' }}>{found.description}</div>
                  <div className="project-card-tags" style={{ marginTop: '0.75rem' }}>
                    {found.tags.map((tag) => (
                      <span key={tag} className="project-card-tag">{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <a href={found.github} target="_blank" rel="noopener noreferrer" className="project-card-link">
                      → source on github
                    </a>
                    {found.live && (
                      <a href={found.live} target="_blank" rel="noopener noreferrer" className="project-card-link" style={{ color: 'var(--term-green)' }}>
                        ↗ live demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        }
        return (
          <span className="text-term-red">
            {mainCmd}: command not found. type 'help' for available commands.
          </span>
        );
    }
  }, [commandHistory]);

  const executeCommand = useCallback(
    (input: string): React.ReactNode => {
      const trimmed = input.trim();
      if (!trimmed) return null;

      if (trimmed === 'clear') {
        setHistory([]);
        return null;
      }

      const output = generateOutput(trimmed);

      const newEntry: TerminalEntry = {
        id: `${Date.now()}-${Math.random()}`,
        command: trimmed,
        output,
        timestamp: Date.now(),
      };

      setHistory((prev) => [...prev, newEntry]);
      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      return output;
    },
    [generateOutput]
  );

  const getBootSequence = useCallback(() => BOOT_SEQUENCE, []);

  return {
    history,
    currentContext,
    commandHistory,
    historyIndex,
    setHistoryIndex,
    executeCommand,
    getSuggestions,
    getBootSequence,
    setCurrentContext,
  };
}
