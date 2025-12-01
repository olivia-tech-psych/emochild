/**
 * EmotionContext Settings Persistence Integration Test
 * Verifies that EmotionContext properly persists all customization changes immediately
 * Requirements: 8.5
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { EmotionProvider, useEmotion } from './EmotionContext';
import { storageService } from '@/services/storageService';
import type { CreatureCustomization, PastelColor } from '@/types';

describe('EmotionContext Settings Persistence - Requirement 8.5', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should persist customization changes immediately via setCustomization', () => {
    // Requirement 8.5: Ensure all customization changes save immediately
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    // Wait for initialization
    act(() => {
      // Context should be initialized
    });

    const newCustomization: CreatureCustomization = {
      name: 'TestCreature',
      color: 'lavender' as PastelColor,
      hasBow: true,
    };

    // Change customization
    act(() => {
      result.current.setCustomization(newCustomization);
    });

    // Verify it's immediately available in localStorage
    const loaded = storageService.loadCustomization();
    expect(loaded).toEqual(newCustomization);
  });

  it('should persist text color preference changes immediately', () => {
    // Requirement 8.2, 8.5: Text color preference persists immediately
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      // Context should be initialized
    });

    // Change text color preference
    act(() => {
      result.current.setTextColorPreference('mint' as PastelColor);
    });

    // Verify it's immediately available in localStorage
    const loaded = storageService.loadTextColorPreference();
    expect(loaded).toBe('mint');
  });

  it('should persist multiple customization changes in sequence', () => {
    // Requirement 8.5: Update localStorage on any setting change
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      // Context should be initialized
    });

    // First change
    const customization1: CreatureCustomization = {
      name: 'Creature1',
      color: 'mint' as PastelColor,
      hasBow: false,
    };

    act(() => {
      result.current.setCustomization(customization1);
    });

    expect(storageService.loadCustomization()).toEqual(customization1);

    // Second change
    const customization2: CreatureCustomization = {
      name: 'Creature2',
      color: 'blue' as PastelColor,
      hasBow: true,
    };

    act(() => {
      result.current.setCustomization(customization2);
    });

    expect(storageService.loadCustomization()).toEqual(customization2);
  });

  it('should persist all settings together', () => {
    // Requirement 8.5: Verify changes persist on app reload
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      // Context should be initialized
    });

    const customization: CreatureCustomization = {
      name: 'PersistentCreature',
      color: 'peach' as PastelColor,
      hasBow: true,
    };

    // Set all settings
    act(() => {
      result.current.setCustomization(customization);
      result.current.setTextColorPreference('lavender' as PastelColor);
    });

    // Verify all settings are immediately in localStorage
    expect(storageService.loadCustomization()).toEqual(customization);
    expect(storageService.loadTextColorPreference()).toBe('lavender');
  });

  it('should load persisted settings on mount', () => {
    // Requirement 8.5: Verify changes persist on app reload
    const customization: CreatureCustomization = {
      name: 'PreloadedCreature',
      color: 'yellow' as PastelColor,
      hasBow: false,
    };

    // Pre-populate localStorage
    storageService.saveCustomization(customization);
    storageService.saveTextColorPreference('red');

    // Create new context instance (simulating app reload)
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    // Wait for initialization
    act(() => {
      // Context should load from localStorage
    });

    // Verify settings were loaded
    expect(result.current.customization).toEqual(customization);
    expect(result.current.textColorPreference).toBe('red');
  });

  it('should persist logs with new fields immediately', () => {
    // Requirement 8.5: All data persists immediately
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      // Context should be initialized
    });

    // Add a log with text color and quick emotion
    act(() => {
      result.current.addLog('feeling anxious', 'expressed', 'mint', 'anxious');
    });

    // Verify log is immediately in localStorage
    const loadedLogs = storageService.loadLogs();
    expect(loadedLogs).toHaveLength(1);
    expect(loadedLogs[0].text).toBe('feeling anxious');
    expect(loadedLogs[0].textColor).toBe('mint');
    expect(loadedLogs[0].quickEmotion).toBe('anxious');
  });

  it('should persist safety score changes immediately', () => {
    // Requirement 8.5: All state changes persist immediately
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      // Context should be initialized
    });

    // Add expressed emotion to increase safety score
    act(() => {
      result.current.addLog('feeling happy', 'expressed');
    });

    // Verify safety score is immediately in localStorage
    const loadedScore = storageService.loadSafetyScore();
    expect(loadedScore).toBe(1);
  });

  it('should persist creature state changes immediately', () => {
    // Requirement 8.5: All state changes persist immediately
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      // Context should be initialized
    });

    // Add emotion to change creature state
    act(() => {
      result.current.addLog('feeling calm', 'expressed');
    });

    // Verify creature state is immediately in localStorage
    const loadedState = storageService.loadCreatureState();
    expect(loadedState).not.toBeNull();
    expect(loadedState?.brightness).toBeGreaterThan(0);
  });
});
