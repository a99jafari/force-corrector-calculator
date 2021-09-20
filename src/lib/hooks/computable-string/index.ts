import { useState, useCallback } from "react";
import { isValidString, getFormattedString } from "../../utilities/validation";


interface ReturnType {
  value: string;
  setter: (newValue: string) => void;
}

export function useComputableString(): ReturnType {
  const [value, setValue] = useState("");

  const setter = useCallback((newValue: string) => {
    if (isValidString(newValue) === true) {
      const formattedValue = getFormattedString(newValue);
      setValue(formattedValue);
    }
  }, []);

  return { value, setter };
}
