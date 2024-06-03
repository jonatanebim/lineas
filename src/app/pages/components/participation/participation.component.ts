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
    yAxis: {
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
    },
    xAxis: {
      type: 'category',
      startOnTick: true,
      gridLineWidth: 1,
      labels: {
        distance: 4,
        rotation: 0,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#8F959D',
        },
      },
      categories: ['ENE'],
    },
    plotOptions: {
      column: {
        animation: false,
        // allowPointSelect: false,
        // pointPlacement: -0.2,
        enableMouseTracking: false,
        grouping: false,
      },
      series: {
        animation: false,
        dataLabels: {
          enabled: true,
          format: 'S/ {point.y:.0f}',
        },
      },
    },
    series: [
      {
        type: 'column',
        colors: ['#B3B8BF', '#0000'],
        data: [['2024', 14500]],
        name: '2016'
      },
      {
        type: 'column',
        colors: ['#B3B8BF', '#0000'],
        data: [['2024', 1500]],
        name: '2016'
      },
    ],
  };
}
