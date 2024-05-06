import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SeeMoreComponent } from '../see-more/see-more.component';
import { RankIndicatorComponent } from '../rank-indicator/rank-indicator.component';

@Component({
  selector: 'app-table-report',
  standalone: true,
  imports: [CommonModule, SeeMoreComponent, RankIndicatorComponent],
  templateUrl: './table-report.component.html',
  styleUrl: './table-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableReportComponent {
  @Input() isFullSize = true;
  @Input() headers: any;
  @Input() values: any;
}
