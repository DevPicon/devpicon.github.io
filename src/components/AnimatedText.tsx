'use client';

import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  phrases: string[];
}

export default function AnimatedText({ phrases }: AnimatedTextProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || phrases.length === 0) return;

    const currentPhrase = phrases[currentPhraseIndex % phrases.length];
    const isPhraseComplete = displayedText === currentPhrase;
    const delay = isPhraseComplete && !isDeleting ? 1600 : isDeleting ? 65 : 110;
    const timer = window.setTimeout(() => {
      if (isPhraseComplete && !isDeleting) {
        setIsDeleting(true);
      } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentPhraseIndex((index) => (index + 1) % phrases.length);
      } else if (isDeleting) {
        setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
      } else {
        setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [currentPhraseIndex, displayedText, isDeleting, phrases, reducedMotion]);

  return (
    <span className="animated-brand-phrase" aria-hidden="true">
      <span>{reducedMotion ? phrases.join(' · ') : displayedText}</span>
      {!reducedMotion && <span className="brand-typing-cursor">|</span>}
    </span>
  );
}
