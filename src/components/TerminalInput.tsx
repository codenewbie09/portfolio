'use client';

import { useState, useRef, useEffect, type KeyboardEvent } from 'react';

const COMMANDS = [
  'help', 'whoami', 'about', 'projects', 'experience', 'skills', 'resume', 'contact',
  'ls', 'cd', 'cat', 'open', 'curl', 'pwd', 'uname', 'clear', 'history', 'echo', 'back',
  'tour',
  'courseflow', 'ghostnote', 'pitchperfect',
];

interface TerminalInputProps {
  onSubmit: (value: string) => void;
  commandHistory: string[];
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
}

export function TerminalInput({
  onSubmit,
  commandHistory,
  historyIndex,
  setHistoryIndex,
}: TerminalInputProps) {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getCompletion = (currentInput: string): string => {
    if (!currentInput) return '';
    const lower = currentInput.toLowerCase();
    const match = COMMANDS.find((cmd) => cmd.startsWith(lower) && cmd !== lower);
    return match || '';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        e.preventDefault();
        const completion = getCompletion(input);
        if (completion) {
          setInput(completion);
          setSuggestion('');
        }
        return;
      }
      if (input.trim()) {
        onSubmit(input);
        setInput('');
        setSuggestion('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const completion = getCompletion(input);
      if (completion) {
        setInput(completion);
        setSuggestion('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
        setSuggestion('');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
        setSuggestion('');
      }
    } else if (e.key === 'Escape') {
      setSuggestion('');
    } else if (e.key === 'ArrowRight' && suggestion) {
      e.preventDefault();
      setInput(suggestion);
      setSuggestion('');
    }
  };

  const handleChange = (value: string) => {
    setInput(value);
    if (value) {
      const completion = getCompletion(value);
      setSuggestion(completion);
    } else {
      setSuggestion('');
    }
  };

  return (
    <div className="terminal-input-line">
      <span className="terminal-prompt">prateek@portfolio:~$ </span>
      <div className="terminal-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input"
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal command input"
        />
        {suggestion && (
          <span className="terminal-suggestion-text">
            {suggestion.slice(input.length)}
          </span>
        )}
      </div>
      {input && (
        <span className="terminal-hint">⏎ run</span>
      )}
    </div>
  );
}
