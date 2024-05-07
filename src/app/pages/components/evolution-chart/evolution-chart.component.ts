import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableReportComponent } from '../table-report/table-report.component';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import variwide from 'highcharts/modules/variwide';
import HC_more from 'highcharts/highcharts-more';
import { GraphIndicatorComponent } from '../graph-indicator/graph-indicator.component';

@Component({
  selector: 'app-evolution-chart',
  templateUrl: './evolution-chart.component.html',
  styleUrls: ['./evolution-chart.component.scss'],
  standalone: true,
  imports: [CommonModule, TableReportComponent, HighchartsChartModule, GraphIndicatorComponent],
})
export class EvolutionChartComponent {
  @Input() withFooter = false;

  indicators = [
    {
      label: 'Far indep periferia',
      value: 60,
    },
    {
      label: 'Far indep',
      value: 7,
    },
    {
      label: 'Far oro',
      value: 20,
    },
    {
      label: 'MAyorista consum',
      value: 25,
    },
  ];
  headers = [
    {
      label: 'Canales',
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
  ];

  values = [
    {
      columns: [
        {
          value: 'Farm. Ind. Periferia',
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
          value: 'Farm. Ind. Periferia',
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
          value: 'Farm. Ind. Periferia',
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
          value: 'Farm. Ind. Periferia',
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


  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      width: 430,
      height: 160,
      spacing: [0, 0, 0, 0],
    },

    title: {
      text: '',
    },
    legend: {
      enabled: false,
    },

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
            yAxis: {
              labels: {
                enabled: false,
              },
              title: {
                text: null,
              },
            },
            xAxis: {
              labels: {
                enabled: false,
              },
            },
            subtitle: {
              text: '',
            },
            credits: {
              enabled: false,
            },
          },
        },
      ],
    },
    plotOptions: {
      series: {
        animation: false,
      },
      column: {
        colors: ['#B3B8BF', '#0050F5'],
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: 'column',
        animation: false,
        allowPointSelect: false,
        enableMouseTracking: false,
        data: [406292, 314500,406292, 314500,406292, 314500,406292, 314500,406292, 314500,406292, 14500],
      },
    ],
  };
}
