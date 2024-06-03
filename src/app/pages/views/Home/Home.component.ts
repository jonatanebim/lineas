import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, inject } from '@angular/core'
import { HomeRequestsService } from '../../../shared/requests/home.requests'
import {
  CardReportComponent,
  CardFilterComponent,
  TableReportComponent,
  DimensionGraphComponent,
  CountryGraphComponent,
  EvolutionChartComponent,
  StackedGraphComponent,
  FunnelGraphComponent,
} from '../../components'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardReportComponent,
    CardFilterComponent,
    TableReportComponent,
    DimensionGraphComponent,
    CountryGraphComponent,
    EvolutionChartComponent,
    StackedGraphComponent,
    FunnelGraphComponent,
  ],
  providers: [HomeRequestsService],
  templateUrl: './Home.component.html',
  styleUrl: './Home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  service = inject(HomeRequestsService)
  cards: any = []
  participation: any
  evolution: any
  categories: Array<string> = []
  series: Array<any> = []
  headers: Array<any> = []
  values: Array<any> = []
  tableIndicators: any = [
    {
      columnName: 'oportunity',
      type: 'status',
    },
    {
      columnName: 'competitiveBrands',
      type: 'badge',
    },
    {
      columnName: 'paretoBrands',
      type: 'badge',
    },
    {
      columnName: 'pareto',
      type: 'badge',
    },
  ]

  ngAfterViewInit(): void {
    this.service.getHomeReport().subscribe((data: any) => {
      this.cards = data?.cards
      this.participation = data?.categoryParticipation
      this.evolution = data?.evolutionMq
      this.categories = data.evolutionMq?.labels
      this.series = [
        {
          type: 'column',
          allowPointSelect: false,
          enableMouseTracking: false,
          pointWidth: 38,
          color: '#B6E7FF',
          data: data.evolutionMq?.columns,
        },
        {
          type: 'spline',
          dashStyle: 'Dot',
          color: '#0D3B9B',
          data: data.evolutionMq?.sales,
          yAxis: 2,
        },
        {
          type: 'spline',
          color: '#00B0FF',
          data: data.evolutionMq?.coverage,
          yAxis: 1,
        },
      ]

      this.headers = data.categoriesTable.columns
      this.values = data.categoriesTable.values
    })
  }
}
