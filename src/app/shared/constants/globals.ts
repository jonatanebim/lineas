export const COLORS = ['#0E255D', '#0D3B9B', '#00B0FF', '#0050F5', '#0840C5']
export const GREY_COLORS = ['#8F959D', '#D9DDE3', '#B3B8BF', '#D9DDE3', '#E9ECF2']
export const DEFAULT_COLOR = '#B3B8BF'

export const MAX_CATEGORIES_VIEW = 99
export const MIN_CATEGORIES_VIEW = 4

export const EMPTY_DOUGHNUT = [
  {
    value: 100,
    label: 'Sin Información',
  },
]

export const FILE_SAVER = {
  name: 'PlataformaLineasMQ',
  size: 15,
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export const DEFAULT_STORE: any = {
  lineCode: '305',
  untilToday: false,
  region: '',
  datetime: null,
}

export const DEFAULT_DEPARTMENT = {
  name: 'Lima',
  value: 'LI',
  vector: '../../../../assets/images/departments/Lima.svg',
  lat: -11.435859005164344,
  lon: -76.97692578655742,
}

export const DEPARTMENTS = [
  DEFAULT_DEPARTMENT,
  {
    name: 'Lambayeque',
    value: 'LAM',
    vector: '../../../../assets/images/departments/Lambayeque.svg',
    lat: -6.2096434645689875,
    lon: -80.3864827073368,
  },
  {
    name: 'Piura',
    value: 'PI',
    vector: '../../../../assets/images/departments/Piura.svg',
    lat: -5.037784116164985,
    lon: -79.95516090165049,
  },
  {
    name: 'Apurímac',
    value: 'AP',
    vector: '../../../../assets/images/departments/Apurimac.svg',
    lat: -14.08487124734184,
    lon: -72.80889633494473,
  },
  {
    name: 'Loreto',
    value: 'LO',
    vector: '../../../../assets/images/departments/Loreto.svg',
    lat: -3.9543411880362864,
    lon: -75.16862333095942,
  },
  {
    name: 'Pasco',
    value: 'PA',
    vector: '../../../../assets/images/departments/Pasco.svg',
    lat: -10.438094114299766,
    lon: -75.47149919478467,
  },

  {
    name: 'Tumbes',
    value: 'TU',
    vector: '../../../../assets/images/departments/Tumbes.svg',
    lat: -3.786508721507954,
    lon: -80.64043921916614,
  },

  {
    name: 'San Martin',
    value: 'SM',
    vector: '../../../../assets/images/departments/San Martin.svg',
    lat: -7.365463250676204,
    lon: -76.83540917163708,
  },

  {
    name: 'Junin',
    value: 'JU',
    vector: '../../../../assets/images/departments/Junin.svg',
    lat: -11.500125881530227,
    lon: -74.99149259513648,
  },

  {
    name: 'Cusco',
    value: 'CU',
    vector: '../../../../assets/images/departments/Cusco.svg',
    lat: -13.138401058821442,
    lon: -72.08937054438547,
  },

  {
    name: 'Moquegua',
    value: 'MO',
    vector: '../../../../assets/images/departments/Moquegua.svg',
    lat: -16.648038031592524,
    lon: -70.71578699097887,
  },

  {
    name: 'Ucayali',
    value: 'UCA',
    vector: '../../../../assets/images/departments/Ucayali.svg',
    lat: -9.662104626256976,
    lon: -73.4129282067457,
  },

  {
    name: 'Madre de Dios',
    value: 'MDD',
    vector: '../../../../assets/images/departments/Madre de dios.svg',
    lat: -11.806240740553376,
    lon: -71.29847354736263,
  },

  {
    name: 'Puno',
    value: 'PU',
    vector: '../../../../assets/images/departments/Puno.svg',
    lat: -14.634318811822352,
    lon: -70.20720161504548,
  },

  {
    name: 'Amazonas',
    value: 'AMA',
    vector: '../../../../assets/images/departments/Amazonas.svg',
    lat: -5.284197098603436,
    lon: -78.25351103008602,
  },

  {
    name: 'Cajamarca',
    value: 'CAJ',
    vector: '../../../../assets/images/departments/Cajamarca.svg',
    lat: -6.947211277724753,
    lon: -78.66412879949412,
  },

  {
    name: 'Arequipa',
    value: 'ARE',
    vector: '../../../../assets/images/departments/Arequipa.svg',
    lat: -15.780263725203865,
    lon: -72.52292983831543,
  },

  {
    name: 'Ica',
    value: 'ICA',
    vector: '../../../../assets/images/departments/Ica.svg',
    lat: -14.420543736765152,
    lon: -75.6629564318007,
  },

  {
    name: 'Tacna',
    value: 'TAC',
    vector: '../../../../assets/images/departments/Tacna.svg',
    lat: -17.755208524763418,
    lon: -70.36725092471447,
  },

  {
    name: 'Ayacucho',
    value: 'AYA',
    vector: '../../../../assets/images/departments/Ayacucho.svg',
    lat: -14.37153540271762,
    lon: -74.29989564634653,
  },

  {
    name: 'Huancavelica',
    value: 'HUA',
    vector: '../../../../assets/images/departments/Huancavelica.svg',
    lat: -12.903632971344374,
    lon: -75.15744109335733,
  },

  {
    name: 'Ancash',
    value: 'ANC',
    vector: '../../../../assets/images/departments/Ancash.svg',
    lat: -9.310865275415251,
    lon: -77.84274741095572,
  },

  {
    name: 'Huanuco',
    value: 'HUC',
    vector: '../../../../assets/images/departments/Huanuco.svg',
    lat: -9.466937010811694,
    lon: -76.30088713915157,
  },
]

export const DEFAULT_SKU_IMAGE = '../../../../assets/images/logo-top.png'

export enum TABLE_TOOLTIPS {
  'VS MA' = 'versus año anterior',
  'Vs Ma' = 'versus mes anterior',
  'Vs 3um' = 'Versus tres últimos meses',
  'Vs 6um' = 'Versus seis últimos meses',
  'Cob. MQ' = 'Cobertura Mi Química',
  'Dist. Pond' = 'Distribución Ponderada',
  'Dist. Num' = 'Distrbución Numérica',
}
