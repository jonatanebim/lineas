import { AfterViewInit, Component, ElementRef, Input, ViewChild, signal } from '@angular/core'
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
export class EvolutionLineComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef<any>

  @Input() labels: any
  @Input() dataLabels: any
  @Input() data: any

  Highcharts: typeof Highcharts = Highcharts
  chartOptions: Highcharts.Options = {}
  onChart = signal(false)

  ngAfterViewInit(): void {
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
            fontSize: '7px',
            fontWeight: 'bold',
            color: '#8F959D',
          },
        },
        categories: this.dataLabels,
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
      series: this.data,
    }

    this.onChart.set(true)
  }
}
