import { AfterViewInit, Component, ElementRef, Input, ViewChild, inject, signal } from '@angular/core'
import { CommonModule, CurrencyPipe } from '@angular/common'
import { TableReportComponent } from '../table-report/table-report.component'
import { HighchartsChartModule } from 'highcharts-angular'
import * as Highcharts from 'highcharts'
import { GraphIndicatorComponent } from '../graph-indicator/graph-indicator.component'

@Component({
  selector: 'app-evolution-chart',
  templateUrl: './evolution-chart.component.html',
  styleUrls: ['./evolution-chart.component.scss'],
  standalone: true,
  imports: [CommonModule, TableReportComponent, HighchartsChartModule, GraphIndicatorComponent],
  providers: [CurrencyPipe]
})
export class EvolutionChartComponent implements AfterViewInit {
  @Input() withFooter = false
  @Input() withTopLabels = true
  @Input() categories: any = null
  @Input() series: any = []

  @ViewChild('chartContainer') chartContainer!: ElementRef<any>

  onChart = signal(false)
  indicators: any[] = []
  headers: any[] = []
  values: any[] = []
  cp = inject(CurrencyPipe)

  Highcharts: typeof Highcharts = Highcharts
  chartOptions: Highcharts.Options = {}

  ngAfterViewInit(): void {
    let _self = this;
    this.chartOptions = {
      chart: {
        width: this.chartContainer.nativeElement.clientWidth,
        height: this.chartContainer.nativeElement.clientHeight - 10,
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
          distance: 8,
          rotation: 0,
          style: {
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#8F959D',
          },
        },
        categories: this.categories,
      },
      yAxis: [
        {
          gridLineWidth: 0,
          height: '20%',
          top: '10%',
          title: {
            text: '',
          },
          labels: {
            format: '',
            enabled: false,
          },
          opposite: true,
        },
        {
          labels: {
            format: '',
            enabled: false,
          },
          title: {
            text: '',
          },
          top: '20%',
          height: '80%',
        },
        {
          gridLineWidth: 0,
          height: '20%',
          title: {
            text: '',
          },
          labels: {
            format: '',
            enabled: false,
          },
          opposite: true,
        },
      ],
      plotOptions: {
        series: {
          marker: {
            enabled: false,
          },
        },
        column: {
          tooltip: {},
          dataLabels: {
            // enabled: false,
          },
        },
      },
      series: this.series,
      tooltip: {
        useHTML: true,
        backgroundColor: 'none',
        distance: 1,
        followPointer: false,
        formatter: function () {
          const color = this.point.color
          const cValue = _self.cp.transform(color  === '#B6E7FF' ? this.y : 0, 'S/', 'symbol', '1.2-2');
          return `
          <div class="float-tooltip rounded"
            style="padding: 2px 5px; background: ${color === '#B6E7FF' ? '#000' : color}">
            <p class="m-0" style="font-size:11px; color:#fff">${color === '#B6E7FF' ? cValue : this.y}</p>
          </div>
          `
        },
      },
    }

    this.onChart.set(true)
  }
}
