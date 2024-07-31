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
  @Input() title: string = '% Participación Facturación por categoría'

  globalStore = inject(GlobalStoreService)
  router = inject(Router)
  activeIndex!: number
  current = this.globalStore.filterCategories()
  doughnutChart: any
  categories: any

  get isCategories() {
    return this.router.url.includes(paths.dashboard.childrens.categoriesPath)
  }

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
      this.activeIndex = index
      if (this.current !== null && this.current === index) {
        this.globalStore.reloadCategories.update(() => true)
      }
      this.router.navigate(
        [this.isCategories ? paths.dashboard.childrens.categoriesPath : paths.dashboard.childrens.competenciesPath],
        {
          queryParams: {
            ...(this.current !== index && { category: this.categories[index].label }),
          },
        }
      )
      this.globalStore.filterCategories.update(() => index)
    }
  }
}
