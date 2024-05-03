import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RankIndicatorComponent } from '../rank-indicator/rank-indicator.component';

@Component({
  selector: 'app-dimension-graph',
  standalone: true,
  imports: [CommonModule, RankIndicatorComponent],
  templateUrl: './dimension-graph.component.html',
  styleUrl: './dimension-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DimensionGraphComponent {}
