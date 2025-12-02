/**
 * Text Color Preference Persistence Tests
 * Requirement 8.2: Store last selected text color and restore for next log
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storageService } from './storageService';

describe('Text Color Preference Persistence - Requirement 8.2', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should save and load text color preference', () => {
    // Save a text color preference
    const result = storageService.saveTextColorPreference('mint');
    expect(result.success).toBe(true);

    // Load the preference
    const loaded = storageService.loadTextColorPreference();
    expect(loaded).toBe('mint');
  });

  it('should default to white when no preference exists', () => {
    // Load without saving first
    const loaded = storageService.loadTextColorPreference();
    expect(loaded).toBe('white');
  });

  it('should persist different color preferences', () => {
    // Test multiple colors
    const colors = ['mint', 'blue', 'lavender', 'peach', 'pink', 'yellow', 'red', 'orange', 'white'];
    
    for (const color of colors) {
      storageService.saveTextColorPreference(color);
      const loaded = storageService.loadTextColorPreference();
      expect(loaded).toBe(color);
    }
  });

  it('should overwrite previous preference with new one', () => {
    // Save first preference
    storageService.saveTextColorPreference('mint');
    expect(storageService.loadTextColorPreference()).toBe('mint');

    // Save second preference
    storageService.saveTextColorPreference('lavender');
    expect(storageService.loadTextColorPreference()).toBe('lavender');

    // Verify only the latest is stored
    const loaded = storageService.loadTextColorPreference();
    expect(loaded).toBe('lavender');
  });

  it('should clear text color preference when clearAll is called', () => {
    // Save a preference
    storageService.saveTextColorPreference('blue');
    expect(storageService.loadTextColorPreference()).toBe('blue');

    // Clear all storage
    storageService.clearAll();

    // Verify preference is cleared (defaults to white)
    const loaded = storageService.loadTextColorPreference();
    expect(loaded).toBe('white');
  });
});
