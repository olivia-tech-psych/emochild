import { describe, it, expect } from 'vitest';
import { getNextMicroSentence, getMicroSentenceByIndex } from './microSentences';

describe('microSentences', () => {
  describe('getNextMicroSentence', () => {
    it('should return the first sentence when index is 0', () => {
      const result = getNextMicroSentence(0);
      expect(result.sentence).toBe("Your vulnerability is rewarded.");
      expect(result.nextIndex).toBe(1);
    });

    it('should cycle through sentences sequentially', () => {
      let index = 0;
      const sentences: string[] = [];
      
      for (let i = 0; i < 10; i++) {
        const result = getNextMicroSentence(index);
        sentences.push(result.sentence);
        index = result.nextIndex;
      }
      
      expect(sentences).toHaveLength(10);
      expect(sentences[0]).toBe("Your vulnerability is rewarded.");
      expect(sentences[9]).toBe("You chose expression, and I grew stronger.");
    });

    it('should loop back to index 0 after reaching the end', () => {
      const result = getNextMicroSentence(9);
      expect(result.sentence).toBe("You chose expression, and I grew stronger.");
      expect(result.nextIndex).toBe(0);
    });
  });

  describe('getMicroSentenceByIndex', () => {
    it('should return the correct sentence for a given index', () => {
      expect(getMicroSentenceByIndex(0)).toBe("Your vulnerability is rewarded.");
      expect(getMicroSentenceByIndex(5)).toBe("You were gentle with your truth today.");
      expect(getMicroSentenceByIndex(9)).toBe("You chose expression, and I grew stronger.");
    });

    it('should wrap around for indices greater than array length', () => {
      expect(getMicroSentenceByIndex(10)).toBe("Your vulnerability is rewarded.");
      expect(getMicroSentenceByIndex(15)).toBe("You were gentle with your truth today.");
    });
  });
});
