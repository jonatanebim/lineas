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
