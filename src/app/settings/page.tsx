/**
 * Settings Page
 * Page for editing creature customization
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SetupForm } from '@/components/SetupForm';
import { useEmotion } from '@/context/EmotionContext';
import { CreatureCustomization } from '@/types';
import styles from './page.module.css';

/**
 * Settings page component
 * Allows users to edit their creature customization
 */
export default function SettingsPage() {
  const router = useRouter();
  const { customization, setCustomization } = useEmotion();

  /**
   * Handle customization update
   */
  const handleComplete = (newCustomization: CreatureCustomization) => {
    // Save to context (which also saves to localStorage)
    setCustomization(newCustomization);
    
    // Navigate back to creature screen
    router.push('/creature');
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Link href="/creature" className={styles.backLink}>
          ← Back to Creature
        </Link>
        <h1 className={styles.title}>Settings</h1>
      </div>
      <SetupForm 
        onComplete={handleComplete}
        initialCustomization={customization}
        isEditing={true}
      />
    </main>
  );
}
