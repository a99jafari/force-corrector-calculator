import { Operator } from "../types";


function add(numberOne: number, numberTwo: number) {
  return numberOne + numberTwo;
}

function multiply(numberOne: number, numberTwo: number) {
  return numberOne * numberTwo;
}

function subtract(numberOne: number, numberTwo: number) {
  return numberOne - numberTwo;
}

function devide(numberOne: number, numberTwo: number) {
  if (numberTwo === 0) {
    return 0;
  }
  
  return numberOne / numberTwo;
}

function operate({ numberOne, numberTwo, operator }: {
  numberOne: number;
  numberTwo: number;
  operator: Operator;
}) {
  switch(operator) {
    case "+":
      return add(numberOne, numberTwo);
    case "-":
      return subtract(numberOne, numberTwo);
    case "*":
      return multiply(numberOne, numberTwo);
    case "/":
      return devide(numberOne, numberTwo);
    default:
      return numberOne;
  }
}

function getNumbersOfCompuableString(computableString: string): number[] {
  const splitNumbers =
    computableString
    .replace(/[*/+-]/gu, "#")
    .split("#")
    .map(Number);

  return splitNumbers;
}

function getOperatorsOfCompuableString(computableString: string): Operator[] {
  const splitOperators = 
    computableString
    .slice(0, -1)
    .replace(/[^*/+-]/gu, "")
    .split("") as Operator[];

  return splitOperators;
}

export function parseComputableString(computableString: string): {
  operators: (Operator | null)[],
  numbers: (number | null)[]
} {
  return {
    operators: getOperatorsOfCompuableString(computableString),
    numbers: getNumbersOfCompuableString(computableString)
  }
}


export function calculate(computableString: string): string {
  const { numbers, operators } = parseComputableString(computableString);

  operators.forEach((operator, index) => {
    if (operator === "*" || operator === "/") {
      // Sets the result of multiplication or division in second number's index
      numbers[index + 1] = operate({
        numberOne: numbers[index] as number,
        numberTwo: numbers[index + 1] as number,
        operator
      });
      // Removes the first number of multiplication or division
      numbers[index] = null;
      // Removes the current "*" or "/" from operators
      operators[index] = null;
    }
  });

  const newNumbers = numbers.filter(
    (number) => (number !== null)
  ) as number[];

  // Includes just "+" and "-" operators
  const newOperators = operators.filter(
    (operator) => (operator !== null)
  ) as Operator[];

  const result = newOperators.reduce((accumulator, operator, index) => (
    operate({
      numberOne: accumulator,
      numberTwo: newNumbers[index + 1],
      operator
    })
  ), newNumbers[0]);
  
  // Rounds the number with 3 decimal precesion and returns it
  return (Math.round(result * 1000) / 1000).toString();
}
