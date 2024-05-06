import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardFilterComponent } from '../../components/card-filter/card-filter.component';
import { CardReportComponent } from '../../components/card-report/card-report.component';
import { DimensionGraphComponent } from '../../components/dimension-graph/dimension-graph.component';
import { TableReportComponent } from '../../components/table-report/table-report.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    CardReportComponent,
    CardFilterComponent,
    TableReportComponent,
    DimensionGraphComponent
  ],
  templateUrl: './Categories.component.html',
  styleUrl: './Categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent { }
