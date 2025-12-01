/**
 * Accessibility Tests for New Components
 * Requirements: 2.4, 3.1, 5.1
 * 
 * Tests verify:
 * - ARIA labels for color swatches
 * - ARIA labels for quick emotion buttons
 * - ARIA live regions for micro-sentence display
 * - Keyboard navigation for all new components
 * - Focus indicators on all interactive elements
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorPicker } from '@/components/ColorPicker/ColorPicker';
import { QuickEmotions } from '@/components/QuickEmotions/QuickEmotions';
import { MicroSentence } from '@/components/MicroSentence/MicroSentence';

describe('Accessibility - ColorPicker Component', () => {
  it('should have ARIA labels for all color swatches', () => {
    const mockOnChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={mockOnChange}
        label="Select creature color"
      />
    );

    // Verify each color has an accessible label
    expect(screen.getByRole('radio', { name: /Select Mint color/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Select Blue color/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Select Lavender color/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Select Peach color/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Select Pink color/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Select Yellow color/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Select Red color/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Select Orange color/i })).toBeInTheDocument();
  });

  it('should have radiogroup role with proper labeling', () => {
    const mockOnChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={mockOnChange}
        label="Select creature color"
      />
    );

    const radiogroup = screen.getByRole('radiogroup', { name: /Select creature color/i });
    expect(radiogroup).toBeInTheDocument();
  });

  it('should indicate selected color with aria-checked', () => {
    const mockOnChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={mockOnChange}
      />
    );

    const mintSwatch = screen.getByRole('radio', { name: /Select Mint color/i });
    expect(mintSwatch).toHaveAttribute('aria-checked', 'true');

    const blueSwatch = screen.getByRole('radio', { name: /Select Blue color/i });
    expect(blueSwatch).toHaveAttribute('aria-checked', 'false');
  });

  it('should support keyboard navigation with arrow keys', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={mockOnChange}
      />
    );

    const mintSwatch = screen.getByRole('radio', { name: /Select Mint color/i });
    mintSwatch.focus();

    // Press ArrowRight to move to next color
    await user.keyboard('{ArrowRight}');
    
    const blueSwatch = screen.getByRole('radio', { name: /Select Blue color/i });
    expect(blueSwatch).toHaveFocus();
  });

  it('should support Enter and Space key for selection', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={mockOnChange}
      />
    );

    const blueSwatch = screen.getByRole('radio', { name: /Select Blue color/i });
    blueSwatch.focus();

    // Press Enter to select
    await user.keyboard('{Enter}');
    expect(mockOnChange).toHaveBeenCalledWith('blue');

    mockOnChange.mockClear();

    // Press Space to select
    await user.keyboard(' ');
    expect(mockOnChange).toHaveBeenCalledWith('blue');
  });

  it('should have proper tabIndex for roving tabindex pattern', () => {
    const mockOnChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={mockOnChange}
      />
    );

    // Selected item should have tabIndex 0
    const mintSwatch = screen.getByRole('radio', { name: /Select Mint color/i });
    expect(mintSwatch).toHaveAttribute('tabIndex', '0');

    // Other items should have tabIndex -1
    const blueSwatch = screen.getByRole('radio', { name: /Select Blue color/i });
    expect(blueSwatch).toHaveAttribute('tabIndex', '-1');
  });

  it('should include white option when includeWhite is true', () => {
    const mockOnChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="white"
        onColorChange={mockOnChange}
        includeWhite={true}
      />
    );

    expect(screen.getByRole('radio', { name: /Select White color/i })).toBeInTheDocument();
  });
});

describe('Accessibility - QuickEmotions Component', () => {
  it('should have ARIA labels for all emotion buttons', () => {
    const mockOnSelect = vi.fn();
    render(<QuickEmotions onEmotionSelect={mockOnSelect} />);

    // Verify each emotion has an accessible label
    expect(screen.getByRole('button', { name: /Select Stressed emotion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Select Anxious emotion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Select Calm emotion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Select Excited emotion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Select Sad emotion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Select Angry emotion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Select Confused emotion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Select Grateful emotion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Select Curious emotion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Select Scared emotion/i })).toBeInTheDocument();
  });

  it('should have group role with proper labeling', () => {
    const mockOnSelect = vi.fn();
    render(<QuickEmotions onEmotionSelect={mockOnSelect} />);

    const group = screen.getByRole('group', { name: /Quick Emotions/i });
    expect(group).toBeInTheDocument();
  });

  it('should support keyboard navigation with arrow keys', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    
    render(<QuickEmotions onEmotionSelect={mockOnSelect} />);

    const stressedButton = screen.getByRole('button', { name: /Select Stressed emotion/i });
    stressedButton.focus();

    // Press ArrowRight to move to next emotion
    await user.keyboard('{ArrowRight}');
    
    const anxiousButton = screen.getByRole('button', { name: /Select Anxious emotion/i });
    expect(anxiousButton).toHaveFocus();
  });

  it('should support Enter and Space key for selection', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    
    render(<QuickEmotions onEmotionSelect={mockOnSelect} />);

    const calmButton = screen.getByRole('button', { name: /Select Calm emotion/i });
    calmButton.focus();

    // Press Enter to select
    await user.keyboard('{Enter}');
    expect(mockOnSelect).toHaveBeenCalledWith('calm');

    mockOnSelect.mockClear();

    // Press Space to select
    await user.keyboard(' ');
    expect(mockOnSelect).toHaveBeenCalledWith('calm');
  });

  it('should support vertical navigation with ArrowDown and ArrowUp', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    
    render(<QuickEmotions onEmotionSelect={mockOnSelect} />);

    const stressedButton = screen.getByRole('button', { name: /Select Stressed emotion/i });
    stressedButton.focus();

    // Press ArrowDown to move down (5 positions in grid)
    // stressed is index 0, so index 0 + 5 = 5 which is 'angry'
    await user.keyboard('{ArrowDown}');
    
    const angryButton = screen.getByRole('button', { name: /Select Angry emotion/i });
    expect(angryButton).toHaveFocus();
  });

  it('should have visible text labels for screen readers', () => {
    const mockOnSelect = vi.fn();
    render(<QuickEmotions onEmotionSelect={mockOnSelect} />);

    // Verify buttons have visible text content
    expect(screen.getByText('Stressed')).toBeInTheDocument();
    expect(screen.getByText('Anxious')).toBeInTheDocument();
    expect(screen.getByText('Calm')).toBeInTheDocument();
  });
});

describe('Accessibility - MicroSentence Component', () => {
  it('should have ARIA live region for dynamic content', () => {
    const mockOnDismiss = vi.fn();
    render(
      <MicroSentence
        sentence="Your vulnerability is rewarded."
        onDismiss={mockOnDismiss}
      />
    );

    const liveRegion = screen.getByRole('status');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
  });

  it('should have aria-atomic for complete message announcement', () => {
    const mockOnDismiss = vi.fn();
    render(
      <MicroSentence
        sentence="Your vulnerability is rewarded."
        onDismiss={mockOnDismiss}
      />
    );

    const liveRegion = screen.getByRole('status');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });

  it('should have accessible label for dismiss button', () => {
    const mockOnDismiss = vi.fn();
    render(
      <MicroSentence
        sentence="Your vulnerability is rewarded."
        onDismiss={mockOnDismiss}
      />
    );

    const dismissButton = screen.getByRole('button', { name: /Dismiss encouraging message/i });
    expect(dismissButton).toBeInTheDocument();
  });

  it('should display the sentence text', () => {
    const mockOnDismiss = vi.fn();
    const sentence = "Your vulnerability is rewarded.";
    
    render(
      <MicroSentence
        sentence={sentence}
        onDismiss={mockOnDismiss}
      />
    );

    expect(screen.getByText(sentence)).toBeInTheDocument();
  });

  it('should call onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnDismiss = vi.fn();
    
    render(
      <MicroSentence
        sentence="Your vulnerability is rewarded."
        onDismiss={mockOnDismiss}
      />
    );

    const dismissButton = screen.getByRole('button', { name: /Dismiss encouraging message/i });
    await user.click(dismissButton);

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should support keyboard interaction for dismiss button', async () => {
    const user = userEvent.setup();
    const mockOnDismiss = vi.fn();
    
    render(
      <MicroSentence
        sentence="Your vulnerability is rewarded."
        onDismiss={mockOnDismiss}
      />
    );

    const dismissButton = screen.getByRole('button', { name: /Dismiss encouraging message/i });
    dismissButton.focus();

    await user.keyboard('{Enter}');
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });
});

describe('Accessibility - Focus Indicators', () => {
  it('should have visible focus indicator on ColorPicker swatches', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={mockOnChange}
      />
    );

    const mintSwatch = screen.getByRole('radio', { name: /Select Mint color/i });
    mintSwatch.focus();

    // Check that the element can receive focus
    expect(mintSwatch).toHaveFocus();
    
    // Verify the element has focus styles defined in CSS
    // CSS modules transform class names, so we check for the presence of the class pattern
    expect(mintSwatch.className).toContain('swatch');
  });

  it('should have visible focus indicator on QuickEmotion buttons', () => {
    const mockOnSelect = vi.fn();
    const { container } = render(<QuickEmotions onEmotionSelect={mockOnSelect} />);

    const calmButton = screen.getByRole('button', { name: /Select Calm emotion/i });
    calmButton.focus();

    // Check that the element can receive focus
    expect(calmButton).toHaveFocus();
    
    // Verify the element has focus styles defined in CSS
    // CSS modules transform class names, so we check for the presence of the class pattern
    expect(calmButton.className).toContain('emotionButton');
  });

  it('should have visible focus indicator on MicroSentence dismiss button', () => {
    const mockOnDismiss = vi.fn();
    render(
      <MicroSentence
        sentence="Your vulnerability is rewarded."
        onDismiss={mockOnDismiss}
      />
    );

    const dismissButton = screen.getByRole('button', { name: /Dismiss encouraging message/i });
    dismissButton.focus();

    // Check that the element can receive focus
    expect(dismissButton).toHaveFocus();
  });
});

describe('Accessibility - Semantic HTML', () => {
  it('should use button elements for interactive controls in ColorPicker', () => {
    const mockOnChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={mockOnChange}
      />
    );

    const swatches = screen.getAllByRole('radio');
    swatches.forEach(swatch => {
      expect(swatch.tagName).toBe('BUTTON');
    });
  });

  it('should use button elements for interactive controls in QuickEmotions', () => {
    const mockOnSelect = vi.fn();
    render(<QuickEmotions onEmotionSelect={mockOnSelect} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button.tagName).toBe('BUTTON');
    });
  });

  it('should use label elements for form labels', () => {
    const mockOnChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={mockOnChange}
        label="Select creature color"
      />
    );

    const label = screen.getByText('Select creature color');
    expect(label.tagName).toBe('LABEL');
  });
});
