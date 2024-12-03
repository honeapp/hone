import localFont from 'next/font/local'

const relativeBook = localFont({ src: '../fonts/Relative-Book.ttf' })
const relativeMedium = localFont({ src: '../fonts/Relative-Medium.ttf' })
const relativeBold = localFont({ src: '../fonts/Relative-Bold.otf' })

export const relative = {
  book: relativeBook,
  medium: relativeMedium,
  bold: relativeBold
}