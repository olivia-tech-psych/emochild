/**
 * Landing Page - Root Route
 * Welcoming entry point that explains EmoChild concept
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEmotion } from '@/context/EmotionContext';
import { LandingHero } from '@/components/LandingHero';

/**
 * Landing page component
 * 
 * Requirements:
 * - 1.1: Display app name "EmoChild: Your Inner Child in Your Pocket"
 * - 1.2: Show brief explanation with pastel glow effect
 * - 1.3: Apply soft pastel glow on dark mode background
 * - 1.4: Display landing page on every app visit/refresh
 * - 1.5: Provide Start button that navigates to setup flow
 * - 2.1: Navigate to setup or creature based on customization state
 */
export default function LandingPage() {
  const router = useRouter();
  const { customization } = useEmotion();

  // Requirement 1.5, 2.1: Navigate to setup if no customization, otherwise to creature
  const handleStart = () => {
    if (customization.name) {
      // User has already completed setup, go to creature
      router.push('/creature');
    } else {
      // First-time user, go to setup
      router.push('/setup');
    }
  };

  return <LandingHero onStart={handleStart} />;
}
