import { useEffect } from 'react';
import styles from './MicroSentence.module.css';

interface MicroSentenceProps {
  sentence: string;
  onDismiss: () => void;
}

export function MicroSentence({ sentence, onDismiss }: MicroSentenceProps) {
  useEffect(() => {
    // Auto-dismiss after 2 seconds
    const timer = setTimeout(() => {
      onDismiss();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className={styles.container}>
      <div 
        className={styles.sentence}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {sentence}
      </div>
      <button
        className={styles.dismissButton}
        onClick={onDismiss}
        aria-label="Dismiss encouraging message"
      >
        ×
      </button>
    </div>
  );
}
