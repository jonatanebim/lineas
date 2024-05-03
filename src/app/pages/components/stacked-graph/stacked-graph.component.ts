import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-stacked-graph',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './stacked-graph.component.html',
  styleUrl: './stacked-graph.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedGraphComponent { }
