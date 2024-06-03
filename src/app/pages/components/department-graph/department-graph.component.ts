import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { DEPARTMENTS } from '../../../shared/constants/global.constants'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-department-graph',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './department-graph.component.html',
  styleUrl: './department-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentGraphComponent implements OnChanges {
  @Input() selected!: string

  departments: any = DEPARTMENTS
  department = DEPARTMENTS[0].value

  ngOnChanges(changes: SimpleChanges): void {
    this.department = changes['selected'].currentValue
  }

  get current() {
    return this.departments.find((d: any) => d.value == this.department)
  }

  updateView() {
    console.log(this.department)
  }
}
