'use client';

import { useState, useEffect } from 'react';

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

interface TerminalHeaderProps {
  isMobile: boolean;
}

export function TerminalHeader({ isMobile }: TerminalHeaderProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-header">
      {!isMobile && (
        <div className="terminal-buttons">
          <span className="terminal-btn close" />
          <span className="terminal-btn minimize" />
          <span className="terminal-btn maximize" />
        </div>
      )}
      <div className="terminal-title">
        prateek@portfolio — ~/portfolio
      </div>
      {!isMobile && <div className="terminal-clock">{formatTime(time)}</div>}
    </div>
  );
}
