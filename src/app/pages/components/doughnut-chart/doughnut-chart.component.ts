import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class DoughnutChartComponent implements AfterViewInit {
  @Input() data: any;

  @ViewChild('graph') graph!: ElementRef<any>;

  variants = ['#DEF2FF', '#B6E7FF', '#8F959D'];
  doughnutChart!: any[];

  ngAfterViewInit(): void {
    this.doughnutChart = this.data;
    new Chart(this.graph.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: this.values,
            backgroundColor: this.colors,
            borderWidth: 0,
          },
        ],
      },
      plugins: [this.customDataLabelPlugin],
      options: {
        maintainAspectRatio: false,
        aspectRatio: 1.8,
        events: [],
      },
    });
  }

  get values() {
    return this.doughnutChart.map((i) => i.value);
  }

  get colors() {
    return this.doughnutChart.map((i) => i.color);
  }

  get customDataLabelPlugin() {
    const $this = this;
    return {
      id: 'customDatalabels',
      afterDatasetsDraw(chart: any) {
        const { ctx, data } = chart;
        data.datasets[0].data.forEach((dataPoint: any, index: number) => {
          const { x, y } = chart
            .getDatasetMeta(0)
            .data[index].tooltipPosition();
          const color = $this.colors[index];

          ctx.font = '10px "Nunito Sans", Helvetica, Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          if ($this.variants.find((variant: string) => variant === color)) {
            ctx.fillStyle = '#000';
          } else {
            ctx.fillStyle = '#ffff';
          }

          ctx.fillText(`${dataPoint}%`, x, y);
        });
      },
    };
  }
}
