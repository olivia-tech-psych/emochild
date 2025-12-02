import { describe, it, expect } from 'vitest';
import { 
  COLOR_HEX_MAP, 
  COLOR_GLOW_MAP, 
  dimColor, 
  brightenColor,
  getColorHex,
  getColorGlow
} from './colorMapping';
import { PastelColor } from '../types';

describe('colorMapping', () => {
  describe('COLOR_HEX_MAP', () => {
    it('should contain all 8 pastel colors plus white', () => {
      expect(COLOR_HEX_MAP.mint).toBe('#C9E4DE');
      expect(COLOR_HEX_MAP.blue).toBe('#a0d2eb');
      expect(COLOR_HEX_MAP.lavender).toBe('#DBCDF0');
      expect(COLOR_HEX_MAP.peach).toBe('#fcded3');
      expect(COLOR_HEX_MAP.pink).toBe('#F2C6DE');
      expect(COLOR_HEX_MAP.yellow).toBe('#ffeaa7');
      expect(COLOR_HEX_MAP.red).toBe('#f35d69');
      expect(COLOR_HEX_MAP.orange).toBe('#ff964f');
      expect(COLOR_HEX_MAP.white).toBe('#ffffff');
    });
  });

  describe('COLOR_GLOW_MAP', () => {
    it('should contain glow effects for all 8 pastel colors', () => {
      expect(COLOR_GLOW_MAP.mint).toBe('0 0 20px rgba(201, 228, 222, 0.6)');
      expect(COLOR_GLOW_MAP.blue).toBe('0 0 20px rgba(160, 210, 235, 0.6)');
      expect(COLOR_GLOW_MAP.lavender).toBe('0 0 20px rgba(219, 205, 240, 0.6)');
      expect(COLOR_GLOW_MAP.peach).toBe('0 0 20px rgba(252, 222, 211, 0.6)');
      expect(COLOR_GLOW_MAP.pink).toBe('0 0 20px rgba(242, 198, 222, 0.6)');
      expect(COLOR_GLOW_MAP.yellow).toBe('0 0 20px rgba(255, 234, 167, 0.6)');
      expect(COLOR_GLOW_MAP.red).toBe('0 0 20px rgba(243, 93, 105, 0.6)');
      expect(COLOR_GLOW_MAP.orange).toBe('0 0 20px rgba(255, 150, 79, 0.6)');
    });
  });

  describe('dimColor', () => {
    it('should darken a color while preserving hue', () => {
      const dimmed = dimColor('mint', 0.6);
      expect(dimmed).toMatch(/^#[0-9a-f]{6}$/i);
      // Dimmed color should be darker (lower RGB values)
      expect(dimmed).not.toBe(COLOR_HEX_MAP.mint);
    });

    it('should use default factor of 0.6 when not specified', () => {
      const dimmed1 = dimColor('blue');
      const dimmed2 = dimColor('blue', 0.6);
      expect(dimmed1).toBe(dimmed2);
    });

    it('should work with white color', () => {
      const dimmed = dimColor('white', 0.5);
      expect(dimmed).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe('brightenColor', () => {
    it('should brighten a color while preserving hue', () => {
      const brightened = brightenColor('mint', 0.3);
      expect(brightened).toMatch(/^#[0-9a-f]{6}$/i);
      // Brightened color should be lighter (higher RGB values)
      expect(brightened).not.toBe(COLOR_HEX_MAP.mint);
    });

    it('should use default factor of 0.3 when not specified', () => {
      const brightened1 = brightenColor('blue');
      const brightened2 = brightenColor('blue', 0.3);
      expect(brightened1).toBe(brightened2);
    });

    it('should work with white color', () => {
      const brightened = brightenColor('white', 0.3);
      expect(brightened).toBe('#ffffff'); // White can't get brighter
    });
  });

  describe('getColorHex', () => {
    it('should return the correct hex value for a color', () => {
      expect(getColorHex('mint')).toBe('#C9E4DE');
      expect(getColorHex('white')).toBe('#ffffff');
    });
  });

  describe('getColorGlow', () => {
    it('should return the correct glow effect for a color', () => {
      expect(getColorGlow('mint')).toBe('0 0 20px rgba(201, 228, 222, 0.6)');
      expect(getColorGlow('orange')).toBe('0 0 20px rgba(255, 150, 79, 0.6)');
    });
  });
});
