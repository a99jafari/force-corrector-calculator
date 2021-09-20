import { useCallback, useState, useRef, useEffect } from "react";
import { useComputableString } from "../lib/hooks";
import { CalculatorButton } from "../components";
import { calculate } from "../lib/utilities";
import { Key } from "../lib/types";
import "./styles.css";


type TextboxChange = React.ChangeEvent<HTMLTextAreaElement>;

export function Application(): React.ReactElement {
  const { value, setter } = useComputableString();
  const [isCalculatorOn, setIsCalculatorOn] = useState(true);

  const textboxRef = useRef<HTMLTextAreaElement>(null);

  const focusOnCalculator = useCallback(() => textboxRef.current?.focus(), []);

  const clean = useCallback(() => {
    if (isCalculatorOn) {
      setter("");
    }
  }, [isCalculatorOn, setter]);

  const turnOffOrOnCalculator = useCallback(() => {
    clean();
    setIsCalculatorOn(!isCalculatorOn);
  }, [isCalculatorOn, clean]);

  const getResult = useCallback(() => {
    if (isCalculatorOn) {
      setter(calculate(value));
    }
  }, [isCalculatorOn, setter, value]);

  const handleTextboxChange = useCallback((event: TextboxChange) => {
    if (isCalculatorOn) {
      setter(event.target.value);
    }
  }, [isCalculatorOn, setter]);

  const redo = useCallback(() => {
    if (isCalculatorOn) {
      setter(value.slice(0, value.length - 1));
    }
  }, [isCalculatorOn, setter, value]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (isCalculatorOn) {
      if (event.key === "Enter") {
        getResult();
      }
      else if (event.key === "c" || event.key === "C") {
        clean();
      }
    }
  }, [isCalculatorOn, getResult, clean]);

  const handleButtonClick = useCallback((symbol: Key) => {
    if (isCalculatorOn) {
      setter(value + symbol);
    }
  }, [isCalculatorOn, setter, value]);

  useEffect(() => {
    focusOnCalculator();
    document.addEventListener("click", focusOnCalculator);
    return () => document.removeEventListener("click", focusOnCalculator);
  }, []);

  return (
    <main className="application">
      <header>
        <h1>Force Corrector Calculator</h1>
        <p>.: Try to enter any invalid input! :.</p>
      </header>
      {isCalculatorOn ?
        <textarea
          ref={textboxRef}
          disabled={!isCalculatorOn}
          onKeyPress={handleKeyPress}
          onChange={handleTextboxChange}
          value={value}
        /> :
        <section>
          <h2>Developed by Ahmad Jafari</h2>
          <a
            href="https://github.com/jafari-dev/force-corrector-calculator/"
            target="_blank"
            rel="noreferrer"
          >
            Click here to see its source on Github
          </a>
        </section>}
      <div className="buttons-container">
        <CalculatorButton type="operator" symbol="+" onClick={handleButtonClick} />
        <CalculatorButton type="operator" symbol="*" onClick={handleButtonClick} />
        <CalculatorButton type="operator" symbol="-" onClick={handleButtonClick} />
        <CalculatorButton type="operator" symbol="/" onClick={handleButtonClick} />
        <CalculatorButton type="digit" symbol="7" onClick={handleButtonClick} />
        <CalculatorButton type="digit" symbol="8" onClick={handleButtonClick} />
        <CalculatorButton type="digit" symbol="9" onClick={handleButtonClick} />
        <CalculatorButton type="digit" symbol="4" onClick={handleButtonClick} />
        <CalculatorButton type="digit" symbol="5" onClick={handleButtonClick} />
        <CalculatorButton type="digit" symbol="6" onClick={handleButtonClick} />
        <CalculatorButton type="digit" symbol="1" onClick={handleButtonClick} />
        <CalculatorButton type="digit" symbol="2" onClick={handleButtonClick} />
        <CalculatorButton type="digit" symbol="3" onClick={handleButtonClick} />
        <CalculatorButton type="digit" symbol="." onClick={handleButtonClick} />
        <CalculatorButton type="digit" symbol="0" onClick={handleButtonClick} />
        <button className="clear" children="C" onClick={clean} />
        <button
          className="on-off"
          onClick={turnOffOrOnCalculator}
          children={isCalculatorOn ? "OFF" : "ON"}
        />
        <button className="equal" children="=" onClick={getResult} />
        <button className="redo" children="⬅" onClick={redo} />
      </div>
    </main>
  );
}
