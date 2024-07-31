const BASE = 'dashboard'

export default {
  base: '',
  dashboard: {
    path: BASE,
    childrens: {
      home: 'home',
      homePath: `${BASE}/home`,
      categories: 'categorias',
      categoriesPath: `${BASE}/categorias`,
      competencies: 'competencias',
      competenciesPath: `${BASE}/competencias`,
      regions: 'regiones',
      regionsPath: `${BASE}/regiones`,
    },
  },
}
