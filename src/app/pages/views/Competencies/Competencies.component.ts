import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { GlobalStoreService } from '../../../shared/stores/global.store'
import {
  CardFilterComponent,
  CardReportComponent,
  DimensionGraphComponent,
  DoughnutVerticalComponent,
  EvolutionLineComponent,
  ParticipationComponent,
  TableReportComponent,
} from '../../components'
import { tap } from 'rxjs'
import { TABLE_TOOLTIPS } from '../../../shared/constants/globals'
import { CompetenciesRequestsService } from '../../../shared/requests/competencies.requests'
import { COLORS } from '../../../shared/constants/colors'

@Component({
  selector: 'app-competencies',
  standalone: true,
  imports: [
    CommonModule,
    CardFilterComponent,
    CardReportComponent,
    DoughnutVerticalComponent,
    EvolutionLineComponent,
    ParticipationComponent,
    DimensionGraphComponent,
    TableReportComponent,
  ],
  templateUrl: './Competencies.component.html',
  styleUrl: './Competencies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetenciesComponent implements AfterViewInit {
  service = inject(CompetenciesRequestsService)
  globalStore = inject(GlobalStoreService)
  activateRoute = inject(ActivatedRoute)
  selectedCategory: any = null
  cards: any = []
  headers: Array<any> = []
  values: Array<any> = []
  headersCob: Array<any> = []
  valuesCob: Array<any> = []
  doughnutData: any = []
  participationData: any = []
  evolutionLabels: any[] = []
  evolutionData: any
  evolutionDataLabels: any

  ngAfterViewInit(): void {
    this.activateRoute.queryParamMap.subscribe((qParams: any) => {
      if (!qParams.params?.category) {
        this.globalStore.filterCategories.update(() => null)
      }

      this.selectedCategory = qParams.params?.category
      this.getData().subscribe()
    })
  }

  filter() {
    this.getData().subscribe()
  }

  getData() {
    this.globalStore.showLoading()

    const filterParams = {
      ...(this.selectedCategory ? { category: this.selectedCategory } : { category: '' }),
    }
    return this.service.getCompetenciesReport(filterParams).pipe(
      tap((data: any) => {
        this.cards = data?.cards
        if (!this.selectedCategory) {
          this.doughnutData = data?.categoryParticipation?.doughnut
        }
        console.log(data?.evolutionMq);
        this.evolutionData = this.fillEvolutionSeries(data?.evolutionMq)
        this.evolutionDataLabels = data?.evolutionMq.labels
        this.participationData = this.selectedCategory ? data?.principalCategories : data?.principalCategories?.slice(0,5)
        this.headers = data.brandCategoriesTable.columns.map((data: any) => {
          const tooltip = TABLE_TOOLTIPS[data.label as keyof typeof TABLE_TOOLTIPS]

          return {
            ...data,
            tooltip,
          }
        })
        this.values = data.brandCategoriesTable.values

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

    if (totalMarket && totalMarket.length) {
      evolutionSeries.push({
        type: 'areaspline',
        color: COLORS.Grey3Stroke,
        fillColor: COLORS.Grey3Fill,
        data: totalMarket,
        original: totalMarket,
        yAxis: 1,
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
        yAxis: 2,
      })

      this.evolutionLabels.push({
        label: 'Total Facturación BDF',
        color: COLORS.Blue,
      })
    }

    return evolutionSeries
  }
}
