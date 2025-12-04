# Requirements Document

## Introduction

This specification extends the existing EmoChild application with three major enhancements: a welcoming landing page with onboarding flow, creature customization options (color, name, and accessories), and improved emotion input features (quick emotion buttons, text color selection, and encouraging micro-sentences). These improvements aim to make the app more personal, user-friendly, and emotionally supportive while maintaining the core emotional wellness mission.

## Glossary

- **EmoChild**: The digital creature companion; full application name is "EmoChild: Your Inner Child in Your Pocket"
- **Landing Page**: The initial welcome screen shown on each app visit explaining the concept
- **Setup Flow**: The multi-step onboarding process for customizing the creature
- **Creature Customization**: User-selected creature name, color, and optional bow accessory
- **Quick Emotion**: Pre-defined emotion buttons that prefill the text input for faster logging
- **Text Color**: User-selected color for emotion log text that persists with the log entry
- **Micro-Sentence**: Encouraging validation message displayed when emotions are expressed
- **Micro-Emotion Log**: A brief text entry (maximum 100 characters) describing an emotion or feeling
- **Express Action**: User choice indicating they acknowledged and processed an emotion
- **Suppress Action**: User choice indicating they avoided or pushed down an emotion
- **Local Storage**: Browser-based persistent storage for user data without backend server
- **Dark Pastel Theme**: Visual design combining deep charcoal backgrounds with soft pastel accents

## Problem Definition

The current EmoChild application lacks a clear onboarding experience, making it difficult for new users to understand the app's purpose immediately. Users cannot personalize their creature, reducing emotional connection. The emotion logging process, while functional, could be faster with quick-select options and more encouraging with validation messages. These gaps reduce user engagement and the emotional impact of the experience.

## High-Level Goals

1. Create a welcoming landing page that clearly explains the EmoChild concept on every visit
2. Enable users to personalize their creature with name, color, and accessories
3. Speed up emotion logging with quick emotion buttons while maintaining flexibility
4. Provide visual organization through text color selection for emotion logs
5. Increase emotional validation through encouraging micro-sentences
6. Enhance the history view with better visual organization and delete functionality
7. Maintain complete privacy with local-only storage for all new features

## Requirements

### Requirement 1

**User Story:** As a new user, I want to see a welcoming landing page that explains what EmoChild is, so that I understand the purpose before starting.

#### Acceptance Criteria

1. WHEN a user visits the application THEN the system SHALL display a landing page with the app name "EmoChild: Your Inner Child in Your Pocket"
2. WHEN the landing page is displayed THEN the system SHALL show a brief explanation including "A tiny creature that grows when you express your emotions in healthy ways, a representation of your inner child that resides within you."
3. WHEN the landing page is rendered THEN the system SHALL apply a soft pastel glow effect on a dark mode background
4. WHEN a user returns to the application after any refresh or reopening THEN the system SHALL display the landing page again
5. WHEN the landing page is shown THEN the system SHALL provide a single "Start" button that transitions to the setup flow

### Requirement 2

**User Story:** As a new user, I want to customize my creature's appearance during setup, so that it feels personal and connected to me.

#### Acceptance Criteria

1. WHEN a user clicks the Start button THEN the system SHALL navigate to a setup flow for creature customization
2. WHEN the setup flow displays THEN the system SHALL provide input fields for creature name and color selection
3. WHEN color options are shown THEN the system SHALL offer pastel mint, pastel blue, pastel lavender, pastel peach, blush pink, pastel yellow, pastel red, and pastel orange with pastel orange as the default
4. WHEN a user selects a color THEN the system SHALL update a preview blob to display the chosen color in real-time
5. WHEN the setup flow displays THEN the system SHALL provide an optional toggle to add a dark pink bow accessory (#C11C84) to the creature's head
6. WHEN a user completes the setup THEN the system SHALL save the creature name and color to localStorage as creatureColor and creatureName
7. WHEN a user has completed initial setup THEN the system SHALL provide a way to change the creature color and name later

### Requirement 3

**User Story:** As a user, I want quick emotion buttons to speed up logging common feelings, so that I can capture emotions faster when I'm in the moment.

#### Acceptance Criteria

1. WHEN the emotion log screen displays THEN the system SHALL show optional quick emotion buttons for stressed, anxious, calm, excited, sad, angry, confused, grateful, curious, and scared
2. WHEN a user clicks a quick emotion button THEN the system SHALL prefill the text input with that emotion word
3. WHEN a quick emotion prefills the input THEN the system SHALL keep the text editable so the user can add more context
4. WHEN the text input is prefilled THEN the system SHALL maintain the character counter and validation rules
5. WHEN a user types manually THEN the system SHALL allow emotion logging without requiring quick emotion button selection

### Requirement 4

**User Story:** As a user, I want to choose a text color for my emotion logs, so that I can visually organize my feelings by color.

#### Acceptance Criteria

1. WHEN the emotion log screen displays THEN the system SHALL provide a text color selector with pastel mint, pastel blue, pastel lavender, pastel peach, blush pink, pastel yellow, pastel red, pastel orange, and white as default
2. WHEN a user selects a text color THEN the system SHALL apply that color to the text input field immediately
3. WHEN a user submits an emotion log THEN the system SHALL save the selected text color with the log entry
4. WHEN displaying emotion logs in history THEN the system SHALL render each log in its saved text color
5. WHEN no color is selected THEN the system SHALL use white as the default text color

### Requirement 5

**User Story:** As a user, I want to see encouraging micro-sentences when I express emotions, so that I feel validated and supported in my emotional journey.

#### Acceptance Criteria

1. WHEN a user logs an "expressed" emotion THEN the system SHALL display one micro-sentence from a predefined list of 10 sentences
2. WHEN multiple emotions are expressed THEN the system SHALL cycle through micro-sentences in sequence starting with the first
3. WHEN all micro-sentences have been shown THEN the system SHALL loop back to the first sentence for subsequent emotions
4. WHEN a user logs a "suppressed" emotion THEN the system SHALL not display a micro-sentence
5. WHEN a micro-sentence is displayed THEN the system SHALL show it for at least 2 seconds before allowing it to fade or be dismissed

### Requirement 6

**User Story:** As a user, I want the creature to display in my chosen color and accessories, so that it feels uniquely mine.

#### Acceptance Criteria

1. WHEN the creature is displayed THEN the system SHALL render it in the color selected during setup or changed later by the user
2. WHEN the user has selected a bow accessory THEN the system SHALL display a dark pink bow (#C11C84) on the creature's head
3. WHEN the creature state changes THEN the system SHALL maintain the selected color and accessories
4. WHEN the creature dims due to suppressed emotions THEN the system SHALL darken the selected color appropriately
5. WHEN the creature brightens due to expressed emotions THEN the system SHALL brighten the selected color appropriately

### Requirement 7

**User Story:** As a user, I want an enhanced history view with better organization and delete functionality, so that I can manage my emotional logs effectively.

#### Acceptance Criteria

1. WHEN displaying each log entry THEN the system SHALL show the timestamp, emotion text in its saved color, and emoji representing expressed or suppressed
2. WHEN a user clicks a delete button on a log entry THEN the system SHALL display a confirmation dialog stating "This action cannot be undone"
3. WHEN a user confirms deletion THEN the system SHALL remove the log entry from storage and update the display
4. WHEN displaying log entries THEN the system SHALL use soft pastel accent dividers between entries
5. WHEN a log is deleted THEN the system SHALL update the inner safety bar if the deleted log was an expressed emotion

### Requirement 8

**User Story:** As a user, I want all my customization settings saved locally, so that my personal preferences persist across sessions.

#### Acceptance Criteria

1. WHEN a user completes creature customization THEN the system SHALL save creature name, color, and bow preference to localStorage
2. WHEN a user selects a text color for logging THEN the system SHALL remember that color preference for the next log
3. WHEN emotion logs are stored THEN the system SHALL include text color and quick emotion label if used
4. WHEN the application loads THEN the system SHALL restore all customization settings from localStorage
5. WHEN a user changes creature settings later THEN the system SHALL update localStorage immediately
