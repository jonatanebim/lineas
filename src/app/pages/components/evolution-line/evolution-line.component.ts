import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GraphIndicatorComponent } from '../graph-indicator/graph-indicator.component'
import * as Highcharts from 'highcharts'
import { HighchartsChartModule } from 'highcharts-angular'

@Component({
  selector: 'app-evolution-line',
  standalone: true,
  imports: [CommonModule, GraphIndicatorComponent, HighchartsChartModule],
  templateUrl: './evolution-line.component.html',
  styleUrls: ['./evolution-line.component.scss'],
})
export class EvolutionLineComponent implements OnInit {
  @ViewChild('chartContainerLine') chartContainer!: ElementRef<any>

  @Input() title: string = 'Evolutivo MQ'
  @Input() withoutFilter!: boolean
  @Input() selected: any
  @Input() labels: any
  @Input() dataLabels: any
  @Input() data: any

  Highcharts: typeof Highcharts = Highcharts
  chartOptions: Highcharts.Options = {}
  onChart = signal(false)

  ngOnInit(): void {
    const _selfData = this
    this.onChart.set(false)

    setTimeout(() => {
      this.chartOptions = {
        chart: {
          width: this.chartContainer?.nativeElement.clientWidth,
          height: this.chartContainer?.nativeElement.clientHeight,
          spacing: [0, 0, 0, 0],
        },
        title: {
          text: '',
        },
        legend: {
          enabled: false,
        },
        yAxis: [
          {
            gridLineWidth: 0,
            title: {
              text: '',
            },
            top: 0,
            labels: {
              format: '',
              enabled: false,
            },
          },
          {
            labels: {
              format: '',
              enabled: false,
            },
            title: {
              text: '',
            },
          },
          {
            gridLineWidth: 0,
            title: {
              text: '',
            },
            labels: {
              format: '',
              enabled: false,
            },
          },
          {
            gridLineWidth: 0,
            title: {
              text: '',
            },
            labels: {
              format: '',
              enabled: false,
            },
          },
        ],
        xAxis: {
          startOnTick: true,
          gridLineWidth: 1,
          labels: {
            distance: 4,
            rotation: 0,
            style: {
              fontSize: '7px',
              fontWeight: 'bold',
              color: '#8F959D',
            },
          },
          categories: this.dataLabels,
        },
        tooltip: {
          useHTML: true,
          backgroundColor: '#000000ab',
          borderWidth: 0,
          shadow: false,
          formatter: function () {
            const e = _selfData.getLabel(this.x)
            return !_selfData?.selected && _selfData.withoutFilter
              ? `
            <div class="float-tooltip">
              <h2>${this.x}</h2>
              <p>Facturación Mdo Digital: <span>S/ ${e.mdo}</span></p>
              <p>Categoría top: <span>Jabón/Gel de manos</span></p>
            </div>
            `
              : `
            <div class="float-tooltip">
              <h2>${this.x}</h2>
              <p>Facturación Mdo: <span>S/ ${e.mdo}</span></p>
              <p>Cobertura Mdo: <span>Jabón/Gel de manos</span></p>
              <p>Nro de pedidos: <span>1,891</span></p>
            </div>
            `
          },
        },
        plotOptions: {
          series: {
            enableMouseTracking: true,
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
          },
        },
        series: this.data,
      }
      this.onChart.set(true)
    }, 1000)
  }

  getLabel(key: any) {
    const item = this.dataLabels.map((f: any, k: number) => (f == key ? k : null)).filter((f: any) => f !== null)[0]

    return this.selected && !this.withoutFilter
      ? {
          mdo: this.data[0].data[item],
          coverage: this.data[2].data[item],
          sales: this.data[3].data[item],
        }
      : {
          mdo: this.data[0].data[item],
          category: this.data[1].data[item],
        }
  }
}
