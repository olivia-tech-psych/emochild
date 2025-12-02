/**
 * Setup Flow Page
 * Creature customization page for initial setup
 * Requirements: 2.1, 2.2, 2.6, 2.7
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SetupForm } from '@/components/SetupForm';
import { useEmotion } from '@/context/EmotionContext';
import { CreatureCustomization } from '@/types';
import styles from './page.module.css';

/**
 * Setup page component
 * 
 * Requirements:
 * - 2.1: Navigate to setup flow when Start button is clicked
 * - 2.2: Provide input fields for creature name and color selection
 * - 2.6: Save creature name and color to localStorage
 * - 2.7: Provide a way to change creature color and name later
 */
export default function SetupPage() {
  const router = useRouter();
  const { setCustomization } = useEmotion();

  /**
   * Handle customization completion
   * 
   * Requirements:
   * - 2.6: Save to context and localStorage
   * - Navigate to /creature after completion
   */
  const handleComplete = (customization: CreatureCustomization) => {
    // Save to context (which also saves to localStorage)
    setCustomization(customization);
    
    // Navigate to creature screen
    router.push('/creature');
  };

  return (
    <main className={styles.container}>
      <SetupForm onComplete={handleComplete} />
    </main>
  );
}
