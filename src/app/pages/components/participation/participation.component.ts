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
            fontSize: '11px',
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
        },
      },
      series: [
        {
          type: 'column',
          color: COLORS.Grey3,
          data: this.data.map((e: any) => e.columns[0]),
        },
        {
          type: 'column',
          color: COLORS.Blue,
          data: this.data.map((e: any) => e.columns[1]),
          dataLabels: {
            enabled: true,
            allowOverlap: true,
            useHTML: true,
            formatter: function () {
              console.log(this)
              return (
                '<div class="datalabel" style="position: relative; top: 20px"><b>' +
                '<p class="percentage">30%</p>' +
                '</div><br/><div class="datalabelInside" style="position: absolute; top: 35px"><b>' +
                this.y +
                '</div>'
              )
            },
          },
        },
      ],
    }

    this.onChart.set(true)
  }
}
