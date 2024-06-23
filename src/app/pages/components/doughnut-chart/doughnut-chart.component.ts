import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import Chart from 'chart.js/auto'
import { GlobalStoreService } from '../../../shared/stores/global.store'
import { EMPTY_DOUGHNUT, GREY_COLORS } from '../../../shared/constants/globals'

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class DoughnutChartComponent implements AfterViewInit {
  @Input() data: any
  @Input() withFilter: boolean = false
  @Output() selected: EventEmitter<number> = new EventEmitter()

  @ViewChild('graph') graph!: ElementRef<any>

  globalStore = inject(GlobalStoreService)

  variants = ['#DEF2FF', '#B6E7FF', '#8F959D']
  doughnutChart!: any[]

  ngAfterViewInit(): void {
    this.doughnutChart = this.data

    new Chart(this.graph.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: this.values,
            backgroundColor: this.colors,
            borderWidth: 0,
            label: '',
          },
        ],
      },
      plugins: [...(this.isEmpty ? [] : [this.customDataLabelPlugin])],
      options: {
        maintainAspectRatio: false,
        aspectRatio: 1.8,
        events: ['click'],
        plugins: {
          legend: {
            display: false,
          },
        },
        onClick: (evt, item) => {
          if (this.withFilter && item.length) {
            this.selected.emit(item[0].index)
          }
        },
      },
    })
  }

  get values() {
    return this.doughnutChart.map((i) => i.value)
  }

  get labels() {
    return this.doughnutChart.map((i) => i.label)
  }

  get isEmpty() {
    return this.labels.length === 1 && this.labels[0] === EMPTY_DOUGHNUT[0].label
  }

  get colors() {
    if (this.isEmpty) {
      return GREY_COLORS[3]
    } else {
      return this.doughnutChart.map((i, k: number) => {
        const categoryIndex = this.globalStore.filterCategories()
        if (categoryIndex != null && k !== this.globalStore.filterCategories()) {
          return GREY_COLORS[k]
        }

        return i.color
      })
    }
  }

  get customDataLabelPlugin() {
    const $this = this
    return {
      id: 'customDatalabels',
      afterDatasetsDraw(chart: any) {
        const { ctx, data } = chart
        data.datasets[0].data.forEach((dataPoint: any, index: number) => {
          const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition()
          const color = $this.colors[index]

          ctx.font = '10px "Nunito Sans", Helvetica, Arial, sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'

          if ($this.variants.find((variant: string) => variant === color)) {
            ctx.fillStyle = '#000'
          } else {
            ctx.fillStyle = '#ffff'
          }

          let dataValue = ''
          const categoryIndex = $this.globalStore.filterCategories()
          if (categoryIndex != null) {
            if (index === categoryIndex) dataValue = `${dataPoint}%`
          } else dataValue = `${dataPoint}%`

          ctx.fillText(dataValue, x, y)
        })
      },
    }
  }
}
