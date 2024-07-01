import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { RankIndicatorComponent } from '../rank-indicator/rank-indicator.component'
import { CategoriesComponent } from '../categories/categories.component'
import { HighchartsChartModule } from 'highcharts-angular'
import * as Highcharts from 'highcharts'
import variwide from 'highcharts/modules/variwide'
import HC_more from 'highcharts/highcharts-more'
import { TopSku } from '../../../shared/interfaces/topSku.interface'
import { ParetoSkusParticipation } from '../../../shared/interfaces'
import { COLORS, DEFAULT_COLOR, DEFAULT_SKU_IMAGE } from '../../../shared/constants/globals'

variwide(Highcharts)
HC_more(Highcharts)

@Component({
  selector: 'app-dimension-graph',
  standalone: true,
  imports: [CommonModule, RankIndicatorComponent, CategoriesComponent, HighchartsChartModule],
  templateUrl: './dimension-graph.component.html',
  styleUrl: './dimension-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DimensionGraphComponent implements OnInit {
  @Input() paretoSkus!: ParetoSkusParticipation
  @Input() topSku!: TopSku
  @Input() selected!: any

  Highcharts: typeof Highcharts = Highcharts

  chartOptions!: Highcharts.Options

  ngOnInit(): void {
    this.chartOptions = {
      title: {
        text: '',
      },
      chart: {
        width: 250,
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
          states: {
            hover: {
              enabled: false,
            },
          },
          tooltip: {},

          stacking: 'stream',
        },
        packedbubble: {
          minSize: '40%',
          maxSize: '100%',
          animation: false,
          stacking: 'stream',
          tooltip: {
            format: '',
          },
          states: {
            hover: {
              enabled: false,
            },
          },
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
          enableMouseTracking: false,
          draggable: false,
          stacking: 'stream',
          marker: {
            lineWidth: 2,
            fillOpacity: 1,
          },
          data: this.paretoSkus?.categories.reduce((next: any, prev: any, index: number) => {
            if (index < 2) {
              next.push({
                value: prev.value,
                // color: index > 1 ? DEFAULT_COLOR : COLORS[index],
                color: COLORS[index],
                pointPlacement: -10,
              })
            } else {
              const item = next[3]
              if (item) {
                item.value = +prev.value
              } else {
                next.push({
                  value: prev.value,
                  // color: DEFAULT_COLOR,
                  color:  COLORS[index],
                  pointPlacement: -10,
                })
              }
            }
            return next
          }, []),
        },
      ],
    }
  }

  get paretoCategories() {
    return this.paretoSkus.categories.map((item: any, key: number) => ({
      label: item.category,
      value: item.value,
      color: COLORS[key],
    }))
  }

  get topSkuImage() {
    return this.topSku.productLogo || DEFAULT_SKU_IMAGE
  }
}
