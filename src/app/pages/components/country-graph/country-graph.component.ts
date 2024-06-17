import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, signal } from '@angular/core'
import Highcharts from 'highcharts'
import { HighchartsChartModule } from 'highcharts-angular'
import MapModule from 'highcharts/modules/map'
import { CommonsRequestsService } from '../../../shared/requests/commons.requests'
import { DEPARTMENTS } from '../../../shared/constants/globals'
import { Router } from '@angular/router'
import pathsConstants from '../../../shared/constants/paths'
import { COLORS, COLORS_ICONS } from '../../../shared/constants/colors'

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
          events: {
            click: (event: any) => {
              console.log(event.lat, event.lon)
            },
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
            console.log(color)
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
              <p>Cobertura: 172</p> 
              <p>Share cob/Total BDF: 21%</p> 
              <p>Facturación: S/ 87,122</p>
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
    return DEPARTMENTS.map((d: any) => ({
      lat: d.lat,
      lon: d.lon,
      department: d.name,
      color: COLORS.Green2,
    }))
  }
}
