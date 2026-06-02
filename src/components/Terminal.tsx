'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { TerminalHeader } from './TerminalHeader';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { StatusBar } from './StatusBar';
import { CommandDock } from './CommandDock';
import { useTerminal } from '../hooks/useTerminal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { HERO_NAME, HERO_LABEL, QUOTE } from '../constants/data';

export function Terminal() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootOutput, setBootOutput] = useState<string[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const bootInitRef = useRef(false);

  const {
    history,
    currentContext,
    commandHistory,
    historyIndex,
    setHistoryIndex,
    executeCommand,
    getSuggestions,
    getBootSequence,
  } = useTerminal();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (bootInitRef.current) return;
    bootInitRef.current = true;

    if (reducedMotion) {
      setIsBooting(false);
      setBootOutput(getBootSequence());
      return;
    }

    const bootSequence = getBootSequence();
    let delay = 0;

    bootSequence.forEach((line, i) => {
      delay += i === 0 ? 250 : 300;
      setTimeout(() => {
        setBootOutput((prev) => [...prev, line]);
        if (i === bootSequence.length - 1) {
          setTimeout(() => setIsBooting(false), 400);
        }
      }, delay);
    });
  }, [getBootSequence, reducedMotion]);

  // Scroll to bottom on new output
  useEffect(() => {
    if (!isBooting && terminalBodyRef.current) {
      requestAnimationFrame(() => {
        if (terminalBodyRef.current) {
          terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
      });
    }
  }, [history, bootOutput, isBooting]);

  // Hide welcome after first command
  useEffect(() => {
    if (history.length > 0 && showWelcome) {
      setShowWelcome(false);
    }
  }, [history, showWelcome]);

  // Auto-run whoami on mobile
  useEffect(() => {
    if (!isBooting && isMobile && history.length === 0) {
      executeCommand('whoami');
    }
  }, [isBooting, isMobile, history.length, executeCommand]);

  const handleClick = useCallback(() => {
    if (!isMobile) {
      const input = document.querySelector('.terminal-input') as HTMLInputElement;
      input?.focus();
    }
  }, [isMobile]);

  const handleCommand = useCallback(
    (cmd: string) => {
      executeCommand(cmd);
    },
    [executeCommand]
  );

  const suggestions = getSuggestions(currentContext);

  return (
    <div className="terminal-page" onClick={handleClick}>
      <div className="terminal-window">
        <TerminalHeader isMobile={isMobile} />

        <div className="terminal-body" ref={terminalBodyRef}>
          {isBooting ? (
            <div className="terminal-boot">
              {bootOutput.map((line, i) => (
                <div key={i} className="terminal-boot-line">
                  <span className="text-term-green">$</span> {line}
                </div>
              ))}
              <span className="terminal-cursor">_</span>
            </div>
          ) : (
            <>
              {showWelcome && history.length === 0 && (
                <div className="terminal-welcome">
                  <div>
                    <div className="welcome-name">
                      <span className="highlight">{HERO_NAME}</span>
                    </div>
                    <div className="welcome-label">{'>'} {HERO_LABEL}</div>
                  </div>
                  <div className="welcome-divider" />
                  <div className="welcome-tagline">{QUOTE}</div>
                  <div
                    className="text-muted"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '0.5rem' }}
                  >
                    type <span className="text-accent">help</span> or click a command below to explore
                  </div>
                </div>
              )}

              <TerminalOutput history={history} />

              {!isMobile && (
                <TerminalInput
                  onSubmit={handleCommand}
                  commandHistory={commandHistory}
                  historyIndex={historyIndex}
                  setHistoryIndex={setHistoryIndex}
                />
              )}
            </>
          )}
        </div>

        {/* Always-visible command dock */}
        <CommandDock
          suggestions={suggestions}
          onCommand={handleCommand}
          isMobile={isMobile}
        />

        {/* Persistent status bar */}
        <StatusBar />
      </div>
    </div>
  );
}
