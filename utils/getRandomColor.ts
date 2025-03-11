const colors: string[] = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEEAD', // Yellow
  '#D4A5A5', // Pink
  '#9B59B6', // Purple
  '#3498DB', // Light Blue
  '#E67E22', // Orange
  '#2ECC71', // Emerald
]

export const getRandomColor = (): string => {
  return colors[Math.floor(Math.random() * colors.length)]
}

export const getGradientColor = () => {
  return `--color-front: ${getRandomColor()}; --color-back: ${getRandomColor()};`
}
