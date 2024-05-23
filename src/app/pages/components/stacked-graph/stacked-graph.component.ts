import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { COLORS } from '../../../shared/constants/global.constants';

@Component({
  selector: 'app-stacked-graph',
  standalone: true,
  imports: [CommonModule, CategoriesComponent, DoughnutChartComponent],
  templateUrl: './stacked-graph.component.html',
  styleUrl: './stacked-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedGraphComponent implements OnInit {
  @Input() data: any;
  
  doughnutChart: any;
  stackedChart: any;

  ngOnInit(): void {
    console.log(this.data);

    this.doughnutChart = this.data.doughnut.map((item: any, key: number) => ({
      label: item.label,
      value: item.value,
      color: COLORS[key],
    }));

    this.stackedChart = [
      {
        label: 'Sesiones MQ',
        value: `${this.data.totalSessions.value} (${this.data.totalSessions.percentage}%)`,
        color: '#0050F5',
      },
      {
        label: 'Interacción Clientes',
        value: `${this.data.clientsInteraction.value} (${this.data.clientsInteraction.percentage}%)`,
        color: '#00B0FF',
      },
      {
        label: 'Clic en categorías',
        value: `${this.data.categoryClicks.value} (${this.data.categoryClicks.percentage}%)`,
        color: '#B3B8BF',
      },
      {
        label: 'Compra',
        value: `${this.data.sales.value} (${this.data.sales.percentage}%)`,
        color: '#D9DDE3',
      },
    ];
  }

  variants = ['#D9DDE3', '#B3B8BF', '#8F959D'];
}
