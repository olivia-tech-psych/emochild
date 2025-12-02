/**
 * Unit tests for Creature component
 * Tests animation states, brightness, size transforms, and customization
 * Requirements: 3.1, 3.2, 6.1, 6.2, 6.3, 8.1
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Creature } from './Creature';
import { CreatureState, CreatureCustomization } from '@/types';

describe('Creature Component', () => {
  const defaultCustomization: CreatureCustomization = {
    name: 'TestCreature',
    color: 'orange',
    hasBow: false,
  };

  describe('Animation States', () => {
    it('should apply idle animation class when animation is idle', () => {
      const state: CreatureState = {
        brightness: 50,
        size: 50,
        animation: 'idle',
      };

      render(<Creature state={state} customization={defaultCustomization} />);
      const creature = screen.getByRole('img');
      
      expect(creature.className).toContain('creatureIdle');
    });

    it('should apply grow animation class when animation is grow', () => {
      const state: CreatureState = {
        brightness: 55,
        size: 52,
        animation: 'grow',
      };

      render(<Creature state={state} customization={defaultCustomization} />);
      const creature = screen.getByRole('img');
      
      expect(creature.className).toContain('creatureGrow');
    });

    it('should apply curl animation class when animation is curl', () => {
      const state: CreatureState = {
        brightness: 47,
        size: 49,
        animation: 'curl',
      };

      render(<Creature state={state} customization={defaultCustomization} />);
      const creature = screen.getByRole('img');
      
      expect(creature.className).toContain('creatureCurl');
    });

    it('should apply celebrate animation class when animation is celebrate', () => {
      const state: CreatureState = {
        brightness: 100,
        size: 70,
        animation: 'celebrate',
      };

      render(<Creature state={state} customization={defaultCustomization} />);
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

      render(<Creature state={state} customization={defaultCustomization} />);
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

      render(<Creature state={state} customization={defaultCustomization} />);
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

      render(<Creature state={state} customization={defaultCustomization} />);
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

      render(<Creature state={state} customization={defaultCustomization} />);
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

      render(<Creature state={state} customization={defaultCustomization} />);
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

      render(<Creature state={state} customization={defaultCustomization} />);
      const creature = screen.getByRole('img');
      
      // size 100 should map to scale(1.2) - using toContain to handle floating point precision
      expect(creature.style.transform).toContain('scale(1.2');
    });
  });

  describe('Customization', () => {
    it('should apply custom color to creature background', () => {
      const state: CreatureState = {
        brightness: 50,
        size: 50,
        animation: 'idle',
      };
      const customization: CreatureCustomization = {
        name: 'Bluey',
        color: 'blue',
        hasBow: false,
      };

      render(<Creature state={state} customization={customization} />);
      const creature = screen.getByRole('img');
      
      // Should have blue color applied (browser converts hex to rgb)
      expect(creature.style.background).toBe('rgb(160, 210, 235)');
    });

    it('should apply custom glow effect based on color', () => {
      const state: CreatureState = {
        brightness: 50,
        size: 50,
        animation: 'idle',
      };
      const customization: CreatureCustomization = {
        name: 'Minty',
        color: 'mint',
        hasBow: false,
      };

      render(<Creature state={state} customization={customization} />);
      const creature = screen.getByRole('img');
      
      // Should have mint glow applied
      expect(creature.style.boxShadow).toContain('rgba(201, 228, 222, 0.6)');
    });

    it('should render bow when hasBow is true', () => {
      const state: CreatureState = {
        brightness: 50,
        size: 50,
        animation: 'idle',
      };
      const customization: CreatureCustomization = {
        name: 'Bowie',
        color: 'pink',
        hasBow: true,
      };

      const { container } = render(<Creature state={state} customization={customization} />);
      const bow = container.querySelector('[class*="bow"]');
      
      expect(bow).toBeInTheDocument();
    });

    it('should not render bow when hasBow is false', () => {
      const state: CreatureState = {
        brightness: 50,
        size: 50,
        animation: 'idle',
      };
      const customization: CreatureCustomization = {
        name: 'NoBow',
        color: 'lavender',
        hasBow: false,
      };

      const { container } = render(<Creature state={state} customization={customization} />);
      const bow = container.querySelector('[class*="bow"]');
      
      expect(bow).not.toBeInTheDocument();
    });

    it('should include creature name in aria-label', () => {
      const state: CreatureState = {
        brightness: 75,
        size: 60,
        animation: 'grow',
      };
      const customization: CreatureCustomization = {
        name: 'Sparkles',
        color: 'yellow',
        hasBow: true,
      };

      render(<Creature state={state} customization={customization} />);
      const creature = screen.getByRole('img');
      
      expect(creature.getAttribute('aria-label')).toContain('Sparkles');
      expect(creature.getAttribute('aria-label')).toContain('yellow');
    });

    it('should maintain color through different brightness states', () => {
      const customization: CreatureCustomization = {
        name: 'Peachy',
        color: 'peach',
        hasBow: false,
      };

      // Test with low brightness
      const { rerender, container } = render(
        <Creature 
          state={{ brightness: 20, size: 50, animation: 'idle' }} 
          customization={customization} 
        />
      );
      let creature = screen.getByRole('img');
      expect(creature.style.background).toBe('rgb(252, 222, 211)'); // peach color

      // Test with high brightness
      rerender(
        <Creature 
          state={{ brightness: 80, size: 50, animation: 'idle' }} 
          customization={customization} 
        />
      );
      creature = screen.getByRole('img');
      expect(creature.style.background).toBe('rgb(252, 222, 211)'); // still peach color
    });
  });

  describe('Accessibility', () => {
    it('should have appropriate ARIA label describing creature state', () => {
      const state: CreatureState = {
        brightness: 75,
        size: 60,
        animation: 'grow',
      };

      render(<Creature state={state} customization={defaultCustomization} />);
      const creature = screen.getByRole('img');
      
      expect(creature).toHaveAttribute('aria-label');
      expect(creature.getAttribute('aria-label')).toContain('75%');
      expect(creature.getAttribute('aria-label')).toContain('grow');
    });
  });
});
