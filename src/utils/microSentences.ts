/**
 * Micro-sentences are encouraging validation messages displayed when users express emotions.
 * They cycle through sequentially to provide varied positive reinforcement.
 */

const MICRO_SENTENCES = [
  "Your vulnerability is rewarded.",
  "When you feel, I grow.",
  "I saw that feeling.",
  "Your emotions are not a burden.",
  "Every feeling you name becomes a star.",
  "You were gentle with your truth today.",
  "Thank you for letting that feeling breathe.",
  "Your honesty makes my little light brighter.",
  "That emotion was safe with you today.",
  "You chose expression, and I grew stronger."
];

/**
 * Gets the next micro-sentence in the sequence and returns the updated index.
 * 
 * @param currentIndex - The current position in the sentence array (0-9)
 * @returns An object containing the sentence to display and the next index
 */
export function getNextMicroSentence(currentIndex: number): {
  sentence: string;
  nextIndex: number;
} {
  const sentence = MICRO_SENTENCES[currentIndex];
  const nextIndex = (currentIndex + 1) % MICRO_SENTENCES.length;
  
  return { sentence, nextIndex };
}

/**
 * Gets a micro-sentence by its index, with automatic wrapping for out-of-range values.
 * 
 * @param index - The index of the sentence to retrieve
 * @returns The micro-sentence at the specified index
 */
export function getMicroSentenceByIndex(index: number): string {
  return MICRO_SENTENCES[index % MICRO_SENTENCES.length];
}
