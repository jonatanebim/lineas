import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphIndicatorComponent } from '../graph-indicator/graph-indicator.component';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import variwide from 'highcharts/modules/variwide';
import HC_more from 'highcharts/highcharts-more';

variwide(Highcharts);
HC_more(Highcharts);
@Component({
  selector: 'app-participation',
  standalone: true,
  imports: [CommonModule, GraphIndicatorComponent, HighchartsChartModule],
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.scss'],
})
export class ParticipationComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      width: 200,
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
        data: [406292, 14500],
      },
    ],
  };
}
