export interface QuizItem {
  id: string;
  question: string;
  answer: string;
  explanation: string;
  type: 'Algebra' | 'Probability' | 'Angles' | 'Integers' | 'Data' | 'English' | 'Science' | 'History';
}

export const subjectQuizQuestions: QuizItem[] = [
  // Angles & Geometry
  {
    id: 'ang-1',
    question: 'Find the value of x if an angle of x° and an angle of 115° lie adjacent to each other on a straight line.',
    answer: 'x = 65°',
    explanation: 'Angles on a straight line are supplementary and add up to 180°. Therefore, x = 180 - 115 = 65°.',
    type: 'Angles'
  },
  {
    id: 'ang-2',
    question: 'Find the value of y if three adjacent angles around a point are 140°, 95°, and y°.',
    answer: 'y = 125°',
    explanation: 'Angles around a single point always add up to 360°. So, y = 360 - 140 - 95 = 125°.',
    type: 'Angles'
  },
  {
    id: 'ang-3',
    question: 'In a pair of parallel lines cut by a transversal, if one alternate angle is 72°, what is the size of the other alternate angle?',
    answer: '72°',
    explanation: 'Alternate angles are equal in size (resembling a Z-shape in parallel line relationships).',
    type: 'Angles'
  },
  {
    id: 'ang-4',
    question: 'In parallel lines, if a pair of co-interior angles includes one angle of 110°, what is the size of the other angle?',
    answer: '70°',
    explanation: 'Co-interior angles are supplementary, meaning they add up to 180°. 180 - 110 = 70°.',
    type: 'Angles'
  },
  {
    id: 'ang-5',
    question: 'What name is given to two angles that add up to exactly 90°?',
    answer: 'Complementary Angles',
    explanation: 'Complementary angles sum to 90°, whereas supplementary angles sum to 180°.',
    type: 'Angles'
  },

  // Integers
  {
    id: 'int-1',
    question: 'Evaluate: -8 + (-15)',
    answer: '-23',
    explanation: 'Adding a negative is the same as subtracting: -8 - 15 = -23.',
    type: 'Integers'
  },
  {
    id: 'int-2',
    question: 'Evaluate: -42 ÷ (-6)',
    answer: '7',
    explanation: 'Dividing a negative number by another negative number yields a positive product: +7.',
    type: 'Integers'
  },
  {
    id: 'int-3',
    question: 'According to BODMAS / Order of Operations, calculate: 3 + 4 × (-5)',
    answer: '-17',
    explanation: 'Multiplication is performed before addition: 4 × (-5) = -20. Then, 3 + (-20) = -17.',
    type: 'Integers'
  },
  {
    id: 'int-4',
    question: 'Express the number 18 as a product of its prime factors in index form.',
    answer: '2 × 3²',
    explanation: '18 splits into 2 × 9, which is 2 × 3 × 3. Expressed as prime factors in index form, this is 2 × 3².',
    type: 'Integers'
  },
  {
    id: 'int-5',
    question: 'Is -15 greater or less than -25?',
    answer: 'Greater than',
    explanation: 'On the number line, -15 is further to the right than -25, so it is a higher value.',
    type: 'Integers'
  },

  // Data & Stats
  {
    id: 'dat-1',
    question: 'Find the Range of this student dataset: 5, 8, 12, 15, 20.',
    answer: '15',
    explanation: 'Range is the highest score minus the lowest score: 20 - 5 = 15.',
    type: 'Data'
  },
  {
    id: 'dat-2',
    question: 'Find the Median of the following data cards: 4, 12, 7, 9, 3.',
    answer: '7',
    explanation: 'First, arrange the scores in ascending order: 3, 4, 7, 9, 12. The middle term is 7.',
    type: 'Data'
  },
  {
    id: 'dat-3',
    question: 'Categorize the variable: "The eye colors of students in a class" (e.g., Categorical Nominal, Categorical Ordinal).',
    answer: 'Categorical Nominal',
    explanation: 'Eye color uses categories named with words (categorical) and has no logical inherent ranking (nominal).',
    type: 'Data'
  },
  {
    id: 'dat-4',
    question: 'Which type of chart is drawn without gaps between the vertical bars to show ranges of numerical continuous or grouped data?',
    answer: 'Histogram',
    explanation: 'Histograms have no gaps between columns to represent a continuous range of data values.',
    type: 'Data'
  },

  // English
  {
    id: 'eng-1',
    question: 'In Ness\'s fantasy-realism novel "A Monster Calls", what does the Monster represent?',
    answer: 'Conor\'s bottled-up guilt, grief, and fear of letting his mother go.',
    explanation: 'The wild, ancient yew-tree monster appears as Conor\'s internal shadow, acting out his intense emotional struggle.',
    type: 'English'
  },
  {
    id: 'eng-2',
    question: 'Identify the language technique: "The ancient tree rose like a dark giant against the horizon."',
    answer: 'Simile',
    explanation: 'Comparing two unlike things using "like" or "as" constitutes a simile.',
    type: 'English'
  },
  {
    id: 'eng-3',
    question: 'In PEEL / PETAL paragraphs, what is the role of the final "Link" element?',
    answer: 'To tie your evidence and analytical arguments directly back to the main thesis / essay question.',
    explanation: 'The Link sentence loops back to address the core focus of the prompt, locking in your paragraph argument.',
    type: 'English'
  },
  {
    id: 'eng-4',
    question: 'What occurs during the third story told by the Monster to Conor?',
    answer: 'Conor physically attacks Harry (the bully) in the school canteen, making himself visible.',
    explanation: 'Conor acts out the Monster\'s tale of the invisible man who demanded to be seen, resulting in Harry\'s hospitalization.',
    type: 'English'
  },

  // Science
  {
    id: 'sci-1',
    question: 'For a plant growth study under different clear-colored plastic wraps, what is the clear-colored wrap considered?',
    answer: 'The Independent Variable',
    explanation: 'The independent variable is the condition intentionally varied by the scientist (color wrap). Plant heights are the dependent variable.',
    type: 'Science'
  },
  {
    id: 'sci-2',
    question: 'What is the main astronomical difference between the Geocentric and Heliocentric models?',
    answer: 'Geocentric places Earth at the center, while Heliocentric places the Sun at the center.',
    explanation: 'Geocentric (Ptolemy) puts Earth at the core; Heliocentric (Copernicus/Galileo) properly shows planets orbiting the Sun.',
    type: 'Science'
  },
  {
    id: 'sci-3',
    question: 'If a box suffers a 12N force pulling it left, and an 8N force pulling it right, calculate the net force.',
    answer: '4N to the left',
    explanation: 'Opposite forces subtract: 12N - 8N = 4N. The direction matches the larger force (left).',
    type: 'Science'
  },
  {
    id: 'sci-4',
    question: 'What causes the changing seasons (Winter, Spring, Summer, Autumn) on Earth?',
    answer: 'The 23.5-degree tilt of the Earth\'s axis relative to its orbital plane as it revolves around the Sun.',
    explanation: 'During orbit, different hemispheres point closer to or further away from the Sun, causing varying seasonal light angles.',
    type: 'Science'
  },

  // History
  {
    id: 'his-1',
    question: 'Identify if a piece of Roman coin excavated from Pompeii is a Primary or Secondary source.',
    answer: 'Primary Source',
    explanation: 'A primary source is any physical or written artifact created during the historical period of study.',
    type: 'History'
  },
  {
    id: 'his-2',
    question: 'What crucial natural event did Ancient Egypt rely on to cultivate crops along the arid banks of the Nile?',
    answer: 'The annual, predictable flooding of the Nile River.',
    explanation: 'The floods deposited highly fertile black silt (Kemet) on surrounding fields, allowing farming to flourish.',
    type: 'History'
  },
  {
    id: 'his-3',
    question: 'What does the chronological abbreviation "BCE" stand for?',
    answer: 'Before Common Era',
    explanation: 'BCE corresponds directly to BC (Before Christ) but is used in modern secular historical studies.',
    type: 'History'
  },
  {
    id: 'his-4',
    question: 'What is the primary role of an Archaeologist compared to a conventional historian?',
    answer: 'Archaeologists retrieve and study physical remains / ruins, whereas historians analyze written records.',
    explanation: 'Archaeologists dig up physical artifacts, ruins, remains, and sites to understand civilisations.',
    type: 'History'
  }
];
