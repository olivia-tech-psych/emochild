/**
 * Unit tests for Creature component
 * Tests animation states, brightness, and size transforms
 * Requirements: 3.1, 3.2, 8.1
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Creature } from './Creature';
import { CreatureState } from '@/types';

describe('Creature Component', () => {
  describe('Animation States', () => {
    it('should apply idle animation class when animation is idle', () => {
      const state: CreatureState = {
        brightness: 50,
        size: 50,
        animation: 'idle',
      };

      render(<Creature state={state} />);
      const creature = screen.getByRole('img');
      
      expect(creature.className).toContain('creatureIdle');
    });

    it('should apply grow animation class when animation is grow', () => {
      const state: CreatureState = {
        brightness: 55,
        size: 52,
        animation: 'grow',
      };

      render(<Creature state={state} />);
      const creature = screen.getByRole('img');
      
      expect(creature.className).toContain('creatureGrow');
    });

    it('should apply curl animation class when animation is curl', () => {
      const state: CreatureState = {
        brightness: 47,
        size: 49,
        animation: 'curl',
      };

      render(<Creature state={state} />);
      const creature = screen.getByRole('img');
      
      expect(creature.className).toContain('creatureCurl');
    });

    it('should apply celebrate animation class when animation is celebrate', () => {
      const state: CreatureState = {
        brightness: 100,
        size: 70,
        animation: 'celebrate',
      };

      render(<Creature state={state} />);
      const creature = screen.getByRole('img');
      
      expect(creature.className).toContain('creatureCelebrate');
    });
  });

  describe('Brightness Transform', () => {
    it('should apply correct brightness filter for minimum brightness (0)', () => {
      const state: CreatureState = {
        brightness: 0,
        size: 50,
        animation: 'idle',
      };

      render(<Creature state={state} />);
      const creature = screen.getByRole('img');
      
      // brightness 0 should map to filter brightness(0.5)
      expect(creature.style.filter).toBe('brightness(0.5)');
    });

    it('should apply correct brightness filter for middle brightness (50)', () => {
      const state: CreatureState = {
        brightness: 50,
        size: 50,
        animation: 'idle',
      };

      render(<Creature state={state} />);
      const creature = screen.getByRole('img');
      
      // brightness 50 should map to filter brightness(1)
      expect(creature.style.filter).toBe('brightness(1)');
    });

    it('should apply correct brightness filter for maximum brightness (100)', () => {
      const state: CreatureState = {
        brightness: 100,
        size: 50,
        animation: 'idle',
      };

      render(<Creature state={state} />);
      const creature = screen.getByRole('img');
      
      // brightness 100 should map to filter brightness(1.5)
      expect(creature.style.filter).toBe('brightness(1.5)');
    });
  });

  describe('Size Transform', () => {
    it('should apply correct scale transform for minimum size (0)', () => {
      const state: CreatureState = {
        brightness: 50,
        size: 0,
        animation: 'idle',
      };

      render(<Creature state={state} />);
      const creature = screen.getByRole('img');
      
      // size 0 should map to scale(0.8)
      expect(creature.style.transform).toBe('scale(0.8)');
    });

    it('should apply correct scale transform for middle size (50)', () => {
      const state: CreatureState = {
        brightness: 50,
        size: 50,
        animation: 'idle',
      };

      render(<Creature state={state} />);
      const creature = screen.getByRole('img');
      
      // size 50 should map to scale(1)
      expect(creature.style.transform).toBe('scale(1)');
    });

    it('should apply correct scale transform for maximum size (100)', () => {
      const state: CreatureState = {
        brightness: 50,
        size: 100,
        animation: 'idle',
      };

      render(<Creature state={state} />);
      const creature = screen.getByRole('img');
      
      // size 100 should map to scale(1.2) - using toContain to handle floating point precision
      expect(creature.style.transform).toContain('scale(1.2');
    });
  });

  describe('Accessibility', () => {
    it('should have appropriate ARIA label describing creature state', () => {
      const state: CreatureState = {
        brightness: 75,
        size: 60,
        animation: 'grow',
      };

      render(<Creature state={state} />);
      const creature = screen.getByRole('img');
      
      expect(creature).toHaveAttribute('aria-label');
      expect(creature.getAttribute('aria-label')).toContain('75%');
      expect(creature.getAttribute('aria-label')).toContain('grow');
    });
  });
});
