import { CommonModule, DatePipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core'
import { FilterStoreService } from '../../../shared/stores/filter.store'
import { moment } from '../../../shared/helpers/date'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-card-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DatePipe],
  templateUrl: './card-filter.component.html',
  styleUrl: './card-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFilterComponent {
  @Output() doFilter = new EventEmitter()

  fb = inject(FormBuilder)
  filterService = inject(FilterStoreService)
  showCurrent = this.filterService.queryParms().untilToday
  selected = this.filterService.queryParms().datetime

  get isOnCurrent(): boolean {
    return this.showCurrent
  }

  get untilDate() {
    const today = new Date()
    const yesterday = new Date()
    return moment(new Date(yesterday.setDate(today.getDate() - 1))).format('DD-MM-YYYY')
  }

  onChange(m: any) {
    const date = new Date(+m)
    this.filterService.queryParms.update(() => ({
      ...this.filterService.queryParms(),
      untilToday: false,
      datetime: m,
      date: moment(date).format('YYYY-MM-DD'),
    }))
    this.doFilter.emit(true)
  }

  toggle() {
    this.filterService.queryParms.update(() => ({
      ...this.filterService.queryParms(),
      date: this.filterService.getLastMonths()[0].formated,
      datetime: null,
      untilToday: !this.isOnCurrent,
    }))
    this.doFilter.emit(true)
  }

  update($e: any) {
    console.log($e)
  }
}
