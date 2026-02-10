export const HEADER_HEIGHT = 50
export const FOOTER_HEIGHT = 20
export const GRID_MIN_HEIGHT = 500 // body {min-height: 500px;}

// export const COLORS = {
//   primary: '#283618',
//   secondary: '#606c38',
//   neutral: '#C2C5AA', // нейтральные оттенки (текст, границы, фоны)
//   // surface: '#606c38', //цвета поверхностей (карточки, панели)
//   background: '#fefae0'
// }
export const COLORS = {
  primary: '#283618',
  secondary: '#606c38',
  neutral: '#C2C5AA', // нейтральные оттенки (текст, границы, фоны)
  // surface: '#606c38', //цвета поверхностей (карточки, панели)
  background: '#fefae0',
  possibleCell: '#a3c095',
  lastCell: '#eec970',
  errorCell: '#d15050',
  accessibleСell: '#606c38',
  blackCell: '#b58863',
  whiteCell: '#f0d9b5'
}


/*
#f0d9b5 — светлый квадрат (основной);

#b58863 — тёмный квадрат (основной);

#d4bf8b — акцент для подсветки ходов;

#8b5a2b — граница доски;

#5f4830 — тень под фигурами.
*/




export const ranks = [8, 7, 6, 5, 4, 3, 2, 1]
export const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export const figure = {
  'bb': '/figures/bishop-black.svg',
  'bw': '/figures/bishop-white.svg',
  'kb': '/figures/king-black.svg',
  'kw': '/figures/king-white.svg',
  'nb': '/figures/knight-black.svg',
  'nw': '/figures/knight-white.svg',
  'pb': '/figures/pawn-black.svg',
  'pw': '/figures/pawn-white.svg',
  'qb': '/figures/queen-black.svg',
  'qw': '/figures/queen-white.svg',
  'rb': '/figures/rook-black.svg',
  'rw': '/figures/rook-white.svg',
}




export const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
}

export const media = {
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
}


/*
export const boardMap = [
  ['rb', 'nb', 'bb', 'qb', 'kb', 'bb', 'nb', 'rb'],
  ['pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb'],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw'],
  ['rw', 'nw', 'bw', 'qw', 'kw', 'bw', 'nw', 'rw']
  ]

*/