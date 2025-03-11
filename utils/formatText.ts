import { loremText } from './randomText'

/**
 * Formats a string by capitalizing the first letter and adding a space before the rest.
 * @param text - The input string to be formatted
 * @returns A string with the first character capitalized and separated by space
 */
export function formatTitle(text: string): string {
  if (!text) return text
  return `${text.charAt(0).toUpperCase()} ${text.slice(1)}`
}

/**
 * Formats text into sentences with random length and punctuation.
 * Each sentence is capitalized and ends with random punctuation marks.
 * @param text - The input text to be formatted
 * @returns A string with formatted sentences
 */
export function formatSentences(text: string): string {
  if (!text) return text

  const sentenceLength = Math.floor(Math.random() * 10) + 4
  const words = text.split(' ')
  const sentences = []
  const punctuation = ['.', '!', '?', '...', '!!', '!?', '?!']
  let sentence = ''

  words.forEach((word, index) => {
    if (index % sentenceLength === 0 && index !== 0) {
      sentence = sentence.trim() + '.'
      sentences.push(
        `<p>${sentence.charAt(0).toUpperCase() + sentence.slice(1)}</p>`,
      )
      sentence = ''
    }
    sentence += word + ' '
  })

  if (sentence) {
    sentence =
      sentence.trim() +
      punctuation[Math.floor(Math.random() * punctuation.length)]
    sentences.push(
      `<p>${sentence.charAt(0).toUpperCase() + sentence.slice(1)}</p>`,
    )
  }

  // add more sentences to make the post body more realistic looking
  return [...sentences, ...loremText].join(' ')
}
