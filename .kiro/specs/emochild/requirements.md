# Requirements Document

## Introduction

EmoChild is a web-based emotional wellness companion that reimagines the classic Tamagotchi (1996) for modern emotional health needs. The application addresses the widespread issue of emotional suppression by gamifying emotional expression through a digital creature that responds to the user's emotional processing habits. Users log micro-emotions (brief emotional check-ins), choose whether they expressed or suppressed that emotion, and watch their creature respond in real-time with visual feedback. The creature grows brighter and larger when emotions are expressed, and dims when suppressed, creating a gentle, non-judgmental mirror of the user's emotional patterns.

## Glossary

- **EmoChild**: The digital creature companion that responds to user's emotional processing
- **Micro-Emotion Log**: A brief text entry (maximum 100 characters) describing an emotion or feeling
- **Express Action**: User choice indicating they acknowledged and processed an emotion
- **Suppress Action**: User choice indicating they avoided or pushed down an emotion
- **Inner Safety Bar**: A visual indicator showing cumulative emotional expression progress
- **Creature State**: The current visual appearance and animation state of the EmoChild
- **Local Storage**: Browser-based persistent storage for user data without backend server
- **Dark Pastel Theme**: Visual design combining deep charcoal backgrounds with soft pastel accents

## Problem Definition

Modern society often encourages emotional suppression, leading to disconnection from one's inner emotional life and potential mental health challenges. Many adults struggle to process emotions healthily, having learned to suppress feelings rather than express them. This pattern can lead to emotional dysregulation, anxiety, and a disconnect from one's "inner child" - the authentic emotional self. Traditional emotional wellness tools can feel clinical or overwhelming, creating barriers to consistent emotional check-ins.

## High-Level Goals

1. Create a playful, non-judgmental space for users to acknowledge their emotions
2. Encourage consistent emotional expression through gentle gamification
3. Provide immediate visual feedback that reinforces healthy emotional processing
4. Build a privacy-first tool that stores emotional data locally without requiring accounts or servers
5. Design an aesthetically calming experience that feels safe for vulnerable emotional work
6. Make emotional check-ins quick and frictionless (under 30 seconds per log)
7. Resurrect the beloved Tamagotchi concept with modern purpose and technology

## Requirements

### Requirement 1

**User Story:** As a user, I want to write a micro-emotion log, so that I can quickly capture my emotional state without lengthy journaling.

#### Acceptance Criteria

1. WHEN a user accesses the emotion log input THEN the system SHALL display a text input field with a 100-character maximum limit
2. WHEN a user types in the emotion log input THEN the system SHALL show a real-time character counter displaying remaining characters
3. WHEN a user attempts to exceed 100 characters THEN the system SHALL prevent additional character input and maintain the current text
4. WHEN a user submits an empty emotion log THEN the system SHALL prevent submission and display a gentle prompt to enter text
5. WHEN a user completes typing THEN the system SHALL maintain focus on the input field for seamless interaction

### Requirement 2

**User Story:** As a user, I want to choose between "expressed" or "suppressed" for each emotion log, so that I can honestly track my emotional processing patterns.

#### Acceptance Criteria

1. WHEN a user has entered text in the emotion log THEN the system SHALL display two clearly labeled action buttons for "expressed" and "suppressed"
2. WHEN a user clicks the "expressed" button THEN the system SHALL record the emotion log with an "expressed" status and timestamp
3. WHEN a user clicks the "suppressed" button THEN the system SHALL record the emotion log with a "suppressed" status and timestamp
4. WHEN a user selects either action THEN the system SHALL clear the input field and prepare for the next entry
5. WHEN no text is entered THEN the system SHALL disable both action buttons to prevent empty submissions

### Requirement 3

**User Story:** As a user, I want to see my EmoChild creature react instantly based on my emotional processing, so that I receive immediate positive reinforcement for expressing emotions.

#### Acceptance Criteria

1. WHEN a user logs an "expressed" emotion THEN the EmoChild SHALL increase its brightness level and display a growth animation
2. WHEN a user logs a "suppressed" emotion THEN the EmoChild SHALL decrease its brightness level and display a curling animation
3. WHEN the creature state changes THEN the system SHALL complete the visual transition within 1 second for immediate feedback
4. WHEN the creature reaches maximum brightness THEN the system SHALL display the creature at full glow with celebratory animation
5. WHEN the creature reaches minimum brightness THEN the system SHALL display the creature in a dimmed, curled state with gentle pulsing

### Requirement 4

**User Story:** As a user, I want to see a simple "inner safety bar" grow when I express emotions, so that I can visualize my progress in building emotional safety.

#### Acceptance Criteria

1. WHEN a user logs an "expressed" emotion THEN the system SHALL increment the inner safety bar by one unit
2. WHEN a user logs a "suppressed" emotion THEN the system SHALL maintain the current inner safety bar level without decrement
3. WHEN the inner safety bar updates THEN the system SHALL animate the bar growth smoothly over 0.5 seconds
4. WHEN the inner safety bar is displayed THEN the system SHALL show the current count of expressed emotions as a numeric value
5. WHEN the page loads THEN the system SHALL restore the inner safety bar to its previously saved state from local storage

### Requirement 5

**User Story:** As a user, I want my past emotion logs saved locally without needing a backend, so that my private emotional data remains on my device.

#### Acceptance Criteria

1. WHEN a user submits an emotion log THEN the system SHALL persist the log to browser local storage immediately
2. WHEN a user returns to the application THEN the system SHALL load all previous emotion logs from local storage
3. WHEN emotion logs are stored THEN the system SHALL include timestamp, text content, and action type (expressed or suppressed)
4. WHEN local storage operations fail THEN the system SHALL display an error message and maintain current session data
5. WHEN a user clears browser data THEN the system SHALL lose all emotion logs as expected for local-only storage

### Requirement 6

**User Story:** As a user, I want to view my past emotion logs in a simple list, so that I can reflect on my emotional patterns over time.

#### Acceptance Criteria

1. WHEN a user navigates to the log history view THEN the system SHALL display all saved emotion logs in reverse chronological order
2. WHEN displaying each log entry THEN the system SHALL show the timestamp, emotion text, and action type with appropriate visual styling
3. WHEN the log list is empty THEN the system SHALL display an encouraging message to create the first emotion log
4. WHEN the log list contains more than 10 entries THEN the system SHALL implement scrolling to view older entries
5. WHEN a log entry is displayed with "expressed" status THEN the system SHALL use a positive visual indicator (color or icon)

### Requirement 7

**User Story:** As a user, I want the application to use a dark theme with soft pastel accents, so that the interface feels calming and safe for emotional work.

#### Acceptance Criteria

1. WHEN the application loads THEN the system SHALL apply a deep charcoal background color (approximately #1a1a1a to #2d2d2d)
2. WHEN displaying interactive elements THEN the system SHALL use soft pastel accent colors including mint, lavender, peach, and baby blue
3. WHEN text is displayed THEN the system SHALL use light-colored text with sufficient contrast against the dark background for accessibility
4. WHEN the theme is applied THEN the system SHALL use CSS custom properties for consistent color management across components
5. WHEN buttons or interactive elements receive focus THEN the system SHALL provide subtle pastel-colored focus indicators

### Requirement 8

**User Story:** As a user, I want to see a tiny glowing creature with gentle animations, so that the experience feels magical and emotionally supportive.

#### Acceptance Criteria

1. WHEN the creature is displayed THEN the system SHALL render a small animated character with a soft glow effect
2. WHEN the creature is in a neutral state THEN the system SHALL display gentle idle animations such as breathing or floating
3. WHEN the creature animates THEN the system SHALL use smooth transitions with easing functions for natural movement
4. WHEN the creature glows THEN the system SHALL apply a soft blur or shadow effect in pastel colors
5. WHEN multiple animations occur THEN the system SHALL queue them smoothly without jarring transitions

### Requirement 9

**User Story:** As a user, I want the application to work entirely in my browser without requiring an account, so that I can start using it immediately with complete privacy.

#### Acceptance Criteria

1. WHEN a user first visits the application THEN the system SHALL be fully functional without requiring login or registration
2. WHEN the application initializes THEN the system SHALL not make any network requests to external servers for user data
3. WHEN a user interacts with features THEN the system SHALL operate entirely using client-side JavaScript and local storage
4. WHEN the application is accessed THEN the system SHALL load within 3 seconds on standard broadband connections
5. WHEN a user closes and reopens the browser THEN the system SHALL restore all creature state and emotion logs from local storage

### Requirement 10

**User Story:** As a user, I want the emotion logging process to be quick and frictionless, so that I can capture feelings in the moment without disruption.

#### Acceptance Criteria

1. WHEN a user opens the application THEN the system SHALL display the emotion log input as the primary, immediately accessible interface element
2. WHEN a user completes an emotion log THEN the system SHALL process the submission and reset the interface within 1 second
3. WHEN a user navigates between screens THEN the system SHALL transition smoothly without page reloads or loading states
4. WHEN the input field is displayed THEN the system SHALL automatically focus the cursor for immediate typing
5. WHEN a user submits a log THEN the system SHALL provide haptic or visual feedback confirming the action was recorded
