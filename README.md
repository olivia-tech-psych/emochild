# emochild
EmoChild is a modern resurrection of the classic Tamagotchi (1996 digital pet), brought back with a new purpose:  you don’t feed it, clean it, or keep it alive. Instead, your creature grows every time you emotionally regulate, express, validate, or process a feeling. It’s a digital companion designed to mirror your emotional life.


## Current Features Implemented

- **Type System**: Complete TypeScript type definitions including EmotionLog, CreatureState, AppState, CreatureCustomization, PastelColor, and QuickEmotion types
- **Storage Service**: localStorage-based persistence layer with error handling for logs, creature state, safety scores, customization settings, and micro-sentence index
- **Creature State Logic**: Calculation utilities for brightness/size changes based on expressed/suppressed emotions
- **Global State Management**: React Context API implementation (EmotionContext) with extended state for customization, micro-sentences, and log deletion
- **Theme System**: Dark pastel color palette with CSS custom properties for 8 pastel colors plus white
- **Color Mapping Utilities**: Hex color mappings, glow effects, and color transformation functions (dimming/brightening) for all pastel colors
- **Micro-Sentence System**: Cycling validation messages (10 total) that display when emotions are expressed
- **EmotionInput Component**: Text input with 100-character limit, real-time character counter, auto-focus, inline validation error display for empty submissions, ColorPicker integration for text color selection, and support for quick emotion prefilling with initialText prop
- **ActionButtons Component**: Express and Suppress buttons with pastel styling, disabled state handling, and accessibility features
- **Creature Component**: Animated blob creature with four animation states (idle, grow, curl, celebrate), dynamic brightness filtering, size scaling based on emotional state, custom color support from user preferences, and optional dark pink bow accessory rendering
- **SafetyBar Component**: Progress bar displaying inner safety score with mint-colored fill, smooth growth animation, and numeric score display
- **ColorPicker Component**: Reusable color selector with 8 pastel color swatches plus optional white, keyboard navigation, and accessibility features for creature and text color customization
- **LandingHero Component**: Welcoming landing page hero section with app name, explanation text with pastel glow effect, and Start button with mint accent color and responsive design
- **SetupForm Component**: Creature customization form with name input (50 character limit), ColorPicker integration, real-time preview blob that updates with selected color, optional bow toggle checkbox, form validation, and support for both initial setup and editing modes with initialCustomization prop
- **QuickEmotions Component**: Grid of 10 quick emotion buttons (stressed, anxious, calm, excited, sad, angry, confused, grateful, curious, scared) with pastel color styling, keyboard navigation support, and accessibility features for faster emotion logging
- **MicroSentence Component**: Displays encouraging validation messages when emotions are expressed, with fade-in/out animation, auto-dismiss after 2 seconds, manual dismissal option, and soft pastel glow effect for emotional support
- **LogHistory Component**: Displays emotion logs in reverse chronological order with human-readable timestamps, visual indicators for expressed/suppressed actions, empty state handling, scrollable list, text color rendering from saved logs, delete functionality with confirmation dialog, edit functionality for log text, CSV export feature with UTF-8 BOM for proper emoji encoding, and pastel dividers between entries
- **Navigation Component**: Provides navigation links between main and history pages with smooth transitions using Next.js Link component, styled with pastel colors and focus indicators
- **Property-Based Testing**: fast-check integration for testing creature brightness calculations and text contrast accessibility
- **Unit Testing**: Comprehensive test coverage using Vitest and React Testing Library

## File Structure Overview

```
emochild/
├── src/
│   ├── app/
│   │   ├── globals.css         # Theme variables and global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main page (placeholder)
│   ├── components/
│   │   ├── ActionButtons/      # Express/Suppress action buttons
│   │   │   ├── ActionButtons.tsx
│   │   │   ├── ActionButtons.module.css
│   │   │   └── index.ts
│   │   ├── ColorPicker/        # Reusable color selector component
│   │   │   ├── ColorPicker.tsx
│   │   │   ├── ColorPicker.test.tsx
│   │   │   ├── ColorPicker.module.css
│   │   │   └── index.ts
│   │   ├── LandingHero/        # Landing page hero section
│   │   │   ├── LandingHero.tsx
│   │   │   ├── LandingHero.module.css
│   │   │   └── index.ts
│   │   ├── SetupForm/          # Creature customization form
│   │   │   ├── SetupForm.tsx
│   │   │   ├── SetupForm.module.css
│   │   │   └── index.ts
│   │   ├── Creature/           # Animated creature component
│   │   │   ├── Creature.tsx
│   │   │   ├── Creature.test.tsx
│   │   │   ├── Creature.module.css
│   │   │   └── index.ts
│   │   ├── EmotionInput/       # Emotion log input component
│   │   │   ├── EmotionInput.tsx
│   │   │   ├── EmotionInput.test.tsx
│   │   │   ├── EmotionInput.module.css
│   │   │   └── index.ts
│   │   ├── LogHistory/         # Emotion log history display
│   │   │   ├── LogHistory.tsx
│   │   │   ├── LogHistory.test.tsx
│   │   │   ├── LogHistory.module.css
│   │   │   └── index.ts
│   │   ├── MicroSentence/      # Validation message display
│   │   │   ├── MicroSentence.tsx
│   │   │   ├── MicroSentence.module.css
│   │   │   └── index.ts
│   │   ├── Navigation/         # Navigation between pages
│   │   │   ├── Navigation.tsx
│   │   │   ├── Navigation.module.css
│   │   │   └── index.ts
│   │   ├── QuickEmotions/      # Quick emotion buttons for faster logging
│   │   │   ├── QuickEmotions.tsx
│   │   │   ├── QuickEmotions.module.css
│   │   │   └── index.ts
│   │   └── SafetyBar/          # Inner safety score progress bar
│   │       ├── SafetyBar.tsx
│   │       ├── SafetyBar.module.css
│   │       └── index.ts
│   ├── context/
│   │   ├── EmotionContext.tsx       # Global state management
│   │   └── EmotionContext.test.tsx
│   ├── services/
│   │   ├── storageService.ts        # localStorage abstraction
│   │   └── storageService.test.ts
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   └── utils/
│       ├── colorMapping.ts          # Color hex/glow mappings and transformations
│       ├── colorMapping.test.ts
│       ├── creatureState.ts         # Creature state calculations
│       ├── creatureState.test.ts
│       ├── microSentences.ts        # Micro-sentence cycling logic
│       ├── microSentences.test.ts
│       └── contrast.test.ts         # Accessibility tests
├── vitest.config.ts
├── vitest.setup.ts
└── package.json
```

## Kiro Features Used (Vibe Coding, Specs, Hooks)

This project is being developed using **Kiro Specs**, a structured approach to building features:

**Version 1 (emochild):**
- **Requirements Document** (`.kiro/specs/emochild/requirements.md`): Defines 10 user stories with acceptance criteria
- **Design Document** (`.kiro/specs/emochild/design.md`): Specifies architecture, components, and 12 correctness properties for property-based testing
- **Tasks Document** (`.kiro/specs/emochild/tasks.md`): Breaks implementation into 20 incremental tasks

**Version 2 (emochild-v2):**
- **Requirements Document** (`.kiro/specs/emochild-v2/requirements.md`): Extends with 8 new user stories for landing page, customization, quick emotions, text colors, and micro-sentences
- **Design Document** (`.kiro/specs/emochild-v2/design.md`): Adds 20 new correctness properties for enhanced features
- **Tasks Document** (`.kiro/specs/emochild-v2/tasks.md`): Breaks v2 implementation into 26 incremental tasks

The spec-driven approach ensures:
- Clear requirements traceability
- Property-based testing aligned with design properties
- Incremental development with checkpoints
- Comprehensive test coverage from the start

## Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules with CSS custom properties
- **State Management**: React Context API
- **Storage**: Browser localStorage
- **Testing**: Vitest, @testing-library/react, fast-check
- **Animation**: CSS transitions and keyframes

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Changelog

### [2025-11-21 Initial Implementation]
- Set up Next.js 14 project with TypeScript and Vitest
- Implemented core type definitions (EmotionLog, CreatureState, AppState)
- Created localStorage service layer with error handling
- Built creature state calculation utilities with property-based tests
- Established dark pastel theme with CSS custom properties
- Implemented EmotionContext for global state management
- Created EmotionInput component with character counter and auto-focus
- Added comprehensive test coverage including property-based tests for brightness calculations and contrast accessibility

### [2025-11-21 ActionButtons Component]
- Implemented ActionButtons component with Express and Suppress buttons
- Added pastel styling with mint color for Express and lavender for Suppress
- Implemented disabled state handling when no text is entered
- Added hover effects, focus indicators, and smooth transitions
- Included accessibility features with ARIA labels and keyboard support
- Completed Task 8 from implementation plan

### [2025-11-21 Creature Component]
- Implemented Creature component with CSS-based animated blob design
- Added four animation states: idle (breathing), grow (expressed), curl (suppressed), and celebrate (max brightness)
- Implemented dynamic brightness filtering (0-100 maps to 0.5-1.5 brightness)
- Implemented dynamic size scaling (0-100 maps to 0.8-1.2 scale)
- Created comprehensive CSS animations with keyframes for all creature states
- Added unit tests covering animation classes, brightness transforms, size transforms, and accessibility
- Completed Task 9 from implementation plan

### [2025-11-21 SafetyBar Component]
- Implemented SafetyBar component displaying inner safety score with progress bar
- Added mint-colored fill with smooth 0.5s transition animation
- Displays numeric score with sparkle emoji (✨) for visual appeal
- Calculates percentage fill based on score/maxScore ratio (default max: 100)
- Styled with dark pastel theme matching overall design system
- Completed Task 10 from implementation plan

### [2025-11-21 LogHistory Component]
- Implemented LogHistory component for displaying emotion logs in reverse chronological order
- Added human-readable timestamp formatting (Today, Yesterday, or date with time)
- Implemented visual indicators with emoji icons (🌱 for expressed, 🌑 for suppressed)
- Created empty state message for when no logs exist
- Added scrollable container for long lists of emotion logs
- Styled with dark pastel theme using mint accent for expressed and muted lavender for suppressed
- Completed Task 13 from implementation plan

### [2025-11-21 Navigation Component]
- Implemented Navigation component for seamless navigation between main and history pages
- Added two navigation types: 'toHistory' (View History link) and 'toMain' (Back to Creature link)
- Utilized Next.js Link component for smooth client-side transitions without page reloads
- Styled with pastel colors (lavender for history link, mint for back link)
- Included hover effects and focus indicators for accessibility
- Completed Task 15 from implementation plan

### [2025-11-21 16:00] SafetyBar Accessibility Enhancement
- Enhanced SafetyBar component with comprehensive ARIA attributes for screen reader support
- Added progressbar role with aria-valuenow, aria-valuemin, and aria-valuemax attributes
- Implemented aria-live region for dynamic score updates
- Added aria-labelledby to connect progress bar with descriptive label
- Improved semantic HTML structure for better accessibility compliance
- Requirement 7.5: Enhanced keyboard accessibility and screen reader support

### [2025-11-21 16:15] EmotionInput Validation Enhancement
- Added `showEmptyError` prop to EmotionInput component for inline validation feedback
- Integrated validation error display in main page to show "Share a feeling to continue" message when users attempt empty submissions
- Enhanced user experience by providing immediate feedback for invalid input attempts
- Requirement 1.4: Improved empty input validation with visual feedback

### [2025-11-21 16:30] EmotionInput Validation Test Coverage
- Added comprehensive unit tests for empty input validation feature
- Tests verify validation error display behavior with showEmptyError prop
- Added tests for whitespace-only input validation
- Verified ARIA attributes (role="alert", aria-live="assertive") for accessibility
- Ensured validation error only appears when appropriate conditions are met
- Completed test coverage for Requirement 1.4: Empty input validation

### [2025-11-21 16:45] Creature Animation Polish
- Enhanced Creature component CSS transitions for smoother visual effects
- Added box-shadow and background transitions to creature state changes
- Improved animation smoothness by expanding transition properties
- Requirements 8.2, 8.3: Polished smooth transitions for all creature state changes

### [2025-11-21 17:00] ActionButtons Touch-Friendly Enhancement
- Added explicit min-height: 48px to ActionButtons for touch-friendly sizing
- Ensures buttons meet accessibility standards for mobile touch targets
- Requirement 7.5: Enhanced touch accessibility for mobile devices

### [2025-11-21 17:15] LogHistory Test Assertions Fix
- Fixed ARIA label assertions in LogHistory property-based tests to match actual implementation
- Updated test expectations from 'expressed'/'suppressed' to 'Expressed emotion'/'Suppressed emotion'
- Ensures test accuracy and alignment with component accessibility features

### [2025-12-01 14:30] Version 2 Foundation - Extended Type System & Utilities
- Extended type definitions with CreatureCustomization, PastelColor, QuickEmotion types
- Updated EmotionLog interface with textColor and quickEmotion fields
- Updated AppState interface with customization and microSentenceIndex
- Implemented colorMapping utility with hex/glow mappings and color transformation functions (dimming/brightening)
- Implemented microSentences utility with 10 validation messages and cycling logic
- Extended storageService with saveCustomization, loadCustomization, saveMicroSentenceIndex, loadMicroSentenceIndex methods
- Added migration logic for existing logs without new fields (defaults textColor to white)
- Extended EmotionContext with customization state, micro-sentence tracking, deleteLog method, and getNextMicroSentence
- Comprehensive test coverage for all new utilities and context methods
- Completed Tasks 1-6 from emochild-v2 implementation plan
- Requirements: 2.6, 3.2, 4.1, 4.3, 5.1, 5.2, 5.3, 6.4, 6.5, 7.3, 7.5, 8.1, 8.3, 8.4

### [2025-12-01 15:00] ColorPicker Component Implementation
- Implemented ColorPicker component with 8 pastel color swatches (mint, blue, lavender, peach, pink, yellow, red, orange)
- Added optional white color support for text color selection via includeWhite prop
- Implemented keyboard navigation with Arrow keys for accessibility
- Added visual selection indicators with checkmark for selected color
- Implemented radiogroup ARIA pattern with proper roles and labels
- Styled with CSS modules matching dark pastel theme
- Comprehensive unit tests covering color selection, keyboard navigation, and accessibility
- Completed Task 7 from emochild-v2 implementation plan
- Requirements: 2.4, 4.1, 4.2

### [2025-12-01 16:00] LandingHero Component Implementation
- Implemented LandingHero component as welcoming entry point for the application
- Displays app name "EmoChild: Your Inner Child in Your Pocket" with prominent heading
- Shows explanation text with soft pastel glow effect using mint color text-shadow
- Renders "Start" button with mint accent color and glow effect
- Includes hover, focus, and active states for interactive feedback
- Responsive design with breakpoints for tablets (768px), mobile (600px), and small mobile (400px)
- Accessibility features including ARIA labels, keyboard focus indicators, and reduced motion support
- High contrast mode support for improved accessibility
- Completed Task 8 from emochild-v2 implementation plan
- Requirements: 1.1, 1.2, 1.3, 1.5

### [2025-12-01 17:00] SetupForm Component Implementation
- Implemented SetupForm component for creature customization during initial setup
- Name input field with 50 character limit and real-time character counter
- Integrated ColorPicker component for selecting creature color from 8 pastel options
- Real-time preview blob that updates immediately when color is selected
- Optional bow toggle checkbox for adding dark pink bow accessory to creature
- Preview blob displays selected color with glow effect and shows bow when enabled
- Form validation ensures name is not empty before enabling Continue button
- Responsive design adapts to mobile screens with adjusted padding and sizing
- Accessibility features including proper labels, ARIA attributes, and keyboard navigation
- Completed Task 9 from emochild-v2 implementation plan
- Requirements: 2.2, 2.3, 2.4, 2.5, 2.6

### [2025-12-01 18:00] QuickEmotions Component Implementation
- Implemented QuickEmotions component with 10 quick emotion buttons for faster emotion logging
- Displays buttons for stressed, anxious, calm, excited, sad, angry, confused, grateful, curious, and scared
- Each button styled with appropriate pastel color mapping (e.g., calm=mint, anxious=orange, grateful=pink)
- Grid layout with 5 columns on desktop, responsive to 3 columns on tablets and 2 columns on mobile
- Comprehensive keyboard navigation with Arrow keys for accessibility
- ARIA labels and radiogroup pattern for screen reader support
- Hover, focus, and active states with smooth transitions and visual feedback
- High contrast mode support and reduced motion preferences respected
- Completed Task 10 from emochild-v2 implementation plan
- Requirements: 3.1, 3.2

### [2025-12-01 19:00] MicroSentence Component Implementation
- Implemented MicroSentence component for displaying encouraging validation messages when emotions are expressed
- Displays sentence with fade-in animation that appears smoothly from above
- Auto-dismisses after 2 seconds with fade-out animation
- Includes manual dismiss button (×) for user control
- Applies soft pastel glow effect using multiple box-shadows with mint, blue, and lavender colors
- Positioned centrally with responsive max-width for mobile compatibility
- Accessibility features including ARIA label for dismiss button and keyboard focus indicators
- CSS animation keyframes for smooth fadeInOut transition (0% → 10% → 90% → 100%)
- Completed Task 11 from emochild-v2 implementation plan
- Requirements: 5.1, 5.5

### [2025-12-02 14:00] EmotionInput Component Enhancement
- Enhanced EmotionInput component with text color selection and quick emotion prefilling capabilities
- Added initialText prop to support prefilling input from quick emotion buttons (Requirement 3.3)
- Integrated ColorPicker component for text color selection with includeWhite option (Requirement 4.2)
- Added textColor prop to display selected color in input field immediately
- Added onTextColorChange callback to notify parent component of color changes (Requirement 4.3)
- Implemented useEffect hook to prefill input when initialText prop changes
- Text color is applied inline to textarea using CSS color property
- Maintains character counter functionality with prefilled text (Requirement 3.4)
- Completed Task 12 from emochild-v2 implementation plan
- Requirements: 3.3, 3.4, 4.2, 4.3

### [2025-12-02 15:00] Creature Component Customization Enhancement
- Enhanced Creature component to accept CreatureCustomization prop for personalized appearance
- Integrated color mapping utilities to apply user-selected pastel colors to creature rendering
- Implemented dark pink bow accessory rendering when hasBow is true in customization
- Applied customization.color to creature background with corresponding glow effect from COLOR_GLOW_MAP
- Maintained color consistency through brightness and size state changes
- Updated component interface to require both state and customization props
- Creature now displays in one of 8 pastel colors (mint, blue, lavender, peach, pink, yellow, red, orange)
- Bow accessory positioned on creature's head using CSS with dark pink color (#C11C84)
- Completed Task 13 from emochild-v2 implementation plan
- Requirements: 6.1, 6.2, 6.3, 6.4, 6.5

### [2025-12-02 16:00] LogHistory Component Enhancement
- Enhanced LogHistory component with delete functionality and colored text display
- Added onDelete prop to handle log deletion with confirmation workflow
- Implemented delete button for each log entry with confirmation dialog
- Confirmation dialog displays "This action cannot be undone" message with Confirm/Cancel buttons
- Integrated COLOR_HEX_MAP to render emotion text in saved textColor from logs
- Added visual emoji indicators (🌱 for expressed, 🌑 for suppressed) with ARIA labels
- Implemented pastel dividers between log entries for better visual separation
- Delete functionality updates both UI and localStorage through parent context
- Maintains accessibility with proper ARIA roles (alertdialog) and labels
- Completed Task 14 from emochild-v2 implementation plan
- Requirements: 7.1, 7.2, 7.3, 7.4

### [2025-12-02 17:00] Creature Bow Accessory Styling Enhancement
- Redesigned bow accessory CSS to more closely resemble 🎀 emoji with ribbon loops
- Repositioned bow to right side of creature's head (15% from top, 15% from right) - appears on user's left when viewing
- Implemented three-part bow structure: center knot, left loop, and right loop
- Center knot uses dark pink (#C11C84) with subtle box-shadow for depth
- Left and right loops use slightly lighter pink (#D63A9D) with inset shadows for 3D effect
- Loops use elliptical border-radius for authentic ribbon appearance
- Improved visual hierarchy with z-index layering (knot on top, loops behind)
- Enhanced bow positioning and sizing for better proportion relative to creature
- Requirement 6.2: Improved bow accessory visual design and realism

### [2025-12-02 17:30] Creature Bow Position Correction
- Fixed bow positioning from left to right side of creature's head
- Bow now correctly positioned at right: 15% (appears on user's left side when viewing)
- Updated CSS comment to clarify positioning relative to user's perspective
- Requirement 6.2: Corrected bow accessory placement

### [2025-12-02 18:00] Navigation Component Route Fix
- Fixed Navigation component "Back to Creature" link to point to /creature instead of / (root)
- Ensures proper navigation flow from history page back to main creature screen
- Aligns with updated routing structure where landing page is at root and creature screen is at /creature
- Requirement 10.3: Maintains smooth client-side transitions between pages

### [2025-12-02 18:30] MicroSentence Accessibility Enhancement
- Enhanced MicroSentence component with comprehensive ARIA attributes for screen reader support
- Added role="status" to sentence container for proper semantic meaning
- Implemented aria-live="polite" for dynamic content announcements without interrupting user
- Added aria-atomic="true" to ensure entire message is read as a single unit
- Improved aria-label on dismiss button from "Dismiss message" to "Dismiss encouraging message" for better context
- Requirement 5.5: Enhanced accessibility for validation message display

### [2025-12-02 19:00] Migration Support for Existing Users
- Implemented comprehensive migration logic in storageService.loadLogs() for backward compatibility
- Existing logs without textColor field are automatically migrated to default 'white' color
- Existing logs without quickEmotion field remain valid (optional field)
- Route guard in /creature page redirects users without customization to /setup flow
- Preserves all existing logs and creature state during migration
- No data loss - all historical emotion logs are maintained with sensible defaults
- Comprehensive test coverage for migration scenarios including old log formats
- Requirements: 8.3, 8.4 - Seamless upgrade path for existing users

### [2025-12-02 19:30] Creature Component Performance Optimization
- Enhanced Creature component CSS with GPU-accelerated rendering optimizations
- Added will-change property for transform and filter to enable hardware acceleration
- Implemented backface-visibility: hidden for smoother rendering performance
- Added -webkit-font-smoothing: antialiased for improved visual quality
- Optimized CSS transitions to use GPU-accelerated properties (filter, transform, box-shadow, background)
- Improves animation smoothness and reduces CPU load during creature state transitions
- Requirements 8.2, 8.3: Enhanced smooth transitions with better performance

### [2025-12-02 20:00] SetupForm Editing Mode Support
- Extended SetupForm component interface to support editing existing creature customization
- Added initialCustomization prop to pre-populate form fields with current creature settings
- Added isEditing prop to distinguish between initial setup and editing modes
- Enables users to modify creature name, color, and bow accessory after initial setup
- Form now supports both creation and update workflows with same component
- Requirement 2.7: Provides way to change creature customization later

### [2025-12-02 20:30] LogHistory CSV Export and Edit Features
- Added CSV export functionality to LogHistory component with "Export to CSV" button
- CSV export includes all log fields: timestamp, date, time, emotion text, action, emoji, text color, and quick emotion
- Implemented UTF-8 BOM (Byte Order Mark) for proper emoji encoding in exported CSV files
- CSV files are properly escaped for special characters (quotes, commas) to ensure data integrity
- Export filename includes timestamp for easy organization (e.g., emochild-logs-1234567890.csv)
- Added edit functionality allowing users to modify emotion log text after creation
- Edit mode displays textarea with current text and Save/Cancel buttons
- Text color is preserved during editing for visual consistency
- Edit feature maintains character limit validation and updates localStorage immediately
- Enhanced user control over emotion log history with both export and edit capabilities
