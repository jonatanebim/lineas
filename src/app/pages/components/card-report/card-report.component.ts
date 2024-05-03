import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RankIndicatorComponent } from '../rank-indicator/rank-indicator.component';

@Component({
  selector: 'app-card-report',
  standalone: true,
  imports: [CommonModule, RankIndicatorComponent],
  templateUrl: './card-report.component.html',
  styleUrl: './card-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardReportComponent {}
