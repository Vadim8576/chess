export const HEADER_HEIGHT = 50
export const FOOTER_HEIGHT = 0
export const GRID_MIN_HEIGHT = 500 // body {min-height: 500px;}

export const GAME_COLORS = {
  primary: '#283618',
  secondary: '#606c38',
  neutral: '#C2C5AA', // нейтральные оттенки (текст, границы, фоны)
  // surface: '#606c38', //цвета поверхностей (карточки, панели)
  background: '#fefae0'
}





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