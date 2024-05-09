import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardFilterComponent } from '../../components/card-filter/card-filter.component';
import { DoughnutChartComponent } from '../../components/doughnut-chart/doughnut-chart.component';
import { TableReportComponent } from '../../components/table-report/table-report.component';
import { CardReportComponent } from '../../components/card-report/card-report.component';
import { EvolutionChartComponent } from '../../components/evolution-chart/evolution-chart.component';
import { DoughnutVerticalComponent } from '../../components/doughnut-vertical/doughnut-vertical.component';
import { DepartmentGraphComponent } from '../../components/department-graph/department-graph.component';

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [
    CommonModule,
    CardFilterComponent,
    DepartmentGraphComponent,
    CardReportComponent,
    EvolutionChartComponent,
    DoughnutChartComponent,
    DoughnutVerticalComponent,
    EvolutionChartComponent,
    TableReportComponent,
  ],
  templateUrl: './Region.component.html',
  styleUrl: './Region.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegionComponent {
  categories = [
    'ENE',
    'FEB',
    'MAR',
    'ABR',
    'MAY',
    'JUN',
    'JUL',
    'AGO',
    'SEP',
    'OCT',
    'NOV',
    'DIC',
  ];

  series = [
    {
      type: 'column',
      allowPointSelect: false,
      enableMouseTracking: false,
      pointWidth: 29,
      color: '#0050F5',
      data: [
        106.0, 108.2, 203.1, 207.9, 302.2, 306.4, 106.0, 108.2, 203.1, 207.9,
        302.2, 306.4,
      ],
    },
    {
      type: 'spline',
      dashStyle: 'Dot',
      color: '#314561',
      data: [
        126.0, 128.2, 223.1, 227.9, 322.2, 326.4, 126.0, 128.2, 223.1, 227.9,
        322.2, 326.4,
      ],
    },

    {
      type: 'spline',
      color: '#8F959D',
      data: [
        116.0, 118.2, 233.1, 237.9, 332.2, 336.4, 116.0, 118.2, 233.1, 237.9,
        332.2, 336.4,
      ],
    },
  ];

  headers = [
    {
      label: 'Producto',
      type: '',
    },
    {
      label: 'Venta MQ',
      type: '',
    },
    {
      label: 'Vs Ma',
      type: '',
    },
    {
      label: 'Vs 3um',
      type: '',
    },
    {
      label: 'vs 6um',
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
          value: '33%',
          type: '',
        },
        {
          value: '33%',
          type: '',
        },
        {
          value: '33%',
          type: '',
        },
        {
          value: '',
          type: 'indicator',
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
          value: '33%',
          type: '',
        },
        {
          value: '33%',
          type: '',
        },
        {
          value: '33%',
          type: '',
        },
        {
          value: '',
          type: 'indicator',
        },
        {
          value: '',
          type: 'indicator',
        },
      ],
    },
  ];

  headers2 = [
    {
      label: 'Cob. MQ',
      type: 'indicator',
    },
    {
      label: 'Vs Ma',
      type: 'indicator',
    },
    {
      label: 'Vs 3um',
      type: 'indicator',
    },
    {
      label: 'vs 6um',
      type: 'indicator',
    },
    {
      label: 'vs maa',
      type: 'indicator',
    },
  ];

  values2 = [
    {
      columns: [
        {
          value: '110',
          type: '',
        },
        {
          value: '',
          type: 'indicator',
        },
        {
          value: '',
          type: 'indicator',
        },
        {
          value: '',
          type: 'indicator',
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
          value: '110',
          type: '',
        },
        {
          value: '',
          type: 'indicator',
        },
        {
          value: '',
          type: 'indicator',
        },
        {
          value: '',
          type: 'indicator',
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
          value: '110',
          type: '',
        },
        {
          value: '',
          type: 'indicator',
        },
        {
          value: '',
          type: 'indicator',
        },
        {
          value: '',
          type: 'indicator',
        },
        {
          value: '',
          type: 'indicator',
        },
      ],
    },
  ];
}
