import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component'
import { CategoriesComponent } from '../categories/categories.component'
import { COLORS, GREY_COLORS } from '../../../shared/constants/globals'
import { GlobalStoreService } from '../../../shared/stores/global.store'
import { Router } from '@angular/router'
import paths from '../../../shared/constants/paths'

@Component({
  selector: 'app-doughnut-vertical',
  templateUrl: './doughnut-vertical.component.html',
  styleUrls: ['./doughnut-vertical.component.scss'],
  standalone: true,
  imports: [CommonModule, DoughnutChartComponent, CategoriesComponent],
})
export class DoughnutVerticalComponent implements OnInit {
  @Input() data: any
  @Input() withFilter: boolean = false

  globalStore = inject(GlobalStoreService)
  router = inject(Router)
  current = this.globalStore.filterCategories()
  doughnutChart: any
  categories: any

  ngOnInit(): void {
    this.categories = this.data.map((item: any, key: number) => ({
      label: item.label,
      value: item.value,
      color: this.current !== null && this.current !== key ? GREY_COLORS[key] : COLORS[key],
    }))
    this.doughnutChart = this.categories.slice(0, 5)
  }

  onSelected(index: number) {
    if (this.withFilter) {
      if (this.current !== null && this.current === index) {
        this.globalStore.reloadCategories.update(() => true)
      }
      this.router.navigate([paths.dashboard.childrens.categoriesPath], {
        queryParams: {
          ...(this.current !== index && { category: index }),
        },
      })
      this.globalStore.filterCategories.update(() => index)
    }
  }
}
