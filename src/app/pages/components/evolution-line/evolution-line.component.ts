import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphIndicatorComponent } from '../graph-indicator/graph-indicator.component';
import * as Highcharts from 'highcharts';
import variwide from 'highcharts/modules/variwide';
import HC_more from 'highcharts/highcharts-more';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-evolution-line',
  standalone: true,
  imports: [CommonModule, GraphIndicatorComponent, HighchartsChartModule],
  templateUrl: './evolution-line.component.html',
  styleUrls: ['./evolution-line.component.scss'],
})
export class EvolutionLineComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef<any>;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  onChart = signal(false);

  ngAfterViewInit(): void {
    console.log(this.chartContainer.nativeElement.clientWidth);

    this.chartOptions = {
      chart: {
        width: this.chartContainer.nativeElement.clientWidth,
        height: 200,
        spacing: [0, 0, 0, 0],
      },

      title: {
        text: '',
      },
      legend: {
        enabled: false,
      },

      yAxis: {
        visible: false,
        enabled: false,
        startOnTick: true,
      },
      xAxis: {
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
        categories: [
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
        ],
      },
      plotOptions: {
        series: {
          enableMouseTracking: false,
          lineWidth: 1,
          pointStart: 0,
          marker: {
            enabled: false,
          },
          pointPlacement: 'on',
          stickyTracking: true,
        },
        line: {
          allowPointSelect: false,
          enableMouseTracking: false,
        },
      },
      series: [
        {
          type: 'areaspline',
          color: '#93B6FF',
          fillColor: '#ddf4ff9c',
          fillOpacity: 3,
          data: [0, 300, 500, 300, 600, 400, 400, 300, 500, 300, 600, 400],
        },
        {
          type: 'areaspline',
          color: '#D9DDE3',
          fillColor: '#e9ecf254',
          fillOpacity: 3,
          data: [0, 200, 300, 400, 200, 100, 300, 200, 300, 400, 200, 100],
        },
        {
          type: 'spline',
          color: '#FC9700',
          data: [0, 500, 650, 560, 620, 570, 600, 500, 650, 560, 620, 570],
        },
        {
          type: 'spline',
          color: '#43B748',
          data: [0, 620, 480, 570, 630, 500, 550, 620, 480, 570, 630, 500],
        },
      ],
    };

    setTimeout(() => {
      this.onChart.set(true);
    }, 1500);
  }
}
