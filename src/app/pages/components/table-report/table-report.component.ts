import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SeeMoreComponent } from '../see-more/see-more.component';
import { RankIndicatorComponent } from '../rank-indicator/rank-indicator.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table-report',
  standalone: true,
  imports: [CommonModule, SeeMoreComponent, RankIndicatorComponent, RouterModule],
  templateUrl: './table-report.component.html',
  styleUrl: './table-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableReportComponent {
  @Input() isFullSize = true;
  @Input() headers: any;
  @Input() values: any;
  @Input() types: any = [];
  
  quantity = 3;

  isStatus(columnName: string) {
    return (
      this.types.find((f: any) => f.columnName === columnName)?.type ===
      'status'
    );
  }

  isBadge(columnName: string) {
    return (
      this.types.find((f: any) => f.columnName === columnName)?.type === 'badge'
    );
  }

  isIndicator(columnName: string) {
    return (
      this.types.find((f: any) => f.columnName === columnName)?.type ===
      'indicator'
    );
  }
}
