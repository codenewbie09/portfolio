'use client';

import type { TerminalEntry } from '../hooks/useTerminal';

interface TerminalOutputProps {
  history: TerminalEntry[];
}

export function TerminalOutput({ history }: TerminalOutputProps) {
  return (
    <div className="terminal-output">
      {history.map((entry) => (
        <div key={entry.id} className="terminal-entry">
          <div className="terminal-command-line">
            <span className="terminal-prompt">prateek@portfolio:~$ </span>
            <span className="terminal-command">{entry.command}</span>
          </div>
          {entry.output && (
            <div className="terminal-result">
              {entry.output}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}