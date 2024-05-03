import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardReportComponent } from '../../components/card-report/card-report.component';
import { CardFilterComponent } from '../../components/card-filter/card-filter.component';
import { TableReportComponent } from '../../components/table-report/table-report.component';
import { DimensionGraphComponent } from '../../components/dimension-graph/dimension-graph.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardReportComponent,
    CardFilterComponent,
    TableReportComponent,
    DimensionGraphComponent
  ],
  templateUrl: './Home.component.html',
  styleUrl: './Home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
