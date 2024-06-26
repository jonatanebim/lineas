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
import { GlobalStoreService } from '../../../shared/stores/global.store'
import { tap } from 'rxjs'
import { FilterStoreService } from '../../../shared/stores/filter.store'
import { FilterQuery } from '../../../shared/interfaces'

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
  globalStore = inject(GlobalStoreService)
  filterStore = inject(FilterStoreService)
  cards: any = []
  participation: any
  evolution: any
  regionOportunity: Array<any> = []
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
    this.filterStore.queryParms$.subscribe((data: FilterQuery) => {
      if (data.untilToday) {
        this.globalStore.showLoading()
        this.getData().subscribe()
      }
    })

    this.getData().subscribe()
  }

  filter() {
    this.getData().subscribe()
  }

  getData() {
    this.globalStore.showLoading()

    // Mover al  RESET STORE
    this.participation =null

    return this.service.getHomeReport().pipe(
      tap((data: any) => {
        this.cards = data?.cards
        this.participation = data?.categoryParticipation

        this.evolution = data?.evolutionMq
        this.regionOportunity = data?.regionOportunity
        this.categories = data.evolutionMq?.labels
        this.series = [
          {
            type: 'column',
            pointWidth: 38,
            color: '#B6E7FF',
            data: data.evolutionMq?.columns,
            yAxis: 1,
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
          },
        ]

        this.headers = data.categoriesTable.columns
        this.values = data.categoriesTable.values

        this.globalStore.hideLoading()
      })
    )
  }
}
