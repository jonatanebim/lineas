import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';

@Component({
  selector: 'app-stacked-graph',
  standalone: true,
  imports: [CommonModule, CategoriesComponent, DoughnutChartComponent],
  templateUrl: './stacked-graph.component.html',
  styleUrl: './stacked-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedGraphComponent {
  variants = ['#D9DDE3', '#B3B8BF', '#8F959D'];
  doughnutChart = [
    {
      label: 'Desodorante y antitranspirantes',
      value: 20,
      color: '#0050F5',
    },
    {
      label: 'Cuidado facial',
      value: 20,
      color: '#00B0FF',
    },
    {
      label: 'Jabón gel y de manos',
      value: 20,
      color: '#D9DDE3',
    },
    {
      label: 'Cuidado personal',
      value: 20,
      color: '#B3B8BF',
    },
    {
      label: 'Otros',
      value: 20,
      color: '#8F959D',
    },
  ];
  stackedChart = [
    {
      label: 'Sesiones MQ',
      value: '1,483 (32%)',
      color: '#0050F5',
    },
    {
      label: 'Interacción Clientes',
      value: '891 (60%)',
      color: '#00B0FF',
    },
    {
      label: 'Clic en categorías',
      value: '874 (98%)',
      color: '#B3B8BF',
    },
    {
      label: 'Compra',
      value: '126 (14%)',
      color: '#D9DDE3',
    },
  ];
}
