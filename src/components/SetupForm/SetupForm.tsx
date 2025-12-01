/**
 * SetupForm Component
 * Creature customization form for initial setup
 * Requirements: 2.2, 2.3, 2.4, 2.5, 2.6
 */

'use client';

import React, { useState } from 'react';
import styles from './SetupForm.module.css';
import { ColorPicker } from '@/components/ColorPicker';
import { CreatureCustomization, PastelColor } from '@/types';

export interface SetupFormProps {
  /** Callback when setup is completed */
  onComplete: (customization: CreatureCustomization) => void;
}

/**
 * SetupForm component
 * 
 * Requirements:
 * - 2.2: Provide input fields for creature name and color selection
 * - 2.3: Offer 8 pastel colors with orange as default
 * - 2.4: Update preview blob in real-time with selected color
 * - 2.5: Provide optional toggle for dark pink bow accessory
 * - 2.6: Save creature name and color to localStorage
 */
export function SetupForm({ onComplete }: SetupFormProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState<PastelColor>('orange');
  const [hasBow, setHasBow] = useState(false);

  // Handle name input change with 50 character limit
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setName(value);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate name is not empty
    if (name.trim() === '') {
      return;
    }

    // Create customization object
    const customization: CreatureCustomization = {
      name: name.trim(),
      color,
      hasBow
    };

    // Call onComplete callback
    onComplete(customization);
  };

  // Check if continue button should be enabled
  const isContinueEnabled = name.trim().length > 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customize Your Creature</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Name Input */}
        <div className={styles.field}>
          <label htmlFor="creature-name" className={styles.label}>
            Name
          </label>
          <input
            id="creature-name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
            placeholder="Give your creature a name"
            maxLength={50}
            aria-label="Creature name"
            aria-describedby="name-hint"
          />
          <span id="name-hint" className={styles.hint}>
            {name.length}/50 characters
          </span>
        </div>

        {/* Color Picker */}
        <div className={styles.field}>
          <ColorPicker
            selectedColor={color}
            onColorChange={(newColor) => setColor(newColor as PastelColor)}
            includeWhite={false}
            label="Color"
          />
        </div>

        {/* Preview Blob */}
        <div className={styles.previewContainer}>
          <div 
            className={`${styles.previewBlob} ${styles[`blob-${color}`]}`}
            aria-label={`Preview of creature in ${color} color`}
          >
            {/* Bow accessory preview */}
            {hasBow && (
              <div className={styles.previewBow} aria-hidden="true">
                <div className={styles.previewBowRightLoop} />
              </div>
            )}
          </div>
        </div>

        {/* Bow Toggle */}
        <div className={styles.field}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={hasBow}
              onChange={(e) => setHasBow(e.target.checked)}
              className={styles.checkbox}
              aria-label="Add a pink bow accessory"
            />
            <span className={styles.checkboxText}>Add a pink bow</span>
          </label>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className={styles.continueButton}
          disabled={!isContinueEnabled}
          aria-label="Continue to creature screen"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
