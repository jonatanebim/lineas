import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-table-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-report.component.html',
  styleUrl: './table-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableReportComponent {
  @Input() isFullSize = true;

  headers = [
    'DPTO/CIUDAD',
    'Venta MQ',
    'M Share',
    '%Dist Num',
    'Vs Ma',
    'vs maa',
  ];

  values = ['value', 'value', 'value', 'value', 'value'];
}
