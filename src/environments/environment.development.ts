const urlApiReportes = 'https://apimqp-quimicasuiza.farmaciasperuanas.pe/mqclient/v1/Report';
const urlApiMq = 'https://apiqa.quimicasuiza.com:8587';
const tokenMq = '#{tokenMq}';

export const environment = {
  production: true,
  login: `${urlApiMq}/login`,
  home: `${urlApiReportes}/ReporteHome?lineCode=11&date=2024-05-01&untilToday=false`,
  categories: `${urlApiReportes}/categories`,
  region: `${urlApiReportes}/region`,
  tokenMq
};

// const host = 'https://apimqp-quimicasuiza.farmaciasperuanas.pe/mqclient/v1/Report';

// export const environment = {
//   home: `${host}/ReporteHome?lineCode=11&date=2024-05-01&untilToday=false`,
//   categories: `${host}/categories`,
//   region: `${host}/region`,
// };
