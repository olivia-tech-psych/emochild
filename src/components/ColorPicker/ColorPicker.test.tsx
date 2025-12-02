/**
 * ColorPicker Component Tests
 * Unit tests for color selection functionality
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ColorPicker } from './ColorPicker';
import { PastelColor } from '@/types';

describe('ColorPicker', () => {
  it('should render all 8 pastel colors when includeWhite is false', () => {
    const handleChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={handleChange}
        includeWhite={false}
      />
    );

    // Should have 8 color swatches
    const swatches = screen.getAllByRole('radio');
    expect(swatches).toHaveLength(8);
  });

  it('should render 9 colors including white when includeWhite is true', () => {
    const handleChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="white"
        onColorChange={handleChange}
        includeWhite={true}
      />
    );

    // Should have 9 color swatches (8 pastels + white)
    const swatches = screen.getAllByRole('radio');
    expect(swatches).toHaveLength(9);
  });

  it('should mark the selected color as checked', () => {
    const handleChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="blue"
        onColorChange={handleChange}
      />
    );

    const blueButton = screen.getByLabelText('Select Blue color');
    expect(blueButton).toHaveAttribute('aria-checked', 'true');
  });

  it('should call onColorChange when a color is clicked', () => {
    const handleChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={handleChange}
      />
    );

    const lavenderButton = screen.getByLabelText('Select Lavender color');
    fireEvent.click(lavenderButton);

    expect(handleChange).toHaveBeenCalledWith('lavender');
  });

  it('should call onColorChange when Enter key is pressed', () => {
    const handleChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={handleChange}
      />
    );

    const peachButton = screen.getByLabelText('Select Peach color');
    fireEvent.keyDown(peachButton, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledWith('peach');
  });

  it('should call onColorChange when Space key is pressed', () => {
    const handleChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={handleChange}
      />
    );

    const pinkButton = screen.getByLabelText('Select Pink color');
    fireEvent.keyDown(pinkButton, { key: ' ' });

    expect(handleChange).toHaveBeenCalledWith('pink');
  });

  it('should display optional label when provided', () => {
    const handleChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={handleChange}
        label="Choose your color"
      />
    );

    expect(screen.getByText('Choose your color')).toBeInTheDocument();
  });

  it('should have proper ARIA attributes for accessibility', () => {
    const handleChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="orange"
        onColorChange={handleChange}
        label="Select color"
      />
    );

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-label', 'Select color');

    const selectedButton = screen.getByLabelText('Select Orange color');
    expect(selectedButton).toHaveAttribute('role', 'radio');
    expect(selectedButton).toHaveAttribute('aria-checked', 'true');
    expect(selectedButton).toHaveAttribute('tabIndex', '0');
  });

  it('should set tabIndex to -1 for non-selected colors', () => {
    const handleChange = vi.fn();
    render(
      <ColorPicker
        selectedColor="mint"
        onColorChange={handleChange}
      />
    );

    const blueButton = screen.getByLabelText('Select Blue color');
    expect(blueButton).toHaveAttribute('tabIndex', '-1');
  });

  it('should display checkmark on selected color', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <ColorPicker
        selectedColor="red"
        onColorChange={handleChange}
      />
    );

    const redButton = screen.getByLabelText('Select Red color');
    expect(redButton.textContent).toContain('✓');
  });
});
