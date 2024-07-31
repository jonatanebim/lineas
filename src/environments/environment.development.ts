const urlApiReportes = 'https://apimqp-quimicasuiza.farmaciasperuanas.pe/mqclient/v1/Report'
const urlApiMq = 'https://apiqa.quimicasuiza.com:8587'
const tokenMq = '#tokenMq'

const TOKEN =
  'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJxdWltaXZlbnRhIiwiaGFtYmllbnRlIjoicHJkIiwieWVhciI6IjIwMTkiLCJzdXBwb3J0Ijoid3d3LnF1aW1pY2FzdWl6YS5jb20ifQ.aivnszuHEsXVxM1BWUy4uHhbS46DN2l7JzZw1DirVYAdh54Oj5owBq_9CV_cMStpRhy0YCgwYE4gaZP3yDP1gRiy-iJUgfsTNmrVtCF9BEjPCT4iSnDKNxrRRxCqMOJPvodlGJF8qIMn3SvlFqI8Do4zDQmhu8krxN4eDeVhyCJkgNiuTHFvFGu85eEDzEMjyVcNVuXeUSV8BIz14gCfwE52BFisCeoJiOByMY5E1vssZmxH3EdyueobdvSkh1y3fHWYHEGgqrcVR5XpvErYydobHL_oU8xGf5GRxNPL-1APz-sQsScFNPsZ1mPYdejT3xdA5up6p4BTNjPIAZQwFA'

export const environment = {
  production: false,
  login: `${urlApiMq}/login`,
  home: `${urlApiReportes}/ReporteHome`,
  categories: `${urlApiReportes}/ReporteCategorias`,
  region: `${urlApiReportes}/ReportePorRegion`,
  competencies: `${urlApiReportes}/ReportePremiun`,
  report: `${urlApiReportes}/ReporteDescarga`,
  tokenMq,
  config: {
    interceptor: {
      header: 'Authorization_APP',
      token: TOKEN,
      headerJwt: 'Authorization',
    },
  },
}
