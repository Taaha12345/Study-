import { Flashcard } from '../types';

export const flashcards: Flashcard[] = [
  // Algebra
  { id: '1', category: 'Algebra', question: 'What is a Variable?', answer: 'A letter (e.g., x, y, a, n) that represents a value.' },
  { id: '2', category: 'Algebra', question: 'What is a Coefficient?', answer: 'The number next to a letter (e.g., the 3 in 3x).' },
  { id: '3', category: 'Algebra', question: 'What is a Constant?', answer: 'A number alone with no letter (e.g., 5, -2).' },
  { id: '4', category: 'Algebra', question: 'What are "Like Terms"?', answer: 'Terms with the SAME letter AND the SAME power.' },
  { id: '5', category: 'Algebra', question: 'What is x⁰ ?', answer: '1' },
  { id: '6', category: 'Algebra', question: 'Simplify: 3x + 5x', answer: '8x' },
  { id: '7', category: 'Algebra', question: 'Simplify: x² × x³', answer: 'x⁵ (Multiply terms → add indices)' },
  { id: '8', category: 'Algebra', question: 'Solve: 2x + 3 = 13', answer: 'x = 5  (Subtract 3, then divide by 2)' },
  { id: '9', category: 'Algebra', question: 'Translate: "3 less than a number"', answer: 'n - 3 (Reverse the order when you see "less than")' },
  { id: '10', category: 'Algebra', question: 'What is (x²)³ ?', answer: 'x⁶ (Multiply the indices)' },
  { id: '11', category: 'Algebra', question: 'What is (3x)² ?', answer: '9x² (Square both the number and the letter)' },
  { id: '12', category: 'Algebra', question: 'What does x + x equal?', answer: '2x (Remember: x is the same as 1x)' },
  
  // Probability
  { id: '13', category: 'Probability', question: 'What is the range of probability?', answer: 'From 0 (impossible) to 1 (certain)' },
  { id: '14', category: 'Probability', question: 'What is the basic Probability formula?', answer: 'Number of agreeable outcomes ÷ Total number of outcomes' },
  { id: '15', category: 'Probability', question: 'What is Complementary Probability? P(not happening) = ?', answer: '1 - P(happening)' },
  { id: '16', category: 'Probability', question: 'What are Mutually Exclusive events?', answer: 'Events that cannot happen at the same time (e.g. flipping Heads or Tails)' },
  { id: '17', category: 'Probability', question: 'What are Independent events?', answer: 'When one event does not affect the other (e.g. rolling a dice and flipping a coin)' },
  { id: '18', category: 'Probability', question: 'What do you do with probabilities when you see "OR"?', answer: 'ADD them' },
  { id: '19', category: 'Probability', question: 'What do you do with probabilities when you see "AND"?', answer: 'MULTIPLY them' },
  { id: '20', category: 'Probability', question: 'P(rolling a 3 on a 6-sided dice) = ?', answer: '1/6' },
  { id: '21', category: 'Probability', question: 'Formula for Expected Frequency?', answer: 'Probability × Number of trials' },

  // Angles
  { id: '22', category: 'Angles', question: 'What are "Supplementary Angles"?', answer: 'Two angles that add up to 180° (like adjacent angles on a straight line).' },
  { id: '23', category: 'Angles', question: 'What are "Complementary Angles"?', answer: 'Two angles that add up to 90°.' },
  { id: '24', category: 'Angles', question: 'What is the rule for Vertically Opposite Angles?', answer: 'They are equal (formed when straight lines intersect).' },
  { id: '25', category: 'Angles', question: 'What do Angles at a Point always add up to?', answer: 'Exactly 360° (a full revolution).' },
  { id: '26', category: 'Angles', question: 'Which shape is associated with Corresponding Angles?', answer: 'The F-shape (Corresponding angles cut by a transversal are equal).' },
  { id: '27', category: 'Angles', question: 'Which shape is associated with Alternate Angles?', answer: 'The Z-shape (Alternate angles cut by a transversal are equal).' },
  { id: '28', category: 'Angles', question: 'Which shape is associated with Co-interior Angles?', answer: 'The C or U shape (Co-interior angles cut by a transversal add up to 180°).' },

  // Integers
  { id: '29', category: 'Integers', question: 'What does the order of operations BODMAS stand for?', answer: 'Brackets, Orders, Division/Multiplication, Addition/Subtraction.' },
  { id: '30', category: 'Integers', question: 'What is Negative × Negative?', answer: 'Positive (e.g., -4 × -5 = 20).' },
  { id: '31', category: 'Integers', question: 'What is Positive × Negative?', answer: 'Negative (e.g., 6 × -3 = -18).' },
  { id: '32', category: 'Integers', question: 'What is a Prime Number?', answer: 'A number greater than 1 with exactly two factors: 1 and itself (e.g., 2, 3, 5, 7, 11).' },
  { id: '33', category: 'Integers', question: 'How is a coordinate written in the Cartesian plane?', answer: '(x, y) where x is the horizontal distance, and y is the vertical distance.' },
  { id: '34', category: 'Integers', question: 'What is the absolute value of an integer?', answer: 'Its distance from zero, always positive (e.g., |-7| = 7, |5| = 5).' },

  // Data
  { id: '35', category: 'Data', question: 'What is Nominal Categorical Data?', answer: 'Data grouped by names or labels with no natural order (e.g., eye color, car brands).' },
  { id: '36', category: 'Data', question: 'What is Ordinal Categorical Data?', answer: 'Data grouped by order or ranks (e.g., shoe sizes, customer satisfaction ratings like Poor/Good/Great).' },
  { id: '37', category: 'Data', question: 'What is Discrete Numerical Data?', answer: 'Countable numbers that can only be whole numbers (e.g., number of children, goals scored).' },
  { id: '38', category: 'Data', question: 'What is Continuous Numerical Data?', answer: 'Measurable numbers that can take any value, including decimals (e.g., height, weight, time).' },
  { id: '39', category: 'Data', question: 'How do you find the Range of a dataset?', answer: 'Subtract the lowest value from the highest value (Highest - Lowest).' },
  { id: '40', category: 'Data', question: 'What is the Median?', answer: 'The middle value when data is sorted in ascending order (or average of two middle values).' },

  // English
  { id: '41', category: 'English', question: 'What does the PEEL/PETAL anagram stand for?', answer: 'Point, Evidence, Technique, Analysis, Link.' },
  { id: '42', category: 'English', question: 'What does the Monster represent in A Monster Calls?', answer: 'Conor\'s repressed grief, guilt, and fear of accepting his mother\'s terminal illness.' },
  { id: '43', category: 'English', question: 'What is a Simile?', answer: 'A comparison of two things using "like" or "as" (e.g., "brave as a lion").' },
  { id: '44', category: 'English', question: 'What is Personification?', answer: 'Giving human characteristics to non-human things (e.g., "the night sighed").' },
  { id: '45', category: 'English', question: 'What is Alliteration?', answer: 'The repetition of the same consonant sound at the start of adjacent words.' },

  // Science
  { id: '46', category: 'Science', question: 'What is an Independent Variable?', answer: 'The variable that the experimenter changes on purpose (plotted on the X-axis).' },
  { id: '47', category: 'Science', question: 'What is a Dependent Variable?', answer: 'The variable that is being measured to see how it responds (plotted on the Y-axis).' },
  { id: '48', category: 'Science', question: 'What is the Heliocentric design in astronomy?', answer: 'The solar system model where the Sun is at the center (proven by Copernicus & Galileo).' },
  { id: '49', category: 'Science', question: 'What is the primary cause of Earth\'s seasons?', answer: 'The 23.5-degree tilt of the Earth\'s axis as it orbits the Sun.' },
  { id: '50', category: 'Science', question: 'What determines if forces on an object are balanced?', answer: 'If they are equal in magnitude and opposite in direction (net force = 0).' },
  { id: '51', category: 'Science', question: 'What is Friction?', answer: 'A contact force that always opposes motion between two surfaces.' },

  // History
  { id: '52', category: 'History', question: 'What is a Primary Source?', answer: 'An object or document created during the time period being studied (e.g., papyrus, coins, mummies).' },
  { id: '53', category: 'History', question: 'What is a Secondary Source?', answer: 'A source created after the time under study, analyzing primary inputs (e.g., textbooks, historical biographies).' },
  { id: '54', category: 'History', question: 'Why was the Nile River crucial to Ancient Egypt?', answer: 'It flooded annually to provide rich silt for farming, water, transportation, and building reed paper (papyrus).' },
  { id: '55', category: 'History', question: 'What does "BCE" stand for in chronological dating?', answer: 'Before Common Era (corresponds to BC).' },
  { id: '56', category: 'History', question: 'What is Archaeology?', answer: 'The study of human history and prehistory through the excavation of sites and the analysis of physical artifacts.' }
];
