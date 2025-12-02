/**
 * Navigation component
 * Provides navigation links between main and history pages
 * Requirements: 10.3, 7.5
 */

import Link from 'next/link';
import styles from './Navigation.module.css';

export interface NavigationProps {
  /**
   * Type of navigation link to display
   * - 'toHistory': Shows "View History" link (for main page)
   * - 'toMain': Shows "Back to Creature" link (for history page)
   */
  type: 'toHistory' | 'toMain';
}

/**
 * Navigation component
 * 
 * Requirements:
 * - 10.3: Smooth transitions without page reloads (Next.js Link handles this)
 * - 7.5: Keyboard accessibility with focus indicators
 */
export function Navigation({ type }: NavigationProps) {
  if (type === 'toHistory') {
    return (
      <Link 
        href="/history" 
        className={styles.historyLink}
        aria-label="View your emotion log history"
      >
        View History
      </Link>
    );
  }

  return (
    <Link 
      href="/creature" 
      className={styles.backLink}
      aria-label="Return to main page with creature"
    >
      ← Back to Creature
    </Link>
  );
}
