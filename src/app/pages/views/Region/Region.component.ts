import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, effect, inject } from '@angular/core'
import { RegionRequestsService } from '../../../shared/requests/region.requests'
import { ActivatedRoute } from '@angular/router'
import { DEPARTMENTS, TABLE_TOOLTIPS } from '../../../shared/constants/globals'
import {
  CardFilterComponent,
  CardReportComponent,
  EvolutionChartComponent,
  DoughnutVerticalComponent,
  TableReportComponent,
  DepartmentGraphComponent,
  DoughnutChartComponent,
} from '../../components'
import { tap } from 'rxjs'
import { GlobalStoreService } from '../../../shared/stores/global.store'

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [
    CommonModule,
    CardFilterComponent,
    DepartmentGraphComponent,
    CardReportComponent,
    EvolutionChartComponent,
    DoughnutChartComponent,
    DoughnutVerticalComponent,
    EvolutionChartComponent,
    TableReportComponent,
  ],
  templateUrl: './Region.component.html',
  styleUrl: './Region.component.scss',
})
export class RegionComponent implements AfterViewInit {
  service = inject(RegionRequestsService)
  globalStore = inject(GlobalStoreService)
  cards: any = []
  categories: Array<string> = []
  series: Array<any> = []
  doughnutData: any = []
  tableIndicators = []
  department: any
  provincesTable: any = {
    headers: [],
    values: [],
    tableIndicators: this.tableIndicators,
  }
  channelsTable: any = {
    headers: [],
    values: [],
    tableIndicators: this.tableIndicators,
  }
  categoriesTable: any = {
    headers: [],
    values: [],
    tableIndicators: this.tableIndicators,
  }

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.globalStore.showLoading()

    this.route.queryParamMap.subscribe((params: any) => {
      const selected = params?.params.department
      if (selected) {
        this.department = DEPARTMENTS.find((department: any) => department.name === selected)
        this.getData().subscribe()
      }
    })

    this.globalStore.reloadRegions$.subscribe(() => {
      this.globalStore.showLoading()
      this.getData().subscribe()
    })
  }

  getData() {
    return this.service.getRegionReport(this.department?.name).pipe(
      tap((data: any) => {
        console.log(data)
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

        this.categoriesTable.headers = this.transformColumns(data?.categoriesTable.columns)
        this.categoriesTable.values = data?.categoriesTable.values

        this.channelsTable.headers = this.transformColumns(data?.channelsTable.columns)
        this.channelsTable.values = data?.channelsTable.values

        this.provincesTable.headers = this.transformColumns(data?.provincesTable.columns)

        this.provincesTable.values = data?.provincesTable.values
        this.doughnutData = data?.categoryParticipation?.doughnuts
        this.cards = data?.cards

        this.globalStore.hideLoading()
      })
    )
  }

  transformColumns(columns: Array<any>) {
    let activeColor = false
    return columns.map((data: any) => {
      if (data.columnName === 'cobmq') activeColor = true

      const tooltip = TABLE_TOOLTIPS[data.label as keyof typeof TABLE_TOOLTIPS]

      return {
        ...data,
        color: activeColor && '#00B0FF',
        tooltip,
      }
    })
  }
}
