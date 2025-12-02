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
  onEdit?: (logId: string, newText: string) => void;
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
export function LogHistory({ logs, onDelete, onEdit }: LogHistoryProps) {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  
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
  
  /**
   * Handle edit button click
   */
  const handleEditClick = (log: EmotionLog) => {
    setEditingId(log.id);
    setEditText(log.text);
  };
  
  /**
   * Handle edit save
   */
  const handleSaveEdit = (logId: string) => {
    if (onEdit && editText.trim()) {
      onEdit(logId, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };
  
  /**
   * Handle edit cancel
   */
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };
  
  /**
   * Export logs to CSV
   */
  const handleExportCSV = () => {
    // Create CSV header
    const header = 'Timestamp,Date,Time,Emotion,Action,Emoji,Text Color,Quick Emotion\n';
    
    // Create CSV rows
    const rows = sortedLogs.map(log => {
      const date = new Date(log.timestamp);
      const emoji = log.action === 'expressed' ? '🌱' : '🌑';
      const dateStr = date.toLocaleDateString('en-US');
      const timeStr = date.toLocaleTimeString('en-US');
      const textColor = log.textColor || 'white';
      const quickEmotion = log.quickEmotion || '';
      
      // Escape text for CSV (handle quotes and commas)
      const escapedText = `"${log.text.replace(/"/g, '""')}"`;
      
      return `${log.timestamp},${dateStr},${timeStr},${escapedText},${log.action},${emoji},${textColor},${quickEmotion}`;
    }).join('\n');
    
    // Combine header and rows with UTF-8 BOM for proper emoji encoding
    const BOM = '\uFEFF';
    const csv = BOM + header + rows;
    
    // Create blob with UTF-8 encoding
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `emochild-logs-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className={styles.container}>
      {/* Export CSV Button */}
      <div className={styles.exportSection}>
        <button
          className={styles.exportButton}
          onClick={handleExportCSV}
          aria-label="Export emotion logs to CSV file"
          type="button"
        >
          📊 Export to CSV
        </button>
      </div>
      
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
          const isEditing = editingId === log.id;
          
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
                    
                    {/* Requirement 7.3: Delete and Edit buttons */}
                    {!isConfirming && !isEditing && (
                      <div className={styles.actionButtons}>
                        {onEdit && (
                          <button
                            className={styles.editButton}
                            onClick={() => handleEditClick(log)}
                            aria-label={`Edit log: ${log.text}`}
                            type="button"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDeleteClick(log.id)}
                          aria-label={`Delete log: ${log.text}`}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
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
                  ) : isEditing ? (
                    /* Edit mode */
                    <div className={styles.editDialog}>
                      <textarea
                        className={styles.editTextarea}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        maxLength={100}
                        aria-label="Edit emotion text"
                        style={{ color: textColorHex }}
                      />
                      <div className={styles.editButtons}>
                        <button
                          className={styles.saveButton}
                          onClick={() => handleSaveEdit(log.id)}
                          aria-label="Save changes"
                          type="button"
                          disabled={!editText.trim()}
                        >
                          Save
                        </button>
                        <button
                          className={styles.cancelButton}
                          onClick={handleCancelEdit}
                          aria-label="Cancel editing"
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
