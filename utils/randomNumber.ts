/**
 * Generates a random number with specified number of digits
 * @param numberSize The number of digits in the generated number
 * @returns A number with the specified number of digits
 */
export function getRandomNumber(numberSize: number): number {
  const min = Math.pow(10, numberSize - 1)
  const max = Math.pow(10, numberSize) - 1

  return Math.floor(min + Math.random() * (max - min + 1))
}
