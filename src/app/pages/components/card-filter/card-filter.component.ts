import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FilterStoreService } from '../../../shared/stores/filter.store'
import { moment } from '../../../shared/helpers/date'

@Component({
  selector: 'app-card-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-filter.component.html',
  styleUrl: './card-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFilterComponent {
  filterService = inject(FilterStoreService)
  showCurrent = signal(false)

  get isOnCurrent(): boolean {
    return this.showCurrent()
  }

  get untilDate() {
    const today = new Date()
    const yesterday = new Date()
    return moment(new Date(yesterday.setDate(today.getDate() - 1))).format('DD-MM-YYYY')
  }

  toggle() {
    this.showCurrent.update(() => !this.isOnCurrent)
    this.filterService.queryParms.update(() => ({
      ...this.filterService.queryParms(),
      untilToday: this.isOnCurrent,
    }))
  }
}
