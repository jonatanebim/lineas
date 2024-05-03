import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-department-graph',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './department-graph.component.html',
  styleUrl: './department-graph.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentGraphComponent { }
