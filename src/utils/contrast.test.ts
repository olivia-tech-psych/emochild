import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

/**
 * Feature: emochild, Property 10: Text contrast accessibility
 * For any text element displayed on the dark background, the contrast ratio 
 * between text color and background color should meet WCAG AA standards 
 * (minimum 4.5:1 for normal text).
 * Validates: Requirements 7.3
 */

// Helper function to convert hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

// Calculate relative luminance according to WCAG formula
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

describe('Property 10: Text contrast accessibility', () => {
  // Define the theme colors from globals.css
  const backgroundColor = '#1a1a1a';
  const textColors = {
    primary: '#f5f5f5',
    secondary: '#b0b0b0',
  };
  
  const WCAG_AA_NORMAL_TEXT = 4.5;
  
  it('should meet WCAG AA contrast ratio for primary text on dark background', () => {
    const ratio = getContrastRatio(textColors.primary, backgroundColor);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });
  
  it('should meet WCAG AA contrast ratio for secondary text on dark background', () => {
    const ratio = getContrastRatio(textColors.secondary, backgroundColor);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });
  
  it('should maintain WCAG AA contrast for any light text color on dark background', () => {
    fc.assert(
      fc.property(
        // Generate light colors (high RGB values for text on dark background)
        fc.record({
          r: fc.integer({ min: 150, max: 255 }),
          g: fc.integer({ min: 150, max: 255 }),
          b: fc.integer({ min: 150, max: 255 }),
        }),
        (rgb) => {
          const textColor = `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`;
          const ratio = getContrastRatio(textColor, backgroundColor);
          
          // Light colors on dark background should have good contrast
          return ratio >= WCAG_AA_NORMAL_TEXT;
        }
      ),
      { numRuns: 100 }
    );
  });
});
