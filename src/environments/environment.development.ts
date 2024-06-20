const urlApiReportes = 'https://apimqp-quimicasuiza.farmaciasperuanas.pe/mqclient/v1/Report'
const urlApiReportes2 = 'http://localhost:3000'
const urlApiMq = 'https://apiqa.quimicasuiza.com:8587'
const tokenMq = '#{tokenMq}'

export const environment = {
  production: true,
  login: `${urlApiMq}/login`,
  home: `${urlApiReportes2}/home`,
  categories: `${urlApiReportes2}/categories`,
  region: `${urlApiReportes2}/region`,
  tokenMq,
}

// export const environment = {
//   production: true,
//   login: `${urlApiMq}/login`,
//   home: `${urlApiReportes}/ReporteHome?lineCode=11&date=2024-05-01&untilToday=false`,
//   categories: `${urlApiReportes}/ReporteCategorias?lineCode=11&date=2024-05-01&untilToday=false&category`,
//   region: `${urlApiReportes}/ReportePorRegion?lineCode=11&date=2024-05-01&untilToday=false&region="lima"`,
//   tokenMq,
// }