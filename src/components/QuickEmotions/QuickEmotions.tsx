/**
 * QuickEmotions Component
 * Quick emotion buttons for faster emotion logging
 * Requirements: 3.1, 3.2
 */

'use client';

import React, { useRef } from 'react';
import styles from './QuickEmotions.module.css';
import { QuickEmotion } from '@/types';

export interface QuickEmotionsProps {
  /** Callback when an emotion button is clicked */
  onEmotionSelect: (emotion: QuickEmotion) => void;
}

// All 10 quick emotions
const QUICK_EMOTIONS: QuickEmotion[] = [
  'stressed',
  'anxious',
  'calm',
  'excited',
  'sad',
  'angry',
  'confused',
  'grateful',
  'curious',
  'scared'
];

// Emotion labels for display
const EMOTION_LABELS: Record<QuickEmotion, string> = {
  stressed: 'Stressed',
  anxious: 'Anxious',
  calm: 'Calm',
  excited: 'Excited',
  sad: 'Sad',
  angry: 'Angry',
  confused: 'Confused',
  grateful: 'Grateful',
  curious: 'Curious',
  scared: 'Scared'
};

// Map emotions to appropriate pastel colors
const EMOTION_COLORS: Record<QuickEmotion, string> = {
  stressed: 'red',
  anxious: 'orange',
  calm: 'mint',
  excited: 'yellow',
  sad: 'blue',
  angry: 'red',
  confused: 'lavender',
  grateful: 'pink',
  curious: 'peach',
  scared: 'lavender'
};

/**
 * QuickEmotions component
 * 
 * Requirements:
 * - 3.1: Display 10 quick emotion buttons
 * - 3.2: Prefill text input when clicked
 */
export function QuickEmotions({ onEmotionSelect }: QuickEmotionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle emotion button click
  const handleEmotionClick = (emotion: QuickEmotion) => {
    onEmotionSelect(emotion);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, emotion: QuickEmotion) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onEmotionSelect(emotion);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || 
               e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = QUICK_EMOTIONS.indexOf(emotion);
      let nextIndex: number;
      
      if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % QUICK_EMOTIONS.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + QUICK_EMOTIONS.length) % QUICK_EMOTIONS.length;
      } else if (e.key === 'ArrowDown') {
        // Move down by 5 (next row in 5-column grid)
        nextIndex = (currentIndex + 5) % QUICK_EMOTIONS.length;
      } else {
        // ArrowUp: Move up by 5 (previous row)
        nextIndex = (currentIndex - 5 + QUICK_EMOTIONS.length) % QUICK_EMOTIONS.length;
      }
      
      // Focus the next emotion button
      const buttons = containerRef.current?.querySelectorAll('button');
      if (buttons && buttons[nextIndex]) {
        buttons[nextIndex].focus();
      }
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} id="quick-emotions-label">
        Quick Emotions
      </label>
      
      <div 
        ref={containerRef}
        className={styles.buttonGrid}
        role="group"
        aria-labelledby="quick-emotions-label"
      >
        {QUICK_EMOTIONS.map((emotion) => (
          <button
            key={emotion}
            type="button"
            className={`${styles.emotionButton} ${styles[`emotion-${EMOTION_COLORS[emotion]}`]}`}
            onClick={() => handleEmotionClick(emotion)}
            onKeyDown={(e) => handleKeyDown(e, emotion)}
            aria-label={`Select ${EMOTION_LABELS[emotion]} emotion`}
            data-emotion={emotion}
          >
            {EMOTION_LABELS[emotion]}
          </button>
        ))}
      </div>
    </div>
  );
}
