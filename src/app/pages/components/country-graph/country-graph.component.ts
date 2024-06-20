import { CommonModule } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  inject,
  signal,
} from '@angular/core'
import Highcharts from 'highcharts'
import { HighchartsChartModule } from 'highcharts-angular'
import MapModule from 'highcharts/modules/map'
import { CommonsRequestsService } from '../../../shared/requests/commons.requests'
import { DEPARTMENTS } from '../../../shared/constants/globals'
import { Router } from '@angular/router'
import pathsConstants from '../../../shared/constants/paths'
import { COLORS, COLORS_DOTS, COLORS_ICONS } from '../../../shared/constants/colors'

MapModule(Highcharts)

@Component({
  selector: 'app-country-graph',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './country-graph.component.html',
  styleUrl: './country-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryGraphComponent implements AfterViewInit {
  @Input() data: any

  @ViewChild('chartContainer') chartContainer!: ElementRef<any>
  commonService = inject(CommonsRequestsService)

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.commonService.getMapVector().subscribe((data: any) => {
      Highcharts.mapChart(this.chartContainer.nativeElement, {
        chart: {
          zooming: {
            mouseWheel: false,
            singleTouch: false,
          },
        },
        title: {
          text: '',
        },
        mapView: {},
        mapNavigation: {
          enabled: true,
          enableButtons: false,
        },
        xAxis: {
          labels: {
            enabled: false,
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          useHTML: true,
          backgroundColor: '#000000ab',
          borderWidth: 0,
          shadow: false,
          formatter: function () {
            const color = this.point.color
            const current: any = this.point
            const department: string = (this.point as any).department as string
            return `
            <div class="float-tooltip">
              <h2>${department} <img src="${
              color === COLORS.Green2
                ? COLORS_ICONS['green']
                : color === COLORS.Orange1
                ? COLORS_ICONS['orange']
                : COLORS_ICONS['red']
            }" alt="" /> </h2>
              <p>Cobertura: ${current.original.coverage}</p> 
              <p>Share cob/Total BDF:  ${current.original.bdf}</p> 
              <p>Facturación:  ${current.original.billing}</p>
            </div>
            `
          },
        },
        plotOptions: {
          mappoint: {},
          map: {
            showInLegend: false,
          },
        },
        series: [
          {
            type: 'map',
            data: [],
            dataLabels: {
              enabled: false,
            },
            mapData: data,
          },
          {
            type: 'mappoint',
            data: this.mapDataPoints,
            point: {
              events: {
                click: (event: any) => {
                  this.router.navigate([`/dashboard/${pathsConstants.dashboard.childrens.regions}`], {
                    queryParams: {
                      department: event.point.department,
                    },
                  })
                },
                mouseOut: function () {
                  this.series.chart.update({})
                },
              },
            },
          },
        ],
      })
    })
  }

  get mapDataPoints() {
    return this.data.map((d: any) => {
      const department = DEPARTMENTS.find((f) => f.name.toUpperCase() === d.label)
      const color: any = COLORS_DOTS
      return {
        lat: department?.lat,
        lon: department?.lon,
        department: department?.name,
        color: color[d.opportunity],
        original: d,
      }
    })
  }
}
