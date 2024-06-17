import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core'
import { CategoriesRequestsService } from '../../../shared/requests/categories.requests'
import { TopSku } from '../../../shared/interfaces/topSku.interface'
import { ParetoSkusParticipation } from '../../../shared/interfaces'
import { COLORS } from '../../../shared/constants/colors'
import {
  CardFilterComponent,
  CardReportComponent,
  TableReportComponent,
  DimensionGraphComponent,
  DoughnutVerticalComponent,
  ParticipationComponent,
  EvolutionLineComponent,
} from '../../components'
import { GlobalStoreService } from '../../../shared/stores/global.store'
import { tap } from 'rxjs'
import { TABLE_TOOLTIPS } from '../../../shared/constants/globals'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    CardReportComponent,
    CardFilterComponent,
    TableReportComponent,
    DimensionGraphComponent,
    DoughnutVerticalComponent,
    ParticipationComponent,
    EvolutionLineComponent,
  ],
  templateUrl: './Categories.component.html',
  styleUrl: './Categories.component.scss',
})
export class CategoriesComponent implements AfterViewInit, OnDestroy {
  service = inject(CategoriesRequestsService)
  globalStore = inject(GlobalStoreService)
  activateRoute = inject(ActivatedRoute)
  selectedCategory = null
  cards: any = []
  headers: Array<any> = []
  values: Array<any> = []
  headersCob: Array<any> = []
  valuesCob: Array<any> = []
  topSku!: TopSku
  paretoSkus!: ParetoSkusParticipation
  doughnutData: any = []
  participationData: any = []
  evolutionLabels: any[] = []
  evolutionData: any
  evolutionDataLabels: any

  ngAfterViewInit(): void {
    this.globalStore.showLoading()

    this.activateRoute.queryParamMap.subscribe((qParams: any) => {
      const { category, dateAt } = qParams.params
      if (category) {
        this.globalStore.showLoading()
        this.selectedCategory = this.doughnutData[category]
        this.getData().subscribe()
      }
    })

    this.globalStore.reloadCategories$.subscribe(() => {
      this.globalStore.showLoading()
      this.globalStore.filterCategories.update(() => null)
      this.selectedCategory = null
      this.getData().subscribe()
    })

    this.getData().subscribe()
  }

  ngOnDestroy(): void {
    this.globalStore.filterCategories.update(() => null)
  }

  getData() {
    const filterParams = {
      ...(this.selectedCategory ? { category: this.selectedCategory } : {}),
    }
    return this.service.getCategoriesReport(filterParams).pipe(
      tap((data: any) => {
        this.globalStore.hideLoading()

        this.cards = data?.cards
        this.doughnutData = data?.categoryParticipation?.doughnut
        this.evolutionData = this.fillEvolutionSeries(data?.evolutionMq)
        this.evolutionDataLabels = data?.evolutionMq.labels
        this.topSku = data?.topSku
        this.paretoSkus = data?.participationPareto
        this.participationData = data?.principalCategories

        let activeColor = false
        this.headers = data.productsTable.columns.map((data: any) => {
          if (data.columnName === 'cobmq') activeColor = true
          const tooltip = TABLE_TOOLTIPS[data.label as keyof typeof TABLE_TOOLTIPS]

          return {
            ...data,
            color: activeColor && '#00B0FF',
            tooltip,
          }
        })
        this.values = data.productsTable.values
      })
    )
  }

  fillEvolutionSeries(evolutionData: any) {
    const evolutionSeries = []
    if (evolutionData['totalMarket']) {
      evolutionSeries.push({
        type: 'areaspline',
        color: COLORS.Grey3Stroke,
        fillColor: COLORS.Grey3Fill,
        data: evolutionData['totalMarket'],
      })

      this.evolutionLabels.push({
        label: 'Total Facturación Mdo Digital',
        color: COLORS.Grey3,
      })
    }

    if (evolutionData['totalBdf']) {
      evolutionSeries.push({
        type: 'areaspline',
        color: COLORS.BlueStroke,
        fillColor: COLORS.BlueFill,
        data: evolutionData['totalBdf'],
      })

      this.evolutionLabels.push({
        label: 'Total Facturación BDF',
        color: COLORS.Blue,
      })
    }

    if (evolutionData['coverageBdf']) {
      evolutionSeries.push({
        type: 'spline',
        color: COLORS.Green2,
        data: evolutionData['coverageBdf'],
      })

      this.evolutionLabels.push({
        label: 'Cobertura BDF',
        color: COLORS.Green2,
      })
    }

    if (evolutionData['coverageMdo']) {
      evolutionSeries.push({
        type: 'spline',
        color: COLORS.Orange1,
        data: evolutionData['coverageMdo'],
      })

      this.evolutionLabels.push({
        label: 'Cobertura Mdo Digiatl',
        color: COLORS.Orange1,
      })
    }

    return evolutionSeries
  }
}
