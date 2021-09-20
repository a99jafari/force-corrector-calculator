import faker from "faker";
import { OPERATORS } from "../types";

export function mockComputableString() {
  const requiredOperators = OPERATORS.sort(() => (0.5 - Math.random()));

  const numberOfOperators = faker.datatype.number({ min: 1, max: 10 });
  const numberOfNumbers = numberOfOperators + 4 + 1;

  const operators = Array.from({ length: numberOfOperators - 4 }, () => (
    faker.random.arrayElement(OPERATORS)
  )).concat(requiredOperators);

  const numbers = Array.from({ length: numberOfNumbers }, () => (
    faker.datatype.float()
  ));

  const computableString = operators.reduce((accumulator, operator, index) => (
    `${accumulator}${operator}${numbers[index + 1]}`
  ), `${numbers[0]}`);

  return computableString;
}
