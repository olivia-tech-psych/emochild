/**
 * Tests for EmotionContext
 * Verifies global state management functionality
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { EmotionProvider, useEmotion } from './EmotionContext';
import { storageService } from '@/services/storageService';
import { EmotionAction } from '@/types';

// Mock uuid to have predictable IDs in tests
let uuidCounter = 0;
vi.mock('uuid', () => ({
  v4: () => `test-uuid-${uuidCounter++}`,
}));

describe('EmotionContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    storageService.clearAll();
    vi.clearAllMocks();
    uuidCounter = 0; // Reset UUID counter
  });

  it('should initialize with default state when localStorage is empty', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    expect(result.current.logs).toEqual([]);
    expect(result.current.creatureState).toEqual({
      brightness: 50,
      size: 50,
      animation: 'idle',
    });
    expect(result.current.safetyScore).toBe(0);
    expect(result.current.customization).toEqual({
      name: '',
      color: 'orange',
      hasBow: false,
    });
    expect(result.current.microSentenceIndex).toBe(0);
    expect(result.current.currentMicroSentence).toBe(null);
  });

  it('should add a log with expressed action', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      result.current.addLog('Feeling happy', 'expressed');
    });

    expect(result.current.logs).toHaveLength(1);
    expect(result.current.logs[0]).toMatchObject({
      id: 'test-uuid-0',
      text: 'Feeling happy',
      action: 'expressed',
      textColor: 'white',
    });
    expect(result.current.logs[0].timestamp).toBeGreaterThan(0);
  });

  it('should add a log with textColor and quickEmotion', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      result.current.addLog('Feeling anxious', 'expressed', 'lavender', 'anxious');
    });

    expect(result.current.logs).toHaveLength(1);
    expect(result.current.logs[0]).toMatchObject({
      id: 'test-uuid-0',
      text: 'Feeling anxious',
      action: 'expressed',
      textColor: 'lavender',
      quickEmotion: 'anxious',
    });
  });

  it('should update creature state when adding expressed log', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      result.current.addLog('Feeling happy', 'expressed');
    });

    // Expressed action: brightness +5, size +2
    expect(result.current.creatureState.brightness).toBe(55);
    expect(result.current.creatureState.size).toBe(52);
    expect(result.current.creatureState.animation).toBe('grow');
  });

  it('should update creature state when adding suppressed log', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      result.current.addLog('Feeling anxious', 'suppressed');
    });

    // Suppressed action: brightness -3, size -1
    expect(result.current.creatureState.brightness).toBe(47);
    expect(result.current.creatureState.size).toBe(49);
    expect(result.current.creatureState.animation).toBe('curl');
  });

  it('should increment safety score only for expressed actions', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      result.current.addLog('Feeling happy', 'expressed');
    });

    expect(result.current.safetyScore).toBe(1);

    act(() => {
      result.current.addLog('Feeling sad', 'suppressed');
    });

    // Safety score should not change for suppressed
    expect(result.current.safetyScore).toBe(1);

    act(() => {
      result.current.addLog('Feeling excited', 'expressed');
    });

    expect(result.current.safetyScore).toBe(2);
  });

  it('should persist logs to localStorage', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      result.current.addLog('Test emotion', 'expressed');
    });

    const savedLogs = storageService.loadLogs();
    expect(savedLogs).toHaveLength(1);
    expect(savedLogs[0].text).toBe('Test emotion');
  });

  it('should persist creature state to localStorage', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      result.current.addLog('Test emotion', 'expressed');
    });

    const savedState = storageService.loadCreatureState();
    expect(savedState).toMatchObject({
      brightness: 55,
      size: 52,
      animation: 'grow',
    });
  });

  it('should persist safety score to localStorage', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      result.current.addLog('Test emotion', 'expressed');
    });

    const savedScore = storageService.loadSafetyScore();
    expect(savedScore).toBe(1);
  });

  it('should load initial state from localStorage', () => {
    // Pre-populate localStorage
    const existingLogs = [
      {
        id: 'existing-1',
        text: 'Previous emotion',
        action: 'expressed' as EmotionAction,
        timestamp: Date.now() - 1000,
      },
    ];
    storageService.saveLogs(existingLogs);
    storageService.saveCreatureState({
      brightness: 60,
      size: 55,
      animation: 'idle',
    });
    storageService.saveSafetyScore(5);

    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    expect(result.current.logs).toHaveLength(1);
    expect(result.current.logs[0].text).toBe('Previous emotion');
    expect(result.current.creatureState.brightness).toBe(60);
    expect(result.current.creatureState.size).toBe(55);
    expect(result.current.safetyScore).toBe(5);
  });

  it('should clear all logs and reset state', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      result.current.addLog('Test emotion', 'expressed');
    });

    expect(result.current.logs).toHaveLength(1);

    act(() => {
      result.current.clearLogs();
    });

    expect(result.current.logs).toEqual([]);
    expect(result.current.creatureState).toEqual({
      brightness: 50,
      size: 50,
      animation: 'idle',
    });
    expect(result.current.safetyScore).toBe(0);
  });

  it('should throw error when useEmotion is used outside provider', () => {
    expect(() => {
      renderHook(() => useEmotion());
    }).toThrow('useEmotion must be used within an EmotionProvider');
  });

  it('should set and persist customization', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    const newCustomization = {
      name: 'Fluffy',
      color: 'mint' as const,
      hasBow: true,
    };

    act(() => {
      result.current.setCustomization(newCustomization);
    });

    expect(result.current.customization).toEqual(newCustomization);

    // Verify it was saved to localStorage
    const savedCustomization = storageService.loadCustomization();
    expect(savedCustomization).toEqual(newCustomization);
  });

  it('should delete a log and update safety score for expressed logs', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    // Add two logs
    act(() => {
      result.current.addLog('First emotion', 'expressed');
    });

    act(() => {
      result.current.addLog('Second emotion', 'expressed');
    });

    expect(result.current.logs).toHaveLength(2);
    expect(result.current.safetyScore).toBe(2);

    const firstLogId = result.current.logs[0].id;

    // Delete the first log
    act(() => {
      result.current.deleteLog(firstLogId);
    });

    expect(result.current.logs).toHaveLength(1);
    expect(result.current.logs[0].text).toBe('Second emotion');
    expect(result.current.safetyScore).toBe(1);
  });

  it('should delete a log without changing safety score for suppressed logs', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    // Add one expressed and one suppressed log
    act(() => {
      result.current.addLog('Expressed emotion', 'expressed');
    });

    act(() => {
      result.current.addLog('Suppressed emotion', 'suppressed');
    });

    expect(result.current.logs).toHaveLength(2);
    expect(result.current.safetyScore).toBe(1);

    const suppressedLogId = result.current.logs[1].id;

    // Delete the suppressed log
    act(() => {
      result.current.deleteLog(suppressedLogId);
    });

    expect(result.current.logs).toHaveLength(1);
    expect(result.current.safetyScore).toBe(1); // Should remain unchanged
  });

  it('should display micro-sentence when expressed emotion is logged', () => {
    vi.useFakeTimers();
    
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      result.current.addLog('Feeling happy', 'expressed');
    });

    // Micro-sentence should be displayed
    expect(result.current.currentMicroSentence).toBe('Your vulnerability is rewarded.');
    expect(result.current.microSentenceIndex).toBe(1);

    // Fast-forward time by 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Micro-sentence should be cleared
    expect(result.current.currentMicroSentence).toBe(null);

    vi.useRealTimers();
  });

  it('should not display micro-sentence when suppressed emotion is logged', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    act(() => {
      result.current.addLog('Feeling anxious', 'suppressed');
    });

    // Micro-sentence should not be displayed
    expect(result.current.currentMicroSentence).toBe(null);
    expect(result.current.microSentenceIndex).toBe(0); // Should not increment
  });

  it('should cycle through micro-sentences sequentially', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    // Add first expressed emotion
    act(() => {
      result.current.addLog('First emotion', 'expressed');
    });

    expect(result.current.currentMicroSentence).toBe('Your vulnerability is rewarded.');
    expect(result.current.microSentenceIndex).toBe(1);

    // Add second expressed emotion
    act(() => {
      result.current.addLog('Second emotion', 'expressed');
    });

    expect(result.current.currentMicroSentence).toBe('When you feel, I grow.');
    expect(result.current.microSentenceIndex).toBe(2);
  });

  it('should get next micro-sentence using getNextMicroSentence method', () => {
    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    let sentence: string = '';
    
    act(() => {
      sentence = result.current.getNextMicroSentence();
    });

    expect(sentence).toBe('Your vulnerability is rewarded.');
    expect(result.current.microSentenceIndex).toBe(1);

    act(() => {
      sentence = result.current.getNextMicroSentence();
    });

    expect(sentence).toBe('When you feel, I grow.');
    expect(result.current.microSentenceIndex).toBe(2);
  });

  it('should load customization and micro-sentence index from localStorage', () => {
    // Pre-populate localStorage
    const customization = {
      name: 'Buddy',
      color: 'blue' as const,
      hasBow: true,
    };
    storageService.saveCustomization(customization);
    storageService.saveMicroSentenceIndex(5);

    const { result } = renderHook(() => useEmotion(), {
      wrapper: EmotionProvider,
    });

    expect(result.current.customization).toEqual(customization);
    expect(result.current.microSentenceIndex).toBe(5);
  });
});
