export const Difficulty = Object.freeze({
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
});

export type DifficultyType = keyof typeof Difficulty;
