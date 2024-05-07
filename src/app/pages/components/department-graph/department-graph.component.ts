import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-department-graph',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './department-graph.component.html',
  styleUrl: './department-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentGraphComponent { }
