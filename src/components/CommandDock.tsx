'use client';

interface CommandDockProps {
  suggestions: string[];
  onCommand: (cmd: string) => void;
  isMobile: boolean;
}

const PRIMARY_COMMANDS = ['whoami', 'projects', 'experience', 'skills', 'about'];
const MOBILE_ALWAYS = ['whoami', 'projects', 'experience', 'about', 'help', 'resume', 'contact'];

export function CommandDock({ suggestions, onCommand, isMobile }: CommandDockProps) {
  if (isMobile) {
    // On mobile: always show essentials + contextual project buttons
    const contextual = suggestions.filter(
      (c) => !MOBILE_ALWAYS.includes(c) && !PRIMARY_COMMANDS.includes(c)
    );
    const deduped = [...new Set([...MOBILE_ALWAYS.filter((c) => suggestions.includes(c)), ...contextual])];
    return (
      <div className="terminal-command-dock">
        <span className="dock-label">tap</span>
        {deduped.map((cmd) => (
          <button
            key={cmd}
            className={`dock-btn ${PRIMARY_COMMANDS.includes(cmd) ? 'primary' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onCommand(cmd);
            }}
          >
            {cmd}
          </button>
        ))}
      </div>
    );
  }

  // Desktop: full set, primary first
  const ordered = [
    ...PRIMARY_COMMANDS.filter((c) => suggestions.includes(c)),
    ...suggestions.filter((c) => !PRIMARY_COMMANDS.includes(c)),
  ];
  const seen = new Set<string>();
  const deduped = ordered.filter((c) => {
    if (seen.has(c)) return false;
    seen.add(c);
    return true;
  });

  return (
    <div className="terminal-command-dock">
      <span className="dock-label">cmd</span>
      {deduped.map((cmd) => (
        <button
          key={cmd}
          className={`dock-btn ${PRIMARY_COMMANDS.includes(cmd) ? 'primary' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onCommand(cmd);
          }}
        >
          {cmd}
        </button>
      ))}
    </div>
  );
}
