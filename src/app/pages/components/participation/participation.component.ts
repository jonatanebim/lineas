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
  @Input() title!: string
  @Input() selected!: any

  @ViewChild('chartContainer') chartContainer!: ElementRef<any>

  Highcharts: typeof Highcharts = Highcharts
  chartOptions!: Highcharts.Options
  onChart = signal(false)

  get graphData() {
    return this.data
  }

  ngAfterViewInit(): void {
    const _selfData = this.graphData
    this.chartOptions = {
      chart: {
        width: this.chartContainer.nativeElement.clientWidth,
        height: 187,
        spacing: [20, 0, 0, 0],
      },
      title: {
        text: '',
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        opposite: true,
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
          rotation: 0,
          style: {
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#8F959D',
          },
        },
        categories: _selfData.map((e: any) => e.category),
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
    }

    if (this.data.length > 1) {
      this.chartOptions.series = [
        {
          type: 'column',
          color: COLORS.Grey3,
          data: _selfData.map((e: any) => e.columns[0]),
          dataLabels: {
            inside: false,
            enabled: true,
            zIndex: 6,
            y: -20,
            useHTML: true,
            formatter: function () {
              const xData = _selfData[this.point.index].columns[1]
              const yData = this.y || 0
              const translate = yData - xData > 100
              return `
              <div class="text-center" style="width: 50px;height: 100%;position: relative;${
                !translate && 'top: -30px;'
              }">
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
          data: _selfData.map((e: any) => e.columns[1]),
          dataLabels: {
            enabled: true,
            inside: false,
            overflow: 'allow',
            allowOverlap: true,
            useHTML: true,
            formatter: function () {
              return `
              <div class="text-center" style="width: 50px;position: relative;">
                <div class="datalabel" style="position: relative; top: 20px">
                  <p class="percentage text-center" style="font-size: 12px;text-shadow: 0 0 0  #fff;">${
                    _selfData.find((i: any) => i.category === this.key)?.totalPercentage
                  }%</p>
                </div>
                <br/>
                <div class="datalabelInside" style="position: absolute; width: 100%; top: 40px; font-size:10px;color: #606469; font-weight: 400;text-shadow: 0 0 0  #fff;"">
                  S/ ${this.y} 
                </div>
              </div>
              `
            },
          },
        },
      ]
    } else {
      this.chartOptions.series = [
        {
          type: 'column',
          color: COLORS.Grey3,
          data: _selfData.map((e: any) => e.columns[0]),
          dataLabels: {
            inside: false,
            enabled: true,
            y: -20,
            x: -10,
            useHTML: true,
            formatter: function () {
              return `
              <div class="text-center" style="width: 50px;height: 100%;position: relative;">
                <div class="datalabelInside" style="position: relative;width: 100%;font-size: 12px;color: rgb(96, 100, 105);font-weight: 400;text-shadow: rgb(255, 255, 255) 0px 0px 0px;">
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
          data: _selfData.map((e: any) => e.columns[1]),
          dataLabels: {
            enabled: true,
            inside: false,
            allowOverlap: true,
            useHTML: true,
            x: -10,
            formatter: function () {
              return `
              <div class="text-center" style="width: 50px;left: 13px;position: relative">
                <div class="datalabel" style="position: relative;">
                  <p class="percentage text-center" style="text-shadow: 0 0 0  #fff;margin: 0;">${
                    _selfData.find((i: any) => i.category === this.key)?.totalPercentage
                  }%</p>
                </div>
                <div class="datalabelInside" style="font-size: 12px;color: rgb(96, 100, 105);font-weight: 400;text-shadow: rgb(255, 255, 255) 0px 0px 0px;position: relative;top: -5px;">
                  S/ ${this.y} 
                </div>
              </div>
              `
            },
          },
        },
      ]
    }

    setTimeout(() => {
      this.onChart.set(true)
    }, 500)
  }
}
