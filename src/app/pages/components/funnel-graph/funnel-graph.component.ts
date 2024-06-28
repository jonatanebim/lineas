import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { COLORS } from '../../../shared/constants/globals';

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
        color: COLORS[0],
      },
      {
        label: 'Click en mercado digital',
        value: `${this.data.categoryClicks.value} (${this.data.categoryClicks.percentage}%)`,
        color: COLORS[1],
      },
      {
        label: 'Clic en categorías de  BDF',
        value: `${this.data.categoryClicks.value} (${this.data.categoryClicks.percentage}%)`,
        color: COLORS[3],
      },
      {
        label: 'Compra',
        value: `${this.data.sales.value} (${this.data.sales.percentage}%)`,
        color: COLORS[2],
      },
    ];
  }
}
