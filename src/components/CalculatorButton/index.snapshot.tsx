import { render } from "@testing-library/react";
import { DIGITS_AND_OPERATORS } from "../../lib/types";
import { CalculatorButton } from "..";
import faker from "faker";


describe("CalculatorButton test", () => {
  faker.seed(1);

  test("SNapshot test", () => {
    const symbol = faker.random.arrayElement(DIGITS_AND_OPERATORS);
    const type = faker.random.arrayElement(["digit", "operator"]) as "digit" | "operator";
    
    const { container } = render(
      <CalculatorButton type={type} symbol={symbol} onClick={() => {}} />
    );

    expect(container).toMatchSnapshot();
  });
});
