import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CardFilterComponent } from '../../components/card-filter/card-filter.component';
import { CardReportComponent } from '../../components/card-report/card-report.component';
import { DimensionGraphComponent } from '../../components/dimension-graph/dimension-graph.component';
import { TableReportComponent } from '../../components/table-report/table-report.component';
import { DoughnutVerticalComponent } from '../../components/doughnut-vertical/doughnut-vertical.component';
import { ParticipationComponent } from '../../components/participation/participation.component';
import { EvolutionLineComponent } from '../../components/evolution-line/evolution-line.component';
import { CategoriesRequestsService } from '../../../shared/requests/categories.requests';
import { TopSku } from '../../../shared/interfaces/topSku.interface';
import { ParetoSkusParticipation } from '../../../shared/interfaces';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements AfterViewInit {
  service = inject(CategoriesRequestsService);
  cards: any = signal([]);
  headers: Array<any> = [];
  values: Array<any> = [];
  headersCob: Array<any> = [];
  valuesCob: Array<any> = [];
  topSku!: TopSku;
  paretoSkus!: ParetoSkusParticipation;
  doughnutData: any = signal([]);

  ngAfterViewInit(): void {
    this.service.getCategoriesReport().subscribe((data: any) => {
      this.cards.update(() => data?.cards);
      this.doughnutData.update(() => data?.categoryParticipation?.doughnut);

      this.topSku = data?.topSKu;
      this.paretoSkus = data?.participationPareto;
      
      let activeColor = false;
      this.headers = data.productsTable.columns.map((data: any) => {
        if (data.columnName === 'cobmq') activeColor = true;
        return {
          ...data,
          color: activeColor && '#00B0FF',
        };
      });
      this.values = data.productsTable.values;
    });
  }
}
