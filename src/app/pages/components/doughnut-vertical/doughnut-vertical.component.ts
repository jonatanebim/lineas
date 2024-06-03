import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { CategoriesComponent } from '../categories/categories.component';
import { COLORS } from '../../../shared/constants/globals';

@Component({
  selector: 'app-doughnut-vertical',
  templateUrl: './doughnut-vertical.component.html',
  styleUrls: ['./doughnut-vertical.component.scss'],
  standalone: true,
  imports: [CommonModule, DoughnutChartComponent, CategoriesComponent],
})
export class DoughnutVerticalComponent implements OnInit {
  @Input() data: any;

  doughnutChart: any;
  categories: any;

  ngOnInit(): void {
    this.categories = this.data.map(
      (item: any, key: number) => ({
        label: item.label,
        value: item.value,
        color: COLORS[key],
      })
    );
    this.doughnutChart = this.categories.slice(0, 5);
  }
}
