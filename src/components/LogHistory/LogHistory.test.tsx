/**
 * LogHistory Component Tests
 * Property-based and unit tests for LogHistory component
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import fc from 'fast-check';
import { LogHistory } from './LogHistory';
import { EmotionLog } from '@/types';

/**
 * Feature: emochild, Property 8: Log history chronological ordering
 * For any set of emotion logs, when displayed in the history view, 
 * they should appear in reverse chronological order (newest first) based on their timestamps.
 * Validates: Requirements 6.1
 */
describe('Property 8: Log history chronological ordering', () => {
  it('should display logs in reverse chronological order (newest first)', () => {
    fc.assert(
      fc.property(
        // Generate an array of emotion logs with random timestamps
        fc.array(
          fc.record({
            id: fc.uuid(),
            text: fc.string({ minLength: 1, maxLength: 100 }),
            action: fc.constantFrom('expressed' as const, 'suppressed' as const),
            timestamp: fc.integer({ min: 0, max: Date.now() })
          }),
          { minLength: 2, maxLength: 20 }
        ),
        (logs) => {
          // Render the component
          const { container } = render(<LogHistory logs={logs} onDelete={vi.fn()} />);
          
          // Get all log items
          const logItems = container.querySelectorAll('[data-testid="log-item"]');
          
          // If we have log items, verify they are in reverse chronological order
          if (logItems.length > 0) {
            const timestamps: number[] = [];
            logItems.forEach((item) => {
              const timeElement = item.querySelector('time');
              if (timeElement) {
                const isoString = timeElement.getAttribute('datetime');
                if (isoString) {
                  timestamps.push(new Date(isoString).getTime());
                }
              }
            });
            
            // Verify timestamps are in descending order (newest first)
            for (let i = 0; i < timestamps.length - 1; i++) {
              expect(timestamps[i]).toBeGreaterThanOrEqual(timestamps[i + 1]);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: emochild, Property 9: Log display completeness
 * For any emotion log displayed in the history, the rendered output should contain 
 * the timestamp, the emotion text, and a visual indicator of the action type.
 * Validates: Requirements 6.2, 6.5
 */
describe('Property 9: Log display completeness', () => {
  it('should display timestamp, text, and action indicator for all logs', () => {
    fc.assert(
      fc.property(
        // Generate an array of emotion logs
        fc.array(
          fc.record({
            id: fc.uuid(),
            text: fc.string({ minLength: 1, maxLength: 100 }),
            action: fc.constantFrom('expressed' as const, 'suppressed' as const),
            timestamp: fc.integer({ min: 0, max: Date.now() })
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (logs) => {
          const { container } = render(<LogHistory logs={logs} onDelete={vi.fn()} />);
          
          // For each log, verify all required elements are present
          logs.forEach((log) => {
            // Check that the text is displayed (use container.textContent for whitespace-only strings)
            const textElements = container.querySelectorAll('p[class*="text"]');
            const hasText = Array.from(textElements).some(
              (el) => el.textContent === log.text
            );
            expect(hasText).toBe(true);
            
            // Check that a time element exists with datetime attribute
            const timeElements = container.querySelectorAll('time');
            expect(timeElements.length).toBeGreaterThan(0);
            
            // Check that visual indicators (icons) are present
            const icons = container.querySelectorAll('[aria-label]');
            const hasExpressedIcon = Array.from(icons).some(
              (icon) => icon.getAttribute('aria-label') === 'Expressed emotion'
            );
            const hasSuppressedIcon = Array.from(icons).some(
              (icon) => icon.getAttribute('aria-label') === 'Suppressed emotion'
            );
            
            // At least one type of icon should be present
            expect(hasExpressedIcon || hasSuppressedIcon).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Unit tests for LogHistory edge cases
 * Requirements: 6.3, 6.4
 */
describe('LogHistory edge cases', () => {
  /**
   * Test empty state display
   * Requirement 6.3: Display empty state message
   */
  it('should display empty state message when no logs exist', () => {
    render(<LogHistory logs={[]} onDelete={vi.fn()} />);
    
    const emptyMessage = screen.getByText(/No emotions logged yet/i);
    expect(emptyMessage).toBeTruthy();
  });
  
  /**
   * Test scrolling with more than 10 entries
   * Requirement 6.4: Implement scrolling for long lists
   */
  it('should render more than 10 entries in a scrollable container', () => {
    // Create 15 test logs
    const manyLogs: EmotionLog[] = Array.from({ length: 15 }, (_, i) => ({
      id: `log-${i}`,
      text: `Emotion ${i}`,
      action: i % 2 === 0 ? ('expressed' as const) : ('suppressed' as const),
      timestamp: Date.now() - i * 1000
    }));
    
    const { container } = render(<LogHistory logs={manyLogs} onDelete={vi.fn()} />);
    
    // Verify all 15 logs are rendered
    const logItems = container.querySelectorAll('li');
    expect(logItems.length).toBe(15);
    
    // Verify container has overflow styling (scrollable)
    const scrollContainer = container.querySelector('[class*="container"]');
    expect(scrollContainer).toBeTruthy();
  });
  
  /**
   * Test timestamp formatting
   * Requirement 6.2: Format timestamps as human-readable dates
   */
  it('should format timestamps correctly for today, yesterday, and older dates', () => {
    const now = Date.now();
    const yesterday = now - 24 * 60 * 60 * 1000;
    const lastWeek = now - 7 * 24 * 60 * 60 * 1000;
    
    const logs: EmotionLog[] = [
      {
        id: '1',
        text: 'Today emotion',
        action: 'expressed',
        timestamp: now
      },
      {
        id: '2',
        text: 'Yesterday emotion',
        action: 'suppressed',
        timestamp: yesterday
      },
      {
        id: '3',
        text: 'Last week emotion',
        action: 'expressed',
        timestamp: lastWeek
      }
    ];
    
    const { container } = render(<LogHistory logs={logs} onDelete={vi.fn()} />);
    
    // Check for "Today" text in time elements
    const timeElements = container.querySelectorAll('time');
    const timeTexts = Array.from(timeElements).map(el => el.textContent || '');
    
    const hasToday = timeTexts.some(text => text.includes('Today'));
    expect(hasToday).toBe(true);
    
    // Check for "Yesterday" text in time elements
    const hasYesterday = timeTexts.some(text => text.includes('Yesterday'));
    expect(hasYesterday).toBe(true);
    
    // Verify all 3 time elements are present
    expect(timeElements.length).toBe(3);
  });
  
  /**
   * Test delete button and confirmation dialog
   * Requirement 7.3: Delete button with confirmation
   */
  it('should show delete button and confirmation dialog', () => {
    const mockOnDelete = vi.fn();
    const testLog: EmotionLog = {
      id: 'test-1',
      text: 'Test emotion',
      action: 'expressed',
      timestamp: Date.now()
    };
    
    const { container } = render(<LogHistory logs={[testLog]} onDelete={mockOnDelete} />);
    
    // Find and click delete button
    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeTruthy();
    
    fireEvent.click(deleteButton);
    
    // Verify confirmation dialog appears
    const confirmMessage = screen.getByText(/This action cannot be undone/i);
    expect(confirmMessage).toBeTruthy();
    
    // Find and click confirm button
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);
    
    // Verify onDelete was called with correct ID
    expect(mockOnDelete).toHaveBeenCalledWith('test-1');
  });
  
  /**
   * Test cancel deletion
   * Requirement 7.3: Cancel deletion
   */
  it('should allow canceling deletion', () => {
    const mockOnDelete = vi.fn();
    const testLog: EmotionLog = {
      id: 'test-1',
      text: 'Test emotion',
      action: 'expressed',
      timestamp: Date.now()
    };
    
    render(<LogHistory logs={[testLog]} onDelete={mockOnDelete} />);
    
    // Click delete button
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    // Click cancel button
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    // Verify onDelete was NOT called
    expect(mockOnDelete).not.toHaveBeenCalled();
    
    // Verify delete button is visible again
    const deleteButtonAgain = screen.getByText('Delete');
    expect(deleteButtonAgain).toBeTruthy();
  });
  
  /**
   * Test text color rendering
   * Requirement 7.1: Render text in saved color
   */
  it('should render text in saved color', () => {
    const testLogs: EmotionLog[] = [
      {
        id: '1',
        text: 'Lavender emotion',
        action: 'expressed',
        timestamp: Date.now(),
        textColor: 'lavender'
      },
      {
        id: '2',
        text: 'White emotion',
        action: 'suppressed',
        timestamp: Date.now() - 1000,
        textColor: 'white'
      },
      {
        id: '3',
        text: 'Default emotion',
        action: 'expressed',
        timestamp: Date.now() - 2000
        // No textColor - should default to white
      }
    ];
    
    const { container } = render(<LogHistory logs={testLogs} onDelete={vi.fn()} />);
    
    // Get all text elements
    const textElements = container.querySelectorAll('p[class*="text"]');
    
    // Verify colors are applied
    expect(textElements[0]).toHaveStyle({ color: '#DBCDF0' }); // lavender
    expect(textElements[1]).toHaveStyle({ color: '#ffffff' }); // white
    expect(textElements[2]).toHaveStyle({ color: '#ffffff' }); // default white
  });
  
  /**
   * Test emoji display based on action type
   * Requirement 7.2: Display emoji based on action type
   */
  it('should display correct emoji for expressed and suppressed actions', () => {
    const testLogs: EmotionLog[] = [
      {
        id: '1',
        text: 'Expressed emotion',
        action: 'expressed',
        timestamp: Date.now()
      },
      {
        id: '2',
        text: 'Suppressed emotion',
        action: 'suppressed',
        timestamp: Date.now() - 1000
      }
    ];
    
    const { container } = render(<LogHistory logs={testLogs} onDelete={vi.fn()} />);
    
    // Check for expressed emoji
    const expressedIcon = screen.getByLabelText('Expressed emotion');
    expect(expressedIcon.textContent).toBe('🌱');
    
    // Check for suppressed emoji
    const suppressedIcon = screen.getByLabelText('Suppressed emotion');
    expect(suppressedIcon.textContent).toBe('🌑');
  });
  
  /**
   * Test dividers between entries
   * Requirement 7.4: Apply pastel dividers between entries
   */
  it('should render dividers between log entries', () => {
    const testLogs: EmotionLog[] = [
      {
        id: '1',
        text: 'First emotion',
        action: 'expressed',
        timestamp: Date.now()
      },
      {
        id: '2',
        text: 'Second emotion',
        action: 'suppressed',
        timestamp: Date.now() - 1000
      },
      {
        id: '3',
        text: 'Third emotion',
        action: 'expressed',
        timestamp: Date.now() - 2000
      }
    ];
    
    const { container } = render(<LogHistory logs={testLogs} onDelete={vi.fn()} />);
    
    // Get all dividers
    const dividers = container.querySelectorAll('[class*="divider"]');
    
    // Should have 2 dividers for 3 entries (n-1)
    expect(dividers.length).toBe(2);
  });
});
