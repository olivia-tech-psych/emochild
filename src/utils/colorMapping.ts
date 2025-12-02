/**
 * Color mapping utilities for EmoChild application
 * Provides hex color mappings, glow effects, and color transformation functions
 * Requirements: 4.1, 6.4, 6.5
 */

import { PastelColor } from '../types';

/**
 * Maps PastelColor and 'white' to their hex color values
 * Requirements: 4.1
 */
export const COLOR_HEX_MAP: Record<PastelColor | 'white', string> = {
  mint: '#C9E4DE',
  blue: '#a0d2eb',
  lavender: '#DBCDF0',
  peach: '#fcded3',
  pink: '#F2C6DE',
  yellow: '#ffeaa7',
  red: '#f35d69',
  orange: '#ff964f',
  white: '#ffffff'
};

/**
 * Maps PastelColor to CSS glow effect values
 * Requirements: 4.1
 */
export const COLOR_GLOW_MAP: Record<PastelColor, string> = {
  mint: '0 0 20px rgba(201, 228, 222, 0.6)',
  blue: '0 0 20px rgba(160, 210, 235, 0.6)',
  lavender: '0 0 20px rgba(219, 205, 240, 0.6)',
  peach: '0 0 20px rgba(252, 222, 211, 0.6)',
  pink: '0 0 20px rgba(242, 198, 222, 0.6)',
  yellow: '0 0 20px rgba(255, 234, 167, 0.6)',
  red: '0 0 20px rgba(243, 93, 105, 0.6)',
  orange: '0 0 20px rgba(255, 150, 79, 0.6)'
};

/**
 * Converts a hex color string to RGB components
 * @param hex - Hex color string (e.g., '#C9E4DE')
 * @returns Object with r, g, b values (0-255)
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}

/**
 * Converts RGB components to a hex color string
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Hex color string (e.g., '#C9E4DE')
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    const hex = clamped.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Dims a color by reducing its brightness while preserving the base hue
 * Requirements: 6.4
 * 
 * @param color - PastelColor or 'white' to dim
 * @param factor - Dimming factor (0-1), where 0 is black and 1 is original color
 * @returns Dimmed hex color string
 */
export function dimColor(color: PastelColor | 'white', factor: number = 0.6): string {
  const hex = COLOR_HEX_MAP[color];
  const rgb = hexToRgb(hex);
  
  // Multiply each RGB component by the factor to darken
  const dimmedR = rgb.r * factor;
  const dimmedG = rgb.g * factor;
  const dimmedB = rgb.b * factor;
  
  return rgbToHex(dimmedR, dimmedG, dimmedB);
}

/**
 * Brightens a color by increasing its brightness while preserving the base hue
 * Requirements: 6.5
 * 
 * @param color - PastelColor or 'white' to brighten
 * @param factor - Brightening factor (0-1), where 0 is no change and 1 is maximum brightening
 * @returns Brightened hex color string
 */
export function brightenColor(color: PastelColor | 'white', factor: number = 0.3): string {
  const hex = COLOR_HEX_MAP[color];
  const rgb = hexToRgb(hex);
  
  // Move each RGB component closer to 255 (white) by the factor
  const brightenedR = rgb.r + (255 - rgb.r) * factor;
  const brightenedG = rgb.g + (255 - rgb.g) * factor;
  const brightenedB = rgb.b + (255 - rgb.b) * factor;
  
  return rgbToHex(brightenedR, brightenedG, brightenedB);
}

/**
 * Gets the hex color value for a given PastelColor or 'white'
 * @param color - PastelColor or 'white'
 * @returns Hex color string
 */
export function getColorHex(color: PastelColor | 'white'): string {
  return COLOR_HEX_MAP[color];
}

/**
 * Gets the glow effect CSS value for a given PastelColor
 * @param color - PastelColor
 * @returns CSS box-shadow value for glow effect
 */
export function getColorGlow(color: PastelColor): string {
  return COLOR_GLOW_MAP[color];
}
