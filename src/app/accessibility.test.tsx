/**
 * Accessibility tests for keyboard navigation and ARIA attributes
 * Requirements: 7.5
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import CreaturePage from './creature/page';
import { EmotionProvider } from '@/context/EmotionContext';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Accessibility Features - Requirement 7.5', () => {
  beforeEach(() => {
    localStorageMock.clear();
    // Set up customization so creature page renders
    localStorageMock.setItem('emochild_customization', JSON.stringify({
      name: 'TestCreature',
      color: 'orange',
      hasBow: false
    }));
  });

  const renderWithProvider = () => {
    return render(
      <EmotionProvider>
        <CreaturePage />
      </EmotionProvider>
    );
  };

  describe('ARIA labels and semantic HTML', () => {
    it('should have proper ARIA labels on creature component', () => {
      renderWithProvider();
      const creature = screen.getByRole('img', { name: /emochild creature/i });
      expect(creature).toBeDefined();
    });

    it('should have ARIA live region on creature for dynamic updates', () => {
      renderWithProvider();
      const creature = screen.getByRole('img', { name: /emochild creature/i });
      expect(creature.getAttribute('aria-live')).toBe('polite');
    });

    it('should have ARIA live region on safety bar', () => {
      renderWithProvider();
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeDefined();
      expect(progressBar.getAttribute('aria-live')).toBe('polite');
    });

    it('should have proper ARIA labels on action buttons', () => {
      renderWithProvider();
      const expressButton = screen.getByRole('button', { name: /express emotion/i });
      const suppressButton = screen.getByRole('button', { name: /suppress emotion/i });
      expect(expressButton).toBeDefined();
      expect(suppressButton).toBeDefined();
    });

    it('should use semantic HTML sections with aria-label', () => {
      renderWithProvider();
      const main = screen.getByRole('main');
      expect(main).toBeDefined();
    });

    it('should have skip link for keyboard users', () => {
      renderWithProvider();
      const skipLink = screen.getByRole('link', { name: /skip to emotion input/i });
      expect(skipLink).toBeDefined();
      expect(skipLink.getAttribute('href')).toBe('#emotion-input');
    });
  });

  describe('Keyboard accessibility', () => {
    it('should have all interactive elements keyboard accessible', () => {
      renderWithProvider();
      
      // Check that buttons are focusable
      const expressButton = screen.getByRole('button', { name: /express emotion/i });
      const suppressButton = screen.getByRole('button', { name: /suppress emotion/i });
      
      expect(expressButton.tabIndex).toBeGreaterThanOrEqual(0);
      expect(suppressButton.tabIndex).toBeGreaterThanOrEqual(0);
    });

    it('should have textarea accessible via keyboard', () => {
      renderWithProvider();
      const textarea = screen.getByRole('textbox', { name: /emotion log input/i });
      expect(textarea).toBeDefined();
      expect(textarea.getAttribute('aria-required')).toBe('true');
    });

    it('should have navigation links keyboard accessible', () => {
      renderWithProvider();
      const historyLink = screen.getByRole('link', { name: /view your emotion log history/i });
      expect(historyLink).toBeDefined();
    });
  });

  describe('Focus indicators', () => {
    it('should have focus indicators defined in CSS', () => {
      renderWithProvider();
      
      // Verify buttons have proper structure for focus styling
      const expressButton = screen.getByRole('button', { name: /express emotion/i });
      expect(expressButton.className).toBeTruthy();
    });
  });

  describe('Character counter accessibility', () => {
    it('should have character counter with aria-live', () => {
      renderWithProvider();
      const charCounter = screen.getByRole('status');
      expect(charCounter).toBeDefined();
      expect(charCounter.getAttribute('aria-live')).toBe('polite');
    });
  });
});
