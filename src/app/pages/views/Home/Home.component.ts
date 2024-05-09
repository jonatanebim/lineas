import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardReportComponent } from '../../components/card-report/card-report.component';
import { CardFilterComponent } from '../../components/card-filter/card-filter.component';
import { TableReportComponent } from '../../components/table-report/table-report.component';
import { DimensionGraphComponent } from '../../components/dimension-graph/dimension-graph.component';
import { CountryGraphComponent } from '../../components/country-graph/country-graph.component';
import { EvolutionChartComponent } from '../../components/evolution-chart/evolution-chart.component';
import { StackedGraphComponent } from '../../components/stacked-graph/stacked-graph.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardReportComponent,
    CardFilterComponent,
    TableReportComponent,
    DimensionGraphComponent,
    CountryGraphComponent,
    EvolutionChartComponent,
    StackedGraphComponent,
  ],
  templateUrl: './Home.component.html',
  styleUrl: './Home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  categories = ['JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

  series = [
    {
      type: 'column',
      allowPointSelect: false,
      enableMouseTracking: false,
      pointWidth: 38,
      color: '#0050F5',
      data: [106.0, 108.2, 203.1, 207.9, 302.2, 306.4],
    },
    {
      type: 'spline',
      dashStyle: 'Dot',
      color: '#314561',
      data: [226.0, 228.2, 283.1, 300.9, 322.2, 326.4],
    },

    {
      type: 'spline',
      color: '#8F959D',
      data: [230.0, 278.2, 290.1, 280.9, 332.2, 336.4],
    },
  ];

  headers = [
    {
      label: 'DPTO/CIUDAD',
      type: '',
    },
    {
      label: 'Venta MQ',
      type: '',
    },
    {
      label: 'M Share',
      type: '',
    },
    {
      label: '%Dist Num',
      type: '',
    },
    {
      label: 'Vs Ma',
      type: '',
    },
    {
      label: 'vs maa',
      type: '',
    },
  ];

  values = [
    {
      columns: [
        {
          value: 'Desodorantes y antitraspirantes',
          type: '',
        },
        {
          value: 'alta',
          type: 'status',
          color: '',
        },
        {
          value: 'Muy atractivo',
          type: '',
        },
        {
          value: '8/13 SKUs',
          type: 'badge',
          color: '',
        },
        {
          value: 'Ver detalle de SKU',
          type: '',
        },
        {
          value: '',
          type: 'indicator',
        },
      ],
    },
    {
      columns: [
        {
          value: 'Desodorantes y antitraspirantes',
          type: '',
        },
        {
          value: 'alta',
          type: 'status',
          color: '',
        },
        {
          value: 'Muy atractivo',
          type: '',
        },
        {
          value: '8/13 SKUs',
          type: 'badge',
          color: '',
        },
        {
          value: 'Ver detalle de SKU',
          type: '',
        },
        {
          value: '',
          type: 'indicator',
        },
      ],
    },
    {
      columns: [
        {
          value: 'Desodorantes y antitraspirantes',
          type: '',
        },
        {
          value: 'alta',
          type: 'status',
          color: '',
        },
        {
          value: 'Muy atractivo',
          type: '',
        },
        {
          value: '8/13 SKUs',
          type: 'badge',
          color: '',
        },
        {
          value: 'Ver detalle de SKU',
          type: '',
        },
        {
          value: '',
          type: 'indicator',
        },
      ],
    },
    {
      columns: [
        {
          value: 'Desodorantes y antitraspirantes',
          type: '',
        },
        {
          value: 'alta',
          type: 'status',
          color: '',
        },
        {
          value: 'Muy atractivo',
          type: '',
        },
        {
          value: '8/13 SKUs',
          type: 'badge',
          color: '',
        },
        {
          value: 'Ver detalle de SKU',
          type: '',
        },
        {
          value: '',
          type: 'indicator',
        },
      ],
    },
    {
      columns: [
        {
          value: 'Desodorantes y antitraspirantes',
          type: '',
        },
        {
          value: 'alta',
          type: 'status',
          color: '',
        },
        {
          value: 'Muy atractivo',
          type: '',
        },
        {
          value: '8/13 SKUs',
          type: 'badge',
          color: '',
        },
        {
          value: 'Ver detalle de SKU',
          type: '',
        },
        {
          value: '',
          type: 'indicator',
        },
      ],
    },
  ];
}
