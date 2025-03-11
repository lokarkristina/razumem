/**
 * Shuffles the elements of an array randomly using the Fisher-Yates algorithm
 * @param array The array to be shuffled
 * @returns The same array with elements randomly reordered
 */
export default function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}
