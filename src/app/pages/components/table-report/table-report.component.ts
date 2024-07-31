import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { SeeMoreComponent } from '../see-more/see-more.component'
import { RankIndicatorComponent } from '../rank-indicator/rank-indicator.component'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-table-report',
  standalone: true,
  imports: [CommonModule, SeeMoreComponent, RankIndicatorComponent, RouterModule],
  templateUrl: './table-report.component.html',
  styleUrl: './table-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableReportComponent implements OnInit {
  @Input() combined = true
  @Input() isFullSize = true
  @Input() showAll = false
  @Input() withoutButton = false
  @Input() withChildrens = false
  @Input() headers: any
  @Input() values: any = []
  @Input() types: any = []
  @Input() quantity = 4

  ngOnInit() {
    this.quantity = this.showAll ? this.values.length : 4
  }

  isStatus(columnName: string) {
    return this.types.find((f: any) => f.columnName === columnName)?.type === 'status'
  }

  isBadge(columnName: string) {
    return this.types.find((f: any) => f.columnName === columnName)?.type === 'badge'
  }

  isIndicator(columnName: string) {
    return columnName.includes('vs')
  }

  seeAll($event: boolean) {
    this.quantity = $event ? this.values.length : 4
  }
}
