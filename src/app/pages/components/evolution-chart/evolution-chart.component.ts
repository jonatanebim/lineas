import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  signal,
} from '@angular/core';
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
  imports: [
    CommonModule,
    TableReportComponent,
    HighchartsChartModule,
    GraphIndicatorComponent,
  ],
})
export class EvolutionChartComponent implements AfterViewInit {
  @Input() withFooter = false;
  @Input() categories: any = null;
  @Input() series: any = [];
  @ViewChild('chartContainer') chartContainer!: ElementRef<any>;

  onChart = signal(false);
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
  chartOptions: Highcharts.Options = {};

  ngAfterViewInit(): void {
    this.chartOptions = {
      chart: {
        width: this.chartContainer.nativeElement.clientWidth,
        height: this.chartContainer.nativeElement.clientHeight,
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
      xAxis: {
        offset: 0,
        labels: {
          rotation: 0,
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#8F959D',
          },
        },
        categories: this.categories,
      },
      plotOptions: {
        series: {
          enableMouseTracking: false,
          marker: {
            enabled: false,
          },
        },
        column: {
          colors: ['#B3B8BF', '#0050F5'],
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: this.series,
    };
    setTimeout(() => {
      this.onChart.set(true);
    }, 1500);
  }
}
