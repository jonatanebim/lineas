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
    plotOptions: {
      series: {
        animation: false,
      },
      packedbubble: {
        minSize: "30%",
        maxSize: "80%",
        animation: false,
        tooltip: {
          
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}%',
          style: {
            color: 'black',
            textOutline: 'none',
            fontWeight: 'normal',
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
        data: [
          {
            name: 'India',
            value: 2341.9,
          },
          {
            name: 'Russia',
            value: 1766.4,
          },
          {
            name: 'Iran',
            value: 618.2,
          },
          {
            name: 'Korea',
            value: 610.1,
          },
        ],
      },
    ],
  };
}
