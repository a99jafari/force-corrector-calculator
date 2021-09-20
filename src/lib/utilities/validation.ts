const INVALID_DECIMAL_REGEX = new RegExp(/\.+[0-9]+\./gu);
const INVALID_SYMBOLS_REGEX = new RegExp(/[^0-9-+*/.]/gu);
const INVALID_INITIAL_INPUTS = new RegExp(/^[/*.]|^00|^[+-][.*/]/gu);
const INVALID_ZEROS_REGEX = new RegExp(/[/+*-]00/gu);

const INVALID_OPERATORS = [
  "++", "+-", "+*", "+/",
  "-+", "--", "-*", "-/",
  "*+", "*-", "**", "*/",
  "/+", "/-", "/*", "//",
  ".+", ".-", ".*", "./",
  "+.", "-.", "*.", "/.",
  ".."
];
const INVALID_UNUSED_ZEROS = [
  "+00", "+01", "+02", "+03", "+04", "+05", "+06", "+07", "+08", "+09",
  "-00", "-01", "-02", "-03", "-04", "-05", "-06", "-07", "-08", "-09",
  "*00", "*01", "*02", "*03", "*04", "*05", "*06", "*07", "*08", "*09",
  "/00", "/01", "/02", "/03", "/04", "/05", "/06", "/07", "/08", "/09",
];


export function isValidString(string: string): boolean {
  if (string === "") {
    return true;
  }
  if (string.match(INVALID_INITIAL_INPUTS) !== null) {
    return false;
  }
  if (string.match(INVALID_ZEROS_REGEX) !== null) {
    return false;
  }
  if (string.match(INVALID_SYMBOLS_REGEX) !== null) {
    return false;
  }
  if (string.match(INVALID_DECIMAL_REGEX) !== null) {
    return false;
  }

  return true;
}

export function getFormattedString(computableString: string): string {
  const clearString = computableString.replace(INVALID_SYMBOLS_REGEX, "");

  const hasStickedOperators = INVALID_OPERATORS.some((template) => (
    computableString.includes(template)
  ));
  const hasDualInvalidDigits = INVALID_UNUSED_ZEROS.some((template) => (
    computableString.includes(template)
  ));

  if (hasStickedOperators === true) {
    const lastIndex = clearString.length - 1;
    const lastCharacter = clearString[lastIndex];
    const slicedString = clearString.slice(0, -2);
    return `${slicedString}${lastCharacter}`;
  }
  if (hasDualInvalidDigits === true) {
    const lastIndex = clearString.length - 1;
    const lastCharacters = clearString[lastIndex - 2] + clearString[lastIndex];
    const slicedString = clearString.slice(0, -3);
    return `${slicedString}${lastCharacters}`;
  }

  return clearString;
}
