import React from 'react';
import styles from './SafetyBar.module.css';

interface SafetyBarProps {
  score: number;
  maxScore?: number;
}

export const SafetyBar: React.FC<SafetyBarProps> = ({ score, maxScore = 100 }) => {
  const percentage = Math.min((score / maxScore) * 100, 100);

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        Inner Safety Bar: {score} ✨
      </div>
      <div className={styles.barBackground}>
        <div 
          className={styles.barFill} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
