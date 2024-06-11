import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GraphIndicatorComponent } from '../graph-indicator/graph-indicator.component'
import { HighchartsChartModule } from 'highcharts-angular'
import * as Highcharts from 'highcharts'
import variwide from 'highcharts/modules/variwide'
import HC_more from 'highcharts/highcharts-more'
import { COLORS } from '../../../shared/constants/colors'

variwide(Highcharts)
HC_more(Highcharts)
@Component({
  selector: 'app-participation',
  standalone: true,
  imports: [CommonModule, GraphIndicatorComponent, HighchartsChartModule],
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipationComponent implements AfterViewInit {
  @Input() data: any

  @ViewChild('chartContainer') chartContainer!: ElementRef<any>

  Highcharts: typeof Highcharts = Highcharts
  chartOptions!: Highcharts.Options

  onChart = signal(false)

  ngAfterViewInit(): void {
    const _selfData = this.data
    this.chartOptions = {
      chart: {
        width: this.chartContainer.nativeElement.clientWidth,
        height: 187,
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
        labels: {
          distance: 4,
          rotation: 0,
          style: {
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#8F959D',
          },
        },
        categories: this.data.map((e: any) => e.category),
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            crop: false,
          },
          enableMouseTracking: false,
        },
      },
      series: [
        {
          type: 'column',
          color: COLORS.Grey3,
          data: this.data.map((e: any) => e.columns[0]),
          dataLabels: {
            inside: false,
            enabled: true,
            y: -20,
            useHTML: true,
            formatter: function () {
              const xData = _selfData[this.point.index].columns[1]
              const yData = this.y || 0
              const translate = yData - xData > 100
              return `
              <div class="text-center" style="width: 50px;height: 100%;position: relative;${!translate && 'top: -30px;'}">
                <div class="datalabelInside" style="position: absolute; font-size:10px;color: #606469; font-weight: 400;text-shadow: 0 0 0  #fff;"">
                   S/ ${this.y}  
                </div>
              </div>
              `
            },
          },
        },
        {
          type: 'column',
          color: COLORS.Blue,
          data: this.data.map((e: any) => e.columns[1]),
          dataLabels: {
            enabled: true,
            inside: false,
            allowOverlap: true,
            useHTML: true,
            formatter: function () {
              return `
              <div class="text-center" style="width: 50px;position: relative;">
                <div class="datalabel" style="position: relative; top: 20px">
                  <p class="percentage text-center" style="text-shadow: 0 0 0  #fff;">30%</p>
                </div>
                <br/>
                <div class="datalabelInside" style="position: absolute; top: 40px; font-size:10px;color: #606469; font-weight: 400;text-shadow: 0 0 0  #fff;"">
                  S/ ${this.y} 
                </div>
              </div>
              `
            },
          },
        },
      ],
    }

    this.onChart.set(true)
  }
}
