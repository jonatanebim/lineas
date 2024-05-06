import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-doughnut-vertical',
  templateUrl: './doughnut-vertical.component.html',
  styleUrls: ['./doughnut-vertical.component.scss'],
  standalone: true,
  imports: [CommonModule, DoughnutChartComponent, CategoriesComponent],
})
export class DoughnutVerticalComponent {}
