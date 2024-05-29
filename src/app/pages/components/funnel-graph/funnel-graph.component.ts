import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-funnel-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funnel-graph.component.html',
  styleUrl: './funnel-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FunnelGraphComponent implements OnInit {
  @Input() data: any;

  stackedChart: any;

  ngOnInit(): void {
    this.stackedChart = [
      {
        label: 'Total Sesiones MQ',
        value: `${this.data.totalSessions.value} (${this.data.totalSessions.percentage}%)`,
        color: '#0050F5',
      },
      {
        label: 'Click en mercado digital',
        value: `${this.data.clientsInteraction.value} (${this.data.clientsInteraction.percentage}%)`,
        color: '#00B0FF',
      },
      {
        label: 'Clic en categorías de  BDF',
        value: `${this.data.categoryClicks.value} (${this.data.categoryClicks.percentage}%)`,
        color: '#75D6FF',
      },
      {
        label: 'Compra',
        value: `${this.data.sales.value} (${this.data.sales.percentage}%)`,
        color: '#DEF2FF',
      },
    ];
  }
}
