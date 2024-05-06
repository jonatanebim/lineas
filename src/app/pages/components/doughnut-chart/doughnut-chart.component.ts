import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('graph') graph!: ElementRef<any>;

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

  ngAfterViewInit(): void {
    new Chart(this.graph.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: this.values,
            backgroundColor: this.colors,
          },
        ],
      },
      plugins: [this.customDataLabelPlugin],
      options: {
        maintainAspectRatio: false,
        aspectRatio: 2,
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

