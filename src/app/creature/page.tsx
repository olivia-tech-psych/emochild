/**
 * Creature Page - Main Interaction Screen
 * Main screen where users interact with their creature and log emotions
 * Requirements: 3.1, 4.1, 5.1, 6.1
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEmotion } from '@/context/EmotionContext';
import { Creature } from '@/components/Creature';
import { SafetyBar } from '@/components/SafetyBar';
import { EmotionInput } from '@/components/EmotionInput';
import { ActionButtons } from '@/components/ActionButtons';
import { QuickEmotions } from '@/components/QuickEmotions';
import { MicroSentence } from '@/components/MicroSentence';
import { Navigation } from '@/components/Navigation';
import type { EmotionAction, PastelColor, QuickEmotion } from '@/types';
import { COLOR_HEX_MAP } from '@/utils/colorMapping';
import styles from './page.module.css';

/**
 * Creature page component
 * 
 * Requirements:
 * - 3.1: Integrate QuickEmotions component for faster logging
 * - 4.1: Integrate text color selection in EmotionInput
 * - 5.1: Display MicroSentence when emotions are expressed
 * - 6.1: Pass customization to Creature component for color display
 */
export default function CreaturePage() {
  const router = useRouter();
  const {
    logs,
    creatureState,
    safetyScore,
    customization,
    currentMicroSentence,
    textColorPreference,
    addLog,
    getNextMicroSentence,
    setTextColorPreference,
  } = useEmotion();

  const [emotionText, setEmotionText] = useState('');
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [showMicroSentence, setShowMicroSentence] = useState(false);
  const [displayedSentence, setDisplayedSentence] = useState<string>('');

  // Route guard: Redirect to setup if no customization exists
  useEffect(() => {
    if (!customization.name) {
      router.push('/setup');
    }
  }, [customization, router]);

  // Ensure micro-sentence is hidden on mount/refresh
  useEffect(() => {
    setShowMicroSentence(false);
    setDisplayedSentence('');
  }, []);

  // Don't render if no customization (will redirect)
  if (!customization.name) {
    return null;
  }

  // Handle quick emotion selection
  // Requirement 3.1: Prefill input when quick emotion is clicked
  const handleQuickEmotionSelect = (emotion: QuickEmotion) => {
    setEmotionText(emotion);
  };

  // Handle text color change
  // Requirement 4.1: Update selected text color
  // Requirement 8.2: Persist text color preference
  const handleTextColorChange = (color: PastelColor | 'white') => {
    setTextColorPreference(color);
  };

  // Handle emotion submission
  const handleSubmit = (action: EmotionAction) => {
    const trimmedText = emotionText.trim();

    // Validate input
    if (trimmedText.length === 0) {
      setShowEmptyError(true);
      return;
    }

    // Determine if the quick emotion was used
    const quickEmotion = isQuickEmotion(trimmedText) ? trimmedText as QuickEmotion : undefined;

    // Add log with text color and quick emotion
    // Requirement 8.2: Use persisted text color preference
    addLog(trimmedText, action, textColorPreference, quickEmotion);

    // Requirement 5.1: Show micro-sentence for expressed emotions
    if (action === 'expressed') {
      const sentence = getNextMicroSentence();
      setDisplayedSentence(sentence);
      setShowMicroSentence(true);
    }

    // Reset form
    setEmotionText('');
    setShowEmptyError(false);
    // Text color preference is already persisted in context (Requirement 8.2)
  };

  // Helper to check if text matches a quick emotion
  const isQuickEmotion = (text: string): boolean => {
    const quickEmotions: QuickEmotion[] = [
      'stressed', 'anxious', 'calm', 'excited', 'sad',
      'angry', 'confused', 'grateful', 'curious', 'scared'
    ];
    return quickEmotions.includes(text.toLowerCase() as QuickEmotion);
  };

  // Handle micro-sentence dismissal
  const handleMicroSentenceDismiss = () => {
    setShowMicroSentence(false);
  };

  return (
    <main className={styles.main}>
      {/* Skip link for accessibility */}
      <a href="#emotion-input" className={styles.skipLink}>
        Skip to emotion input
      </a>

      {/* Creature section - Requirement 6.1: Pass customization */}
      <section className={styles.creatureSection}>
        <Creature state={creatureState} customization={customization} />
        <h2 className={styles.creatureName} style={{ color: COLOR_HEX_MAP[customization.color] }}>
          {customization.name}
        </h2>
      </section>

      {/* Micro-sentence display - Requirement 5.1 */}
      {showMicroSentence && displayedSentence && (
        <div className={styles.microSentenceSection}>
          <MicroSentence
            sentence={displayedSentence}
            onDismiss={handleMicroSentenceDismiss}
          />
        </div>
      )}

      {/* Safety bar section */}
      <section className={styles.safetySection}>
        <SafetyBar score={safetyScore} />
      </section>

      {/* Quick emotions section - Requirement 3.1 */}
      <section className={styles.quickEmotionsSection}>
        <QuickEmotions onEmotionSelect={handleQuickEmotionSelect} />
      </section>

      {/* Emotion input section - Requirement 4.1, 8.2 */}
      <section className={styles.inputSection}>
        <EmotionInput
          value={emotionText}
          onChange={setEmotionText}
          maxLength={100}
          showEmptyError={showEmptyError}
          initialText={emotionText}
          textColor={textColorPreference}
          onTextColorChange={handleTextColorChange}
        />
      </section>

      {/* Action buttons section */}
      <section className={styles.actionsSection}>
        <ActionButtons
          onExpress={() => handleSubmit('expressed')}
          onSuppress={() => handleSubmit('suppressed')}
          disabled={emotionText.trim().length === 0}
        />
      </section>

      {/* Navigation section */}
      <nav className={styles.navigationSection}>
        <div className={styles.navigationLinks}>
          <Link href="/" className={styles.landingLink}>
            ← Home
          </Link>
          <Link href="/settings" className={styles.settingsLink}>
            ⚙️ Settings
          </Link>
          <Navigation type="toHistory" />
        </div>
      </nav>
    </main>
  );
}
