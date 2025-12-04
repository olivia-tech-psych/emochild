# Implementation Plan

- [x] 1. Update type definitions and extend data models





  - Add CreatureCustomization, PastelColor, and QuickEmotion types to src/types/index.ts
  - Extend EmotionLog interface with textColor and quickEmotion fields
  - Extend AppState interface with customization and microSentenceIndex
  - _Requirements: 2.6, 3.2, 4.3, 8.1_

- [x] 2. Extend localStorage service for new data










  - Add saveCustomization and loadCustomization methods
  - Add saveMicroSentenceIndex and loadMicroSentenceIndex methods
  - Update saveLogs to handle textColor and quickEmotion fields
  - Implement migration logic for existing logs without new fields
  - _Requirements: 2.6, 4.3, 8.1, 8.3, 8.4_

- [ ]* 2.1 Write property test for customization persistence
  - **Property 3: Customization persistence round-trip**
  - **Validates: Requirements 2.6, 8.1, 8.4**

- [ ]* 2.2 Write property test for log persistence with new fields
  - **Property 7: Log persistence with color and quick emotion**
  - **Validates: Requirements 4.3, 8.3**

- [x] 3. Create micro-sentence utility







  - Create src/utils/microSentences.ts with sentence array
  - Implement getNextMicroSentence function with cycling logic
  - Implement getMicroSentenceByIndex helper
  - _Requirements: 5.1, 5.2, 5.3_

- [ ]* 3.1 Write property test for micro-sentence cycling
  - **Property 10: Micro-sentences cycle sequentially**
  - **Validates: Requirements 5.2, 5.3**

- [x] 4. Create color mapping utilities







  - Create src/utils/colorMapping.ts
  - Implement COLOR_HEX_MAP with all 8 pastel colors plus white
  - Implement COLOR_GLOW_MAP for glow effects
  - Add helper functions for color transformations (dimming/brightening)
  - _Requirements: 4.1, 6.4, 6.5_

- [ ]* 4.1 Write property test for color dimming
  - **Property 14: Dimming preserves base color**
  - **Validates: Requirements 6.4**

- [ ]* 4.2 Write property test for color brightening
  - **Property 15: Brightening preserves base color**
  - **Validates: Requirements 6.5**

- [x] 5. Update global CSS with extended color palette




  - Add all 8 pastel color variables to globals.css
  - Add glow effect variables for each color
  - Add dark pink bow color (#C11C84)
  - Define animation for micro-sentence fade in/out
  - _Requirements: 4.1, 6.2_

- [x] 6. Extend EmotionContext with new state and methods





  - Add customization state and setCustomization method
  - Add microSentenceIndex state and getNextMicroSentence method
  - Add currentMicroSentence state for display
  - Implement deleteLog method with safety score recalculation
  - Update addLog to accept textColor and quickEmotion parameters
  - Load customization and micro-sentence index from localStorage on mount
  - _Requirements: 2.6, 4.3, 5.1, 5.2, 7.3, 7.5, 8.4_

- [ ]* 6.1 Write property test for safety score on deletion
  - **Property 18: Deleting expressed logs updates safety score**
  - **Validates: Requirements 7.5**

- [x] 7. Build ColorPicker component




  - Create src/components/ColorPicker with color swatch grid
  - Implement color selection with visual feedback
  - Support includeWhite prop for text color selector
  - Add accessible labels and keyboard navigation
  - Style with pastel colors and focus indicators
  - _Requirements: 2.4, 4.1, 4.2_

- [ ]* 7.1 Write property test for color selection updates
  - **Property 2: Color selection updates preview in real-time**
  - **Validates: Requirements 2.4**

- [ ]* 7.2 Write property test for text color applies immediately
  - **Property 6: Text color applies immediately**
  - **Validates: Requirements 4.2**

- [x] 8. Build LandingHero component





  - Create src/components/LandingHero
  - Display app name "EmoChild: Your Inner Child in Your Pocket"
  - Show explanation text with pastel glow effect
  - Render "Start" button with mint accent
  - Handle navigation to setup flow
  - _Requirements: 1.1, 1.2, 1.3, 1.5_

- [x] 9. Build SetupForm component





  - Create src/components/SetupForm
  - Implement name input with 50 character limit
  - Integrate ColorPicker for creature color selection
  - Add preview blob that updates with selected color
  - Implement bow toggle checkbox
  - Validate name is not empty before enabling continue button
  - Call onComplete with customization data
  - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ]* 9.1 Write unit test for setup form validation
  - Test continue button disabled when name is empty
  - Test preview blob updates with color selection
  - _Requirements: 2.2, 2.4_

- [x] 10. Build QuickEmotions component





  - Create src/components/QuickEmotions
  - Render 10 quick emotion buttons in grid layout
  - Style buttons with appropriate pastel colors
  - Implement onEmotionSelect callback
  - Add accessible labels and keyboard support
  - _Requirements: 3.1, 3.2_

- [ ]* 10.1 Write property test for quick emotion prefill
  - **Property 4: Quick emotion prefills input**
  - **Validates: Requirements 3.2, 3.3**

- [ ]* 10.2 Write property test for prefilled text validation
  - **Property 5: Prefilled text maintains validation**
  - **Validates: Requirements 3.4**

- [x] 11. Build MicroSentence component





  - Create src/components/MicroSentence
  - Display sentence with fade-in animation
  - Implement auto-dismiss after 2 seconds
  - Allow manual dismissal
  - Apply pastel glow effect
  - _Requirements: 5.1, 5.5_

- [ ]* 11.1 Write property test for expressed emotions trigger sentences
  - **Property 9: Expressed emotions trigger micro-sentences**
  - **Validates: Requirements 5.1**

- [ ]* 11.2 Write property test for suppressed emotions skip sentences
  - **Property 11: Suppressed emotions skip micro-sentences**
  - **Validates: Requirements 5.4**

- [x] 12. Update EmotionInput component





  - Add initialText prop for quick emotion prefilling
  - Integrate ColorPicker for text color selection
  - Pass selected textColor to onSubmit callback
  - Maintain character counter with prefilled text
  - _Requirements: 3.3, 3.4, 4.2, 4.3_

- [x] 13. Update Creature component





  - Accept customization prop with color and hasBow
  - Apply customization.color to creature rendering
  - Render dark pink bow (#C11C84) if hasBow is true
  - Maintain color through brightness/size state changes
  - Implement color dimming and brightening while preserving hue
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 13.1 Write property test for creature color display
  - **Property 12: Creature displays in selected color**
  - **Validates: Requirements 6.1**

- [ ]* 13.2 Write property test for color persistence through state changes
  - **Property 13: Creature color persists through state changes**
  - **Validates: Requirements 6.3**

- [x] 14. Update LogHistory component





  - Add onDelete prop for deletion callback
  - Render text in log.textColor if present
  - Display emoji based on action type (🌱 for expressed, 🌑 for suppressed)
  - Add delete button for each entry
  - Implement confirmation dialog before deletion
  - Apply pastel dividers between entries
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]* 14.1 Write property test for log display completeness
  - **Property 16: Log display completeness with color**
  - **Validates: Requirements 7.1**

- [ ]* 14.2 Write property test for log deletion
  - **Property 17: Log deletion removes from storage**
  - **Validates: Requirements 7.3**

- [ ]* 14.3 Write property test for history displays saved colors
  - **Property 8: History displays logs in saved colors**
  - **Validates: Requirements 4.4**

- [x] 15. Create landing page at root route





  - Create src/app/page.tsx as landing page
  - Integrate LandingHero component
  - Implement navigation to /setup on Start button click
  - Apply dark background with pastel glow
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 15.1 Write property test for landing page always displays
  - **Property 1: Landing page always displays on app load**
  - **Validates: Requirements 1.4**

- [x] 16. Create setup flow page





  - Create src/app/setup/page.tsx
  - Integrate SetupForm component
  - Handle customization completion
  - Save to context and localStorage
  - Navigate to /creature after completion
  - _Requirements: 2.1, 2.2, 2.6, 2.7_

- [x] 17. Move main creature screen to /creature route





  - Move existing page.tsx content to src/app/creature/page.tsx
  - Add route guard to redirect to /setup if no customization exists
  - Integrate QuickEmotions component
  - Integrate MicroSentence component for display
  - Update EmotionInput with color picker
  - Pass customization to Creature component
  - _Requirements: 3.1, 4.1, 5.1, 6.1_

- [x] 18. Update history page




  - Update src/app/history/page.tsx
  - Pass onDelete callback to LogHistory component
  - Implement confirmation dialog for deletion
  - Handle deletion through context
  - _Requirements: 7.2, 7.3_

- [x] 19. Implement navigation flow




  - Ensure landing page is always shown on app load
  - Implement Start button navigation to setup or creature
  - Add route guard for creature screen
  - Allow navigation back to landing from creature
  - _Requirements: 1.4, 2.1_

- [ ] 20. Add bow accessory CSS
  - Create CSS for bow rendering in Creature component
  - Use dark pink color (#C11C84)
  - Position bow on creature's head
  - Implement bow shape with pseudo-elements
  - _Requirements: 6.2_

- [x] 21. Implement text color preference persistence





  - Store last selected text color in context
  - Restore text color preference for next log
  - Default to white if no preference exists
  - _Requirements: 8.2_

- [ ]* 21.1 Write property test for text color preference
  - **Property 19: Text color preference persists**
  - **Validates: Requirements 8.2**

- [x] 22. Implement setting changes persistence





  - Ensure all customization changes save immediately
  - Update localStorage on any setting change
  - Verify changes persist on app reload
  - _Requirements: 8.5_

- [ ]* 22.1 Write property test for setting changes
  - **Property 20: Setting changes persist immediately**
  - **Validates: Requirements 8.5**

- [x] 23. Add accessibility features










  - Add ARIA labels for color swatches
  - Add ARIA labels for quick emotion buttons
  - Add ARIA live regions for micro-sentence display
  - Ensure keyboard navigation for all new components
  - Test focus indicators on all interactive elements
  - _Requirements: 2.4, 3.1, 5.1_

- [x] 24. Implement migration for existing users





  - Add migration logic in storageService for old logs
  - Default textColor to white for existing logs
  - Prompt existing users to complete setup flow
  - Preserve existing logs and creature state
  - _Requirements: 8.3, 8.4_

- [x] 25. Polish animations and transitions





  - Ensure smooth color transitions on creature
  - Implement micro-sentence fade in/out animation
  - Add smooth transitions for color picker selection
  - Test animation performance
  - _Requirements:
   5.5, 6.4, 6.5_

- [x] 26. Final checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.
