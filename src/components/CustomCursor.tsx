'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: fine)').matches;
  });
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { stiffness: 120, damping: 18 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const mediaQuery = window.matchMedia('(pointer: fine)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX - 3);
      cursorY.set(e.clientY - 3);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      }
    };
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleHoverStart);
      link.addEventListener('mouseleave', handleHoverEnd);
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const el = node as HTMLElement;
            if (el.matches('a, button') || el.querySelector('a, button')) {
              el.addEventListener('mouseenter', handleHoverStart);
              el.addEventListener('mouseleave', handleHoverEnd);
            }
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleHoverStart);
        link.removeEventListener('mouseleave', handleHoverEnd);
      });
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [cursorX, cursorY, reducedMotion]);

  if (reducedMotion || !isFinePointer || !isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full pointer-events-none z-[99999] bg-[var(--accent)]"
        style={{ x: cursorX, y: cursorY }}
        animate={{ opacity: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-[22px] h-[22px] rounded-full pointer-events-none z-[99998] border-[1.5px] border-[var(--accent)] bg-transparent"
        style={{ x: springX, y: springY }}
        animate={{ scale: isHovering ? 1.8 : 1 }}
        transition={{ stiffness: 120, damping: 18 }}
      />
    </>
  );
}