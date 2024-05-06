import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RankIndicatorComponent } from '../rank-indicator/rank-indicator.component';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-dimension-graph',
  standalone: true,
  imports: [CommonModule, RankIndicatorComponent, CategoriesComponent],
  templateUrl: './dimension-graph.component.html',
  styleUrl: './dimension-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DimensionGraphComponent {}
