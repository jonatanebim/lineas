import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, signal } from '@angular/core'
import Highcharts from 'highcharts'
import { HighchartsChartModule } from 'highcharts-angular'
import MapModule from 'highcharts/modules/map'
import { CommonsRequestsService } from '../../../shared/requests/commons.requests'
import { DEPARTMENTS } from '../../../shared/constants/globals'
import { Router } from '@angular/router'
import pathsConstants from '../../../shared/constants/paths'
import { COLORS } from '../../../shared/constants/colors'

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
            enabled: true,
          },
        },
        legend: {
          enabled: false,
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
              format: '{point.properties.name}',
              style: {
                fontSize: '10px',
              },
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
                      department: event.point.name,
                    },
                  })
                },
                mouseOut: function () {
                  this.series.chart.update({
                    tooltip: {
                      enabled: false,
                    },
                  })
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
      name: d.name,
      color: COLORS.Green2,
    }))
  }
}
