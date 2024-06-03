import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, inject } from '@angular/core'
import { RegionRequestsService } from '../../../shared/requests/region.requests'
import { ActivatedRoute } from '@angular/router'
import { DEPARTMENTS } from '../../../shared/constants/globals'
import {
  CardFilterComponent,
  CardReportComponent,
  EvolutionChartComponent,
  DoughnutVerticalComponent,
  TableReportComponent,
  DepartmentGraphComponent,
  DoughnutChartComponent,
} from '../../components'

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
    this.route.queryParamMap.subscribe((params: any) => {
      this.department = DEPARTMENTS.find((department: any) => department.name === params?.params.department)
      this.service.getRegionReport(this.department?.name).subscribe((data: any) => {
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

        this.categoriesTable.headers = this.transformColumns(data?.categoriesTable.columns)
        this.categoriesTable.values = data?.categoriesTable.values

        this.channelsTable.headers = this.transformColumns(data?.channelsTable.columns)
        this.channelsTable.values = data?.channelsTable.values

        this.provincesTable.headers = this.transformColumns(data?.provincesTable.columns)

        this.provincesTable.values = data?.provincesTable.values
        this.doughnutData = data?.categoryParticipation?.doughnut
        this.cards = data?.cards
      })
    })
  }

  transformColumns(columns: Array<any>) {
    let activeColor = false
    return columns.map((data: any) => {
      if (data.columnName === 'cobmq') activeColor = true
      return {
        ...data,
        color: activeColor && '#00B0FF',
      }
    })
  }
}
