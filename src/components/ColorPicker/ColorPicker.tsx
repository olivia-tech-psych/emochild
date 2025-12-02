/**
 * ColorPicker Component
 * Reusable color selector with pastel color swatches
 * Requirements: 2.4, 4.1, 4.2
 */

'use client';

import React, { useRef, useEffect } from 'react';
import styles from './ColorPicker.module.css';
import { PastelColor } from '@/types';

export interface ColorPickerProps {
  /** Currently selected color */
  selectedColor: PastelColor | 'white';
  /** Callback when color is selected */
  onColorChange: (color: PastelColor | 'white') => void;
  /** Whether to include white as an option (for text color) */
  includeWhite?: boolean;
  /** Optional label for the color picker */
  label?: string;
}

// All 8 pastel colors
const PASTEL_COLORS: PastelColor[] = [
  'mint',
  'blue',
  'lavender',
  'peach',
  'pink',
  'yellow',
  'red',
  'orange'
];

// Color names for accessibility
const COLOR_LABELS: Record<PastelColor | 'white', string> = {
  mint: 'Mint',
  blue: 'Blue',
  lavender: 'Lavender',
  peach: 'Peach',
  pink: 'Pink',
  yellow: 'Yellow',
  red: 'Red',
  orange: 'Orange',
  white: 'White'
};

/**
 * ColorPicker component
 * 
 * Requirements:
 * - 2.4: Color selection updates preview in real-time
 * - 4.1: Provide text color selector with pastel colors
 * - 4.2: Apply selected color immediately
 */
export function ColorPicker({
  selectedColor,
  onColorChange,
  includeWhite = false,
  label = 'Select color'
}: ColorPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Build color list based on includeWhite prop
  const colors: (PastelColor | 'white')[] = includeWhite 
    ? [...PASTEL_COLORS, 'white']
    : PASTEL_COLORS;

  // Handle color selection
  const handleColorClick = (color: PastelColor | 'white') => {
    onColorChange(color);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, color: PastelColor | 'white') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onColorChange(color);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const currentIndex = colors.indexOf(color);
      let nextIndex: number;
      
      if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % colors.length;
      } else {
        nextIndex = (currentIndex - 1 + colors.length) % colors.length;
      }
      
      // Focus the next color swatch
      const swatches = containerRef.current?.querySelectorAll('[role="radio"]');
      if (swatches && swatches[nextIndex]) {
        (swatches[nextIndex] as HTMLElement).focus();
      }
    }
  };

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} id="color-picker-label">
          {label}
        </label>
      )}
      
      <div 
        ref={containerRef}
        className={styles.swatchGrid}
        role="radiogroup"
        aria-labelledby="color-picker-label"
        aria-label={label}
      >
        {colors.map((color) => {
          const isSelected = color === selectedColor;
          
          return (
            <button
              key={color}
              type="button"
              className={`${styles.swatch} ${styles[`swatch-${color}`]} ${
                isSelected ? styles.selected : ''
              }`}
              onClick={() => handleColorClick(color)}
              onKeyDown={(e) => handleKeyDown(e, color)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Select ${COLOR_LABELS[color]} color`}
              tabIndex={isSelected ? 0 : -1}
              data-color={color}
            >
              {/* Visual indicator for selected state */}
              {isSelected && (
                <span className={styles.checkmark} aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
