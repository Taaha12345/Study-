export const algebraProblems = [
  {
    q: "Combine like terms: 5x + 3y - 2x + 4y",
    a: "3x + 7y",
    exp: "Group the x terms (5x - 2x = 3x) and y terms (3y + 4y = 7y). You cannot combine different letters."
  },
  {
    q: 'Translate to algebra: "Four more than double a number"',
    a: "2n + 4",
    exp: '"Double a number" is written as 2n, and "four more than" means adding 4.'
  },
  {
    q: "Solve the equation: 3a - 5 = 16",
    a: "a = 7",
    exp: "First, add 5 to both sides (3a = 21). Then divide both sides by 3 to get a = 7."
  },
  {
    q: "Simplify: 4a² × 3a³",
    a: "12a⁵",
    exp: "Multiply the coefficients (4 × 3 = 12) and add the indices (2 + 3 = 5)."
  },
  {
    q: "Solve the equation: x ÷ 2 + 7 = 11",
    a: "x = 8",
    exp: "Subtract 7 from both sides to get x ÷ 2 = 4. Then multiply by 2 to get x = 8."
  }
];

export const probabilityScenarios = [
  {
    title: "Scenario 1: Marbles in a Bag",
    desc: "A bag contains 4 Red, 5 Blue, and 3 Green marbles.",
    q: "What is the probability of picking a Blue marble, P(Blue)?",
    a: "5/12",
    formula: "P = Favourable (Blue) / Total = 5 / (4 + 5 + 3) = 5/12"
  },
  {
    title: "Scenario 2: The 8-Sided Spinner",
    desc: "A spinner is divided into 8 equal sectors colored: 3 Yellow, 2 Purple, 1 Orange, 2 Pink.",
    q: "What is the probability of landing on Yellow OR Pink, P(Yellow OR Pink)?",
    a: "5/8",
    formula: "P = Favourable (Yellow + Pink) / Total = (3 + 2) / 8 = 5/8"
  },
  {
    title: "Scenario 3: Standard Deck of Cards",
    desc: "A standard deck contains 52 cards (26 red, 26 black).",
    q: "What is the probability of drawing a red card?",
    a: "1/2",
    formula: "P = Favourable (Red) / Total = 26 / 52. Always simplify fractions: 1/2."
  }
];

export const interactiveAlgebra = [
  {
    q: "Vocabulary: What is the 'coefficient' in the term 7x²?",
    options: ["x", "2", "7", "x²"],
    answer: 2,
    exp: "The coefficient is the number multiplied by the variable. Here, 7 is the coefficient."
  },
  {
    q: "Combine like terms: 4a + 5b - 2a + 3b",
    options: ["2a + 8b", "7a + 2b", "10ab", "2a + 2b"],
    answer: 0,
    exp: "Group the a's (4a - 2a = 2a) and b's (5b + 3b = 8b)."
  },
  {
    q: "Multiply terms: 3x × 4x²",
    options: ["7x³", "12x²", "12x³", "7x²"],
    answer: 2,
    exp: "Multiply the numbers (3 × 4 = 12) and add the indices of x (x¹ × x² = x³)."
  },
  {
    q: "Solve the equation: 4y - 7 = 13",
    options: ["y = 4", "y = 5", "y = 20", "y = 1.5"],
    answer: 1,
    exp: "Add 7 to both sides (4y = 20), then divide by 4 (y = 5)."
  },
  {
    q: "Translate to algebra: 'Three less than twice a number'",
    options: ["3 - 2n", "2n - 3", "2(n - 3)", "3n - 2"],
    answer: 1,
    exp: "Twice a number is 2n. 'Three less than' means subtract 3 from it, giving 2n - 3."
  },
  {
    q: "Expand the brackets: 5(2x - 3)",
    options: ["10x - 3", "10x - 15", "7x - 8", "10x + 15"],
    answer: 1,
    exp: "Multiply the outside number by everything inside: 5 × 2x = 10x, and 5 × -3 = -15."
  }
];
