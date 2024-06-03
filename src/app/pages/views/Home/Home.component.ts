import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CardReportComponent } from '../../components/card-report/card-report.component';
import { CardFilterComponent } from '../../components/card-filter/card-filter.component';
import { TableReportComponent } from '../../components/table-report/table-report.component';
import { DimensionGraphComponent } from '../../components/dimension-graph/dimension-graph.component';
import { CountryGraphComponent } from '../../components/country-graph/country-graph.component';
import { EvolutionChartComponent } from '../../components/evolution-chart/evolution-chart.component';
import { StackedGraphComponent } from '../../components/stacked-graph/stacked-graph.component';
import { HomeRequestsService } from '../../../shared/requests/home.requests';
import { Observable } from 'rxjs';
import { FunnelGraphComponent } from '../../components/funnel-graph/funnel-graph.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  service = inject(HomeRequestsService);
  cards: any = signal([]);
  participation: any = signal(null);
  evolution: any = signal(null);
  categories: Array<string> = [];
  series: Array<any> = [];
  headers: Array<any> = [];
  values: Array<any> = [];
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
  ];

  ngAfterViewInit(): void {
    this.service.getHomeReport().subscribe((data: any) => {
      this.cards.update(() => data?.cards);
      this.participation.update(() => data?.categoryParticipation);
      this.evolution.update(() => data?.evolutionMq);
      this.categories = data.evolutionMq?.labels;
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
      ];

      this.headers = data.categoriesTable.columns;
      this.values = data.categoriesTable.values;
    });
  }
}
