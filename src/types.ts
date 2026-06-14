export interface Flashcard {
  id: string;
  category: 'Algebra' | 'Probability' | 'Angles' | 'Integers' | 'Data' | 'English' | 'Science' | 'History';
  question: string;
  answer: string;
}

export type TabState = 'algebra' | 'probability' | 'mistakes' | 'tips' | 'flashcards' | 'practice' | 'quiz' | 'english' | 'angles' | 'integers' | 'data' | 'science' | 'history' | 'boosters';
