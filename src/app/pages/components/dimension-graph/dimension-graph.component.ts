import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { RankIndicatorComponent } from '../rank-indicator/rank-indicator.component';
import { CategoriesComponent } from '../categories/categories.component';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import variwide from 'highcharts/modules/variwide';
import HC_more from 'highcharts/highcharts-more';

variwide(Highcharts);
HC_more(Highcharts);

@Component({
  selector: 'app-dimension-graph',
  standalone: true,
  imports: [
    CommonModule,
    RankIndicatorComponent,
    CategoriesComponent,
    HighchartsChartModule,
  ],
  templateUrl: './dimension-graph.component.html',
  styleUrl: './dimension-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DimensionGraphComponent {
  title = 'myHighchart';

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      width: 200,
      height: 200,
      spacing: [0, 0, 0, 0],
    },
    xAxis: {
      visible: false,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        pointPlacement: -10,
        animation: false,
        label: {
          enabled: false,
        },
        stacking: 'stream',
      },
      packedbubble: {
        minSize: '40%',
        maxSize: '100%',
        animation: false,
        stacking: 'stream',

        tooltip: {},
        dataLabels: {
          enabled: true,
          format: '{point.value}%',
          style: {
            color: '#fff',
            textOutline: 'none',
            fontWeight: '800',
            fontSize: '15px',
          },
        },
      },
    },
    series: [
      {
        type: 'packedbubble',
        animation: false,
        allowPointSelect: false,
        draggable: false,
        stacking: 'stream',
        marker: {
          lineWidth: 2,
          fillOpacity: 1,
        },
        data: [
          {
            name: 'India',
            value: 70,
            color: '#0050F5',
            fillColor: '#D9DDE3',
            pointPlacement: -10,
          },
          {
            name: 'Russia',
            value: 25,
            color: '#8F959D',
            fillColor: '#D9DDE3',
            pointPlacement: -10,
          },
          {
            name: 'Iran',
            value: 5,
            color: '#B3B8BF',
            fillColor: '#D9DDE3',
            pointPlacement: -10,
          },
          {
            name: 'Korea',
            value: 0,
            color: '#D9DDE3',
            fillColor: '#D9DDE3',
            pointPlacement: -10,
          },
        ],
      },
    ],
  };
}
