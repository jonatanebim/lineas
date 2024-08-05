const urlApiReportes = '#{urlApiReportes}';
const urlApiMq = '#{urlApiMq}';
const tokenMq = '#{tokenMq}';

export const environment = {
  production: true,
  login: `${urlApiMq}/login`,
  home: `${urlApiReportes}/home`,
  categories: `${urlApiReportes}/categories`,
  region: `${urlApiReportes}/region`,
  tokenMq
};
