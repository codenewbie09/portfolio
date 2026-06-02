'use client';

import { SOCIALS, RESUME_URL } from '../constants/data';

export function StatusBar() {
  return (
    <div className="terminal-status-bar">
      <div>
        <span style={{ color: 'var(--term-green)' }}>prateek@portfolio</span>
        <span className="status-separator">|</span>
        <span style={{ color: 'var(--accent)' }}>~/portfolio</span>
      </div>
      <div className="status-bar-links">
        <a href={SOCIALS.find((s) => s.icon === 'mail')?.href} title="Email">
          ✉ email
        </a>
        <span className="status-separator" />
        <a href={SOCIALS.find((s) => s.icon === 'github')?.href} target="_blank" rel="noopener noreferrer">
          ◈ github
        </a>
        <span className="status-separator" />
        <a href={SOCIALS.find((s) => s.icon === 'linkedin')?.href} target="_blank" rel="noopener noreferrer">
          ◉ linkedin
        </a>
        <span className="status-separator" />
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--term-green)' }}>
          ↓ resume
        </a>
      </div>
    </div>
  );
}
