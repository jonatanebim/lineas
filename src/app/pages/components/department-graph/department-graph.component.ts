import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core'
import { DEPARTMENTS } from '../../../shared/constants/globals'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { GlobalStoreService } from '../../../shared/stores/global.store'

@Component({
  selector: 'app-department-graph',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './department-graph.component.html',
  styleUrl: './department-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentGraphComponent implements OnChanges {
  @Input() data!: any
  @Input() selected!: string

  loaded = true
  globalStore = inject(GlobalStoreService)
  departments: any = DEPARTMENTS
  department = this.defaultDepartment.value

  get defaultDepartment() {
    return DEPARTMENTS.find((f) => f.name === 'Lima') || DEPARTMENTS[0]
  }

  ngOnChanges(changes: SimpleChanges): void {
    const cValue = changes['selected'].currentValue
    if (cValue) this.department = cValue
  }

  get current() {
    return this.departments.find((d: any) => d.value == this.department)
  }

  updateView() {
    this.globalStore.reloadRegions.set(this.department)
  }
}
