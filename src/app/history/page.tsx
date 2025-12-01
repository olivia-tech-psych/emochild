/**
 * History page - Emotion Log History Screen
 * Displays all past emotion logs in reverse chronological order
 * Requirements: 6.1, 6.2, 7.2, 7.3, 7.5
 */

'use client';

import { useEmotion } from '@/context/EmotionContext';
import { LogHistory } from '@/components/LogHistory';
import { Navigation } from '@/components/Navigation';
import styles from './page.module.css';

/**
 * History page component
 * 
 * Requirements:
 * - 6.1: Display logs in reverse chronological order
 * - 6.2: Show timestamp, text, and action type
 * - 7.2: Show emoji based on action type
 * - 7.3: Handle deletion through context with confirmation dialog
 * - 7.5: Keyboard accessibility and semantic HTML
 */
export default function HistoryPage() {
  const { logs, deleteLog } = useEmotion();

  return (
    <main className={styles.container}>
      <nav className={styles.navigation} aria-label="Page navigation">
        <Navigation type="toMain" />
      </nav>
      
      <header>
        <h1 className={styles.title}>Your Emotional Journey</h1>
      </header>
      
      <section className={styles.historyContainer} aria-label="Emotion log history">
        <LogHistory logs={logs} onDelete={deleteLog} />
      </section>
    </main>
  );
}
