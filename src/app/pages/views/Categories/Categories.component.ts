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
  selectedCategory: any = null
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
    this.activateRoute.queryParamMap.subscribe((qParams: any) => {
      const { category, dateAt } = qParams.params
      console.log('qParams', qParams, category !== undefined)
      this.globalStore.showLoading()
      if (category !== undefined) {
        this.selectedCategory = this.doughnutData[category]
        console.log(this.doughnutData );
        this.globalStore.reloadCategories.update(() => false)
        this.getData().subscribe()
      } else this.globalStore.reloadCategories.update(() => true)
    })

    this.globalStore.reloadCategories$.subscribe((state) => {
      console.log('state', state)
      if (state) {
        this.globalStore.filterCategories.update(() => null)
        this.selectedCategory = null
        this.getData().subscribe()
      }
    })
  }

  ngOnDestroy(): void {
    this.globalStore.filterCategories.update(() => null)
  }

  filter() {
    this.getData().subscribe()
  }

  getData() {
    this.globalStore.showLoading()

    const filterParams = {
      ...(this.selectedCategory ? { category: this.selectedCategory } : {}),
    }
    return this.service.getCategoriesReport(filterParams).pipe(
      tap((data: any) => {
        this.cards = data?.cards
        this.doughnutData = data?.categoryParticipation?.doughnut

        // CAMBIAR
        this.evolutionData = this.fillEvolutionSeries(
          !this.selectedCategory ? data?.evolutionMq : data?.evolutionMqFilter
        )
        this.evolutionDataLabels = !this.selectedCategory ? data?.evolutionMq.labels : data?.evolutionMqFilter.labels
        this.participationData = !this.selectedCategory ? data?.principalCategories : data?.principalCategoriesFilter
        //

        this.topSku = data?.topSku
        this.paretoSkus = data?.participationPareto

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

        this.globalStore.hideLoading()
      })
    )
  }

  fillEvolutionSeries(evolutionData: any) {
    this.evolutionLabels = []
    //
    const evolutionSeries = []
    const totalMarket = evolutionData['totalMarket']
    const totalBdf = evolutionData['totalBdf']
    const coverageBdf = evolutionData['coverageBdf']
    const coverageMdo = evolutionData['coverageMdo']

    if (totalMarket && totalMarket.length) {
      evolutionSeries.push({
        type: 'areaspline',
        color: COLORS.Grey3Stroke,
        fillColor: COLORS.Grey3Fill,
        data: totalMarket,
      })

      this.evolutionLabels.push({
        label: 'Total Facturación Mdo Digital',
        color: COLORS.Grey3,
      })
    }

    if (totalBdf && totalBdf.length) {
      evolutionSeries.push({
        type: 'areaspline',
        color: COLORS.BlueStroke,
        fillColor: COLORS.BlueFill,
        data: totalBdf,
      })

      this.evolutionLabels.push({
        label: 'Total Facturación BDF',
        color: COLORS.Blue,
      })
    }

    if (coverageBdf && coverageBdf.length) {
      evolutionSeries.push({
        type: 'spline',
        color: COLORS.Green2,
        data: coverageBdf,
      })

      this.evolutionLabels.push({
        label: 'Cobertura BDF',
        color: COLORS.Green2,
      })
    }

    if (coverageMdo && coverageMdo.length) {
      evolutionSeries.push({
        type: 'spline',
        color: COLORS.Orange1,
        data: coverageMdo,
      })

      this.evolutionLabels.push({
        label: 'Cobertura Mdo Digital',
        color: COLORS.Orange1,
      })
    }

    return evolutionSeries
  }
}
