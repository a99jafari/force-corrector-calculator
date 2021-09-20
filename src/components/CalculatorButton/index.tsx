import { useCallback, memo } from "react";
import { Key } from "../../lib/types";


interface Props {
  symbol: Key;
  type: "digit" | "operator";
  onClick: (symbol: Key) => void;
}

function CalculatorButtonComponent({symbol, type, onClick}: Props): React.ReactElement {
  const handleClick = useCallback(() => {
    onClick(symbol)
  }, [onClick, symbol]);

  const label =
    symbol === "*"
    ? "×"
    : symbol === "+"
    ? "+"
    : symbol === "-"
    ? "−"
    : symbol === "/"
    ? "÷"
    :  symbol;

  return (
    <button className={type} onClick={handleClick} value={symbol}>
      {label}
    </button>
  )
}

export const CalculatorButton = memo(CalculatorButtonComponent);
