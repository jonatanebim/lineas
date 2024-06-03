import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, inject } from '@angular/core'
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
export class CategoriesComponent implements AfterViewInit {
  service = inject(CategoriesRequestsService)
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
    this.service.getCategoriesReport().subscribe((data: any) => {
      this.cards = data?.cards
      this.doughnutData = data?.categoryParticipation?.doughnut
      this.evolutionData = this.fillEvolutionSeries(data?.evolutionMq)
      this.evolutionDataLabels = data?.evolutionMq.labels
      this.topSku = data?.topSKu
      this.paretoSkus = data?.participationPareto
      this.participationData = data?.principalCategories

      let activeColor = false
      this.headers = data.productsTable.columns.map((data: any) => {
        if (data.columnName === 'cobmq') activeColor = true
        return {
          ...data,
          color: activeColor && '#00B0FF',
        }
      })
      this.values = data.productsTable.values
    })
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
