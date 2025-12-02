/**
 * Settings Persistence Test
 * Verifies that all customization changes save immediately to localStorage
 * Requirements: 8.5
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storageService } from './storageService';
import type { CreatureCustomization, PastelColor } from '@/types';

describe('Settings Persistence - Requirement 8.5', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should save customization immediately when changed', () => {
    // Requirement 8.5: Ensure all customization changes save immediately
    const customization: CreatureCustomization = {
      name: 'TestCreature',
      color: 'mint' as PastelColor,
      hasBow: true,
    };

    // Save customization
    const result = storageService.saveCustomization(customization);

    // Verify save was successful
    expect(result.success).toBe(true);

    // Verify data is immediately available in localStorage
    const loaded = storageService.loadCustomization();
    expect(loaded).toEqual(customization);
  });

  it('should persist name changes immediately', () => {
    // Requirement 8.5: Update localStorage on any setting change
    const initialCustomization: CreatureCustomization = {
      name: 'OldName',
      color: 'orange' as PastelColor,
      hasBow: false,
    };

    storageService.saveCustomization(initialCustomization);

    // Change name
    const updatedCustomization: CreatureCustomization = {
      ...initialCustomization,
      name: 'NewName',
    };

    storageService.saveCustomization(updatedCustomization);

    // Verify change persists immediately
    const loaded = storageService.loadCustomization();
    expect(loaded?.name).toBe('NewName');
  });

  it('should persist color changes immediately', () => {
    // Requirement 8.5: Update localStorage on any setting change
    const initialCustomization: CreatureCustomization = {
      name: 'TestCreature',
      color: 'orange' as PastelColor,
      hasBow: false,
    };

    storageService.saveCustomization(initialCustomization);

    // Change color
    const updatedCustomization: CreatureCustomization = {
      ...initialCustomization,
      color: 'lavender' as PastelColor,
    };

    storageService.saveCustomization(updatedCustomization);

    // Verify change persists immediately
    const loaded = storageService.loadCustomization();
    expect(loaded?.color).toBe('lavender');
  });

  it('should persist bow toggle changes immediately', () => {
    // Requirement 8.5: Update localStorage on any setting change
    const initialCustomization: CreatureCustomization = {
      name: 'TestCreature',
      color: 'orange' as PastelColor,
      hasBow: false,
    };

    storageService.saveCustomization(initialCustomization);

    // Toggle bow
    const updatedCustomization: CreatureCustomization = {
      ...initialCustomization,
      hasBow: true,
    };

    storageService.saveCustomization(updatedCustomization);

    // Verify change persists immediately
    const loaded = storageService.loadCustomization();
    expect(loaded?.hasBow).toBe(true);
  });

  it('should persist multiple setting changes in sequence', () => {
    // Requirement 8.5: Verify changes persist on app reload
    const customization1: CreatureCustomization = {
      name: 'Creature1',
      color: 'mint' as PastelColor,
      hasBow: false,
    };

    storageService.saveCustomization(customization1);
    expect(storageService.loadCustomization()).toEqual(customization1);

    const customization2: CreatureCustomization = {
      name: 'Creature2',
      color: 'blue' as PastelColor,
      hasBow: true,
    };

    storageService.saveCustomization(customization2);
    expect(storageService.loadCustomization()).toEqual(customization2);

    const customization3: CreatureCustomization = {
      name: 'Creature3',
      color: 'lavender' as PastelColor,
      hasBow: false,
    };

    storageService.saveCustomization(customization3);
    expect(storageService.loadCustomization()).toEqual(customization3);
  });

  it('should handle all 8 pastel colors correctly', () => {
    // Requirement 8.5: Ensure all customization changes save immediately
    const colors: PastelColor[] = [
      'mint', 'blue', 'lavender', 'peach', 'pink', 'yellow', 'red', 'orange'
    ];

    colors.forEach(color => {
      const customization: CreatureCustomization = {
        name: 'TestCreature',
        color,
        hasBow: false,
      };

      storageService.saveCustomization(customization);
      const loaded = storageService.loadCustomization();
      expect(loaded?.color).toBe(color);
    });
  });

  it('should persist text color preference immediately', () => {
    // Requirement 8.2, 8.5: Text color preference persists
    const color = 'mint';
    
    const result = storageService.saveTextColorPreference(color);
    expect(result.success).toBe(true);

    const loaded = storageService.loadTextColorPreference();
    expect(loaded).toBe(color);
  });

  it('should persist micro-sentence index immediately', () => {
    // Requirement 8.5: All settings persist immediately
    const index = 5;
    
    const result = storageService.saveMicroSentenceIndex(index);
    expect(result.success).toBe(true);

    const loaded = storageService.loadMicroSentenceIndex();
    expect(loaded).toBe(index);
  });

  it('should simulate app reload and verify persistence', () => {
    // Requirement 8.5: Verify changes persist on app reload
    const customization: CreatureCustomization = {
      name: 'PersistentCreature',
      color: 'peach' as PastelColor,
      hasBow: true,
    };

    // Save settings
    storageService.saveCustomization(customization);
    storageService.saveTextColorPreference('lavender');
    storageService.saveMicroSentenceIndex(7);

    // Simulate app reload by loading fresh data
    const loadedCustomization = storageService.loadCustomization();
    const loadedTextColor = storageService.loadTextColorPreference();
    const loadedMicroIndex = storageService.loadMicroSentenceIndex();

    // Verify all settings persisted
    expect(loadedCustomization).toEqual(customization);
    expect(loadedTextColor).toBe('lavender');
    expect(loadedMicroIndex).toBe(7);
  });

  it('should handle localStorage errors gracefully', () => {
    // Requirement 8.5: Handle storage failures
    // Mock localStorage.setItem to throw an error
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = vi.fn(() => {
      throw new Error('Storage full');
    });

    const customization: CreatureCustomization = {
      name: 'TestCreature',
      color: 'mint' as PastelColor,
      hasBow: false,
    };

    const result = storageService.saveCustomization(customization);

    // Should return failure but not crash
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();

    // Restore original setItem
    Storage.prototype.setItem = originalSetItem;
  });

  it('should verify error handling exists for storage failures', () => {
    // Requirement 8.5: Handle storage quota errors gracefully
    // This test verifies that the storageService has error handling
    // The actual error handling is tested in storageService.test.ts
    
    const customization: CreatureCustomization = {
      name: 'TestCreature',
      color: 'mint' as PastelColor,
      hasBow: false,
    };

    // Normal save should succeed
    const result = storageService.saveCustomization(customization);
    expect(result.success).toBe(true);
    
    // Verify the service has getLastError method for error tracking
    expect(typeof storageService.getLastError).toBe('function');
  });
});
