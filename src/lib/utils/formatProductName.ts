/**
 * Formats product names that contain pack information (e.g., "4x6x375ml")
 * into a more readable format (e.g., "24-pack (375 ml cans)")
 *
 * @param productName - The original product name string
 * @returns The formatted product name with pack information converted to user friendly format
 *
 * @example
 * ```tsx
 * formatProductName("Victoria Bitter 4x6x375ml")
 * // Returns: "Victoria Bitter 24-pack (375 ml cans)"
 * ```
 */
export const formatProductName = (productName: string): string => {
  // Match: multipliers + volume (ml or L, with optional decimals)
  const packPattern = /((?:\d+\s*[x×*]\s*)+)(\d+(?:\.\d+)?\s*(?:ml|ML|l|L))/;
  const match = productName.match(packPattern);

  if (match) {
    const [, multipliers, volume] = match;
    const count = multipliers
      .split('x') // split string whereever there's an "x"
      .filter(Boolean) // filter out empty strings
      .map(Number) // convert to numbers
      .reduce((a, b) => a * b, 1); // multiply all the numbers together

    return productName.replace(packPattern, `${volume} (${count}-pack)`);
  }

  return productName;
};
