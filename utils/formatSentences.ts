export function formatSentences(text: string): string[] {
  const sentenceLength = Math.floor(Math.random() * 10) + 4
  const words = text.split(' ')
  const sentences = []
  const punctuation = ['.', '!', '?', '...', '!!', '!?', '?!']
  let sentence = ''

  words.forEach((word, index) => {
    if (index % sentenceLength === 0 && index !== 0) {
      sentence = sentence.trim() + '.'
      sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1))
      sentence = ''
    }
    sentence += word + ' '
  })

  if (sentence) {
    sentence =
      sentence.trim() +
      punctuation[Math.floor(Math.random() * punctuation.length)]
    sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1))
  }

  return sentences
}
