# Implementation Plan

- [x] 1. Initialize Next.js project with TypeScript and testing setup





  - Create Next.js 14+ app with App Router and TypeScript
  - Install dependencies: Vitest, @testing-library/react, fast-check
  - Configure Vitest for testing
  - Set up basic project structure with src/ directory
  - _Requirements: 9.1, 9.3_

- [x] 2. Create type definitions and core data models





  - Define TypeScript types in src/types/index.ts
  - Create EmotionAction, EmotionLog, CreatureState, and AppState interfaces
  - Export all types for use across the application
  - _Requirements: 2.2, 2.3, 3.1, 3.2, 4.1, 5.3_

- [x] 3. Implement localStorage service layer





  - Create storageService.ts with save/load methods for logs, creature state, and safety score
  - Implement error handling for localStorage failures
  - Add clearAll method for data management
  - _Requirements: 5.1, 5.2, 5.4_

- [ ]* 3.1 Write property test for storage round-trip
  - **Property 2: Emotion log persistence round-trip**
  - **Validates: Requirements 2.2, 2.3, 5.1, 5.2, 5.3**

- [ ]* 3.2 Write property test for full state persistence
  - **Property 7: State persistence round-trip**
  - **Validates: Requirements 4.5, 9.5**

- [x] 4. Implement creature state calculation utilities





  - Create creatureState.ts with calculateNewState function
  - Implement brightness and size calculation logic with bounds (0-100)
  - Create getInitialState function returning default state
  - Implement animation state determination based on action type
  - _Requirements: 3.1, 3.2, 3.4, 3.5_

- [x] 4.1 Write property test for creature brightness calculations



  - **Property 4: Creature brightness responds to actions**
  - **Validates: Requirements 3.1, 3.2**

- [x] 4.2 Write unit tests for creature state edge cases


  - Test maximum brightness (100) triggers celebrate animation
  - Test minimum brightness (0) behavior
  - Test boundary conditions for size calculations
  - _Requirements: 3.4, 3.5_

- [x] 5. Set up global theme and CSS variables





  - Create globals.css with CSS custom properties for colors, spacing, and animations
  - Define dark pastel color palette (charcoal, mint, lavender, peach, blue, blush pink)
  - Set up typography system with font sizes and weights
  - Define animation timing variables
  - _Requirements: 7.1, 7.2, 7.4_

- [x] 5.1 Write property test for text contrast accessibility



  - **Property 10: Text contrast accessibility**
  - **Validates: Requirements 7.3**

- [x] 6. Create EmotionContext for global state management





  - Implement EmotionContext with React Context API
  - Create provider component with state for logs, creatureState, and safetyScore
  - Implement addLog method that creates log, updates creature state, updates safety score, and persists to storage
  - Load initial state from localStorage on mount
  - _Requirements: 2.2, 2.3, 4.1, 5.1, 5.2_

- [ ]* 6.1 Write property test for safety score calculation
  - **Property 5: Safety score only counts expressions**
  - **Validates: Requirements 4.1, 4.2**

- [x] 7. Build EmotionInput component





  - Create component with text input and character counter
  - Implement maxLength validation (100 characters)
  - Display remaining character count in real-time
  - Auto-focus input on mount
  - Prevent submission when input is empty
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 7.1 Write property test for input length constraints
  - **Property 1: Input length constraint enforcement**
  - **Validates: Requirements 1.2, 1.3**

- [x] 7.2 Write unit tests for EmotionInput edge cases



  - Test empty input prevents submission
  - Test auto-focus behavior
  - Test character counter display
  - _Requirements: 1.4, 1.5_

- [x] 8. Build ActionButtons component





  - Create Express and Suppress buttons with appropriate styling
  - Disable buttons when no text is entered
  - Apply mint color to Express button and lavender to Suppress button
  - Implement click handlers for both actions
  - _Requirements: 2.1, 2.5_

- [ ]* 8.1 Write property test for focus indicators
  - **Property 11: Focus indicator presence**
  - **Validates: Requirements 7.5**

- [x] 9. Build Creature component with animations





  - Create CSS-based creature blob with gradient and glow effect
  - Implement idle breathing animation
  - Implement grow animation for expressed emotions
  - Implement curl animation for suppressed emotions
  - Implement celebrate animation for maximum brightness
  - Apply brightness filter based on creature state
  - Apply scale transform based on creature size
  - _Requirements: 3.1, 3.2, 3.4, 3.5, 8.1, 8.4_

- [x] 9.1 Write unit tests for creature animation states



  - Test correct animation class applied for each state
  - Test brightness and size transforms
  - _Requirements: 3.1, 3.2, 8.1_

- [x] 10. Build SafetyBar component





  - Create progress bar with fill animation
  - Display numeric safety score
  - Animate bar growth with 0.5s transition
  - Use mint pastel color for fill
  - _Requirements: 4.1, 4.3, 4.4_

- [ ]* 10.1 Write property test for safety bar display accuracy
  - **Property 6: Safety bar displays current score**
  - **Validates: Requirements 4.4**

- [x] 11. Create main page layout integrating all components





  - Build page.tsx with EmotionInput, ActionButtons, Creature, and SafetyBar
  - Wrap with EmotionContext provider
  - Implement layout with creature at top, safety bar below, input in middle
  - Connect components to context state and methods
  - Implement input clearing after submission
  - _Requirements: 1.1, 2.1, 2.4, 10.1, 10.4_

- [x] 11.1 Write property test for input clearing



  - **Property 3: Input clearing after submission**
  - **Validates: Requirements 2.4**


- [x] 11.2 Write property test for no external network requests


  - **Property 12: No external network requests**
  - **Validates: Requirements 9.2**

- [x] 12. Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Build LogHistory component





  - Create component to display logs in reverse chronological order
  - Format timestamps as human-readable dates
  - Apply visual indicators (icons/colors) for expressed vs suppressed
  - Implement empty state message
  - Add scrolling for long lists
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 13.1 Write property test for chronological ordering



  - **Property 8: Log history chronological ordering**
  - **Validates: Requirements 6.1**

- [x] 13.2 Write property test for log display completeness



  - **Property 9: Log display completeness**
  - **Validates: Requirements 6.2, 6.5**

- [x] 13.3 Write unit tests for LogHistory edge cases



  - Test empty state display
  - Test scrolling with more than 10 entries
  - Test timestamp formatting
  - _Requirements: 6.3, 6.4_

- [x] 14. Create history page with navigation





  - Build history/page.tsx with LogHistory component
  - Add back navigation link to main page
  - Style with dark pastel theme
  - Connect to EmotionContext to access logs
  - _Requirements: 6.1, 6.2_

- [x] 15. Add navigation between main and history pages




  - Create Navigation component with link to history page
  - Add to main page layout
  - Ensure smooth transitions without page reloads
  - _Requirements: 10.3_

- [x] 16. Implement accessibility features





  - Add ARIA labels to creature component
  - Add ARIA live regions for dynamic updates
  - Ensure all interactive elements are keyboard accessible
  - Add semantic HTML throughout
  - Test with keyboard navigation (Tab, Enter, Escape)
  - _Requirements: 7.5_

- [x] 17. Add error handling and user feedback




  - Implement inline validation message for empty input
  - Add error handling for localStorage failures with fallback
  - Display appropriate error messages with pastel styling
  - _Requirements: 1.4, 5.4_

- [x] 17.1 Write unit tests for error conditions






  - Test localStorage failure handling
  - Test empty input validation message
  - Test corrupted data recovery
  - _Requirements: 5.4_

- [x] 18. Polish animations and transitions





  - Ensure all animations use CSS custom properties for timing
  - Add smooth transitions for all state changes
  - Implement animation queuing for creature
  - Test animation performance
  - _Requirements: 3.3, 4.3, 8.2, 8.3_

- [x] 19. Final accessibility and responsive design pass





  - Test with screen readers
  - Verify WCAG AA contrast compliance
  - Test on mobile viewport sizes
  - Ensure touch-friendly button sizes
  - Add prefers-reduced-motion support
  - _Requirements: 7.3, 7.5_

- [x] 20. Final checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.
