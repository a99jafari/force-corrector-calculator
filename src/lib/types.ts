export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ".";
export type Operator = "+" | "*" | "-" | "/";
export type HighPriorityOperator = "*" | "/";
export type LowPriorityOperator = "+" | "-";

export type Key = Digit | Operator;

export const DIGITS: Digit[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
export const OPERATORS: Operator[] = ["+", "*", "-", "/"];
export const DIGITS_AND_OPERATORS: (Digit | Operator)[] = [...DIGITS, ...OPERATORS];
export const CALCULATOR_VALID_INPUT_KEYS: (Digit | Operator | ".")[] = [...DIGITS_AND_OPERATORS, "."]
export const CALCULATOR_KEYS = [...DIGITS_AND_OPERATORS]

export const CALCULATOR_ACCEPTABLE_KEYS = [
  ...DIGITS_AND_OPERATORS,
  "Enter",
  "Delete"
];
