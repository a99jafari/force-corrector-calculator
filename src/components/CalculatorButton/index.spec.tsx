import { CalculatorButton } from "..";
import { fireEvent, render } from "@testing-library/react";
import faker from "faker";
import { DIGITS_AND_OPERATORS } from "../../lib/types";


describe("CalculatorButton component", () => {
  test("Specification test", () => {
    const symbol = faker.random.arrayElement(DIGITS_AND_OPERATORS);
    const type = faker.random.arrayElement(["digit", "operator"]) as "digit" | "operator";

    const callback = jest.fn();

    const { getByText } = render(
      <CalculatorButton type={type} symbol={symbol} onClick={callback} />
    );

    const label = symbol === "*"
      ? "×"
      : symbol === "+"
      ? "+"
      : symbol === "-"
      ? "−"
      : symbol === "/"
      ? "÷"
      : symbol;
    
    const button = getByText(label) as HTMLButtonElement;

    expect(button).toHaveValue(symbol);
    expect(button).toHaveClass(type);
    expect(button).toHaveTextContent(label);

    expect(callback).toBeCalledTimes(0);
    fireEvent.click(button);
    expect(callback).toBeCalledTimes(1);
  });
});