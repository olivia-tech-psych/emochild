/**
 * LogHistory Component
 * Displays emotion logs in reverse chronological order
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4
 */

import React, { useState } from 'react';
import { EmotionLog } from '@/types';
import { COLOR_HEX_MAP } from '@/utils/colorMapping';
import styles from './LogHistory.module.css';

interface LogHistoryProps {
  logs: EmotionLog[];
  onDelete: (logId: string) => void;
}

/**
 * Format timestamp as human-readable date
 * Requirement 6.2: Display timestamp in readable format
 */
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  if (isToday) {
    return `Today, ${timeString}`;
  } else if (isYesterday) {
    return `Yesterday, ${timeString}`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    }) + `, ${timeString}`;
  }
}

/**
 * LogHistory component
 * 
 * Requirements:
 * - 6.1: Display logs in reverse chronological order
 * - 6.2: Show timestamp, text, and action type
 * - 6.3: Display empty state message
 * - 6.4: Implement scrolling for long lists
 * - 6.5: Use visual indicators for expressed vs suppressed
 * - 7.1: Display text in saved color
 * - 7.2: Show emoji based on action type
 * - 7.3: Add delete button with confirmation
 * - 7.4: Apply pastel dividers between entries
 * - 7.5: Keyboard accessibility and semantic HTML
 */
export function LogHistory({ logs, onDelete }: LogHistoryProps) {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  // Requirement 6.3: Empty state message
  if (logs.length === 0) {
    return (
      <div className={styles.emptyState} role="status" aria-live="polite">
        <p className={styles.emptyMessage}>
          No emotions logged yet. Start by sharing how you're feeling! 🌱
        </p>
      </div>
    );
  }
  
  // Requirement 6.1: Sort logs in reverse chronological order (newest first)
  const sortedLogs = [...logs].sort((a, b) => b.timestamp - a.timestamp);
  
  /**
   * Handle delete button click
   * Requirement 7.3: Show confirmation dialog
   */
  const handleDeleteClick = (logId: string) => {
    setDeleteConfirmId(logId);
  };
  
  /**
   * Handle delete confirmation
   * Requirement 7.3: Confirm deletion and remove log
   */
  const handleConfirmDelete = (logId: string) => {
    onDelete(logId);
    setDeleteConfirmId(null);
  };
  
  /**
   * Handle delete cancellation
   */
  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
  };
  
  return (
    <div className={styles.container}>
      <ul 
        className={styles.logList}
        role="list"
        aria-label={`Emotion log history with ${sortedLogs.length} ${sortedLogs.length === 1 ? 'entry' : 'entries'}`}
      >
        {sortedLogs.map((log, index) => {
          // Requirement 7.1: Get text color from log or default to white
          const textColor = log.textColor || 'white';
          const textColorHex = COLOR_HEX_MAP[textColor];
          const isConfirming = deleteConfirmId === log.id;
          
          return (
            <React.Fragment key={log.id}>
              <li
                data-testid="log-item"
                className={`${styles.logItem} ${
                  log.action === 'expressed' ? styles.expressed : styles.suppressed
                }`}
                role="listitem"
              >
                {/* Requirement 7.2: Visual indicator for action type */}
                <span 
                  className={styles.icon} 
                  aria-label={log.action === 'expressed' ? 'Expressed emotion' : 'Suppressed emotion'}
                  role="img"
                >
                  {log.action === 'expressed' ? '🌱' : '🌑'}
                </span>
                
                <div className={styles.logContent}>
                  <div className={styles.logHeader}>
                    {/* Requirement 7.1: Display timestamp */}
                    <time className={styles.timestamp} dateTime={new Date(log.timestamp).toISOString()}>
                      {formatTimestamp(log.timestamp)}
                    </time>
                    
                    {/* Requirement 7.3: Delete button */}
                    {!isConfirming && (
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteClick(log.id)}
                        aria-label={`Delete log: ${log.text}`}
                        type="button"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  
                  {/* Requirement 7.3: Confirmation dialog */}
                  {isConfirming ? (
                    <div className={styles.confirmDialog} role="alertdialog" aria-labelledby={`confirm-${log.id}`}>
                      <p id={`confirm-${log.id}`} className={styles.confirmMessage}>
                        This action cannot be undone
                      </p>
                      <div className={styles.confirmButtons}>
                        <button
                          className={styles.confirmButton}
                          onClick={() => handleConfirmDelete(log.id)}
                          aria-label="Confirm deletion"
                          type="button"
                        >
                          Confirm
                        </button>
                        <button
                          className={styles.cancelButton}
                          onClick={handleCancelDelete}
                          aria-label="Cancel deletion"
                          type="button"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Requirement 7.1: Display emotion text in saved color */
                    <p 
                      className={styles.text}
                      style={{ color: textColorHex }}
                    >
                      {log.text}
                    </p>
                  )}
                </div>
              </li>
              
              {/* Requirement 7.4: Pastel dividers between entries */}
              {index < sortedLogs.length - 1 && (
                <div className={styles.divider} aria-hidden="true" />
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}
