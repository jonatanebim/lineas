import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { CategoriesComponent } from '../categories/categories.component'
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component'
import { COLORS } from '../../../shared/constants/globals'

@Component({
  selector: 'app-stacked-graph',
  standalone: true,
  imports: [CommonModule, CategoriesComponent, DoughnutChartComponent],
  templateUrl: './stacked-graph.component.html',
  styleUrl: './stacked-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedGraphComponent implements OnInit {
  @Input() data: any

  doughnutChart: any

  ngOnInit(): void {
    this.doughnutChart = this.data.doughnut.map((item: any, key: number) => ({
      label: item.label,
      value: item.percentage,
      color: COLORS[key],
    }))
  }
}
