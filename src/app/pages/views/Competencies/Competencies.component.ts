import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CategoriesRequestsService } from '../../../shared/requests/categories.requests'
import { GlobalStoreService } from '../../../shared/stores/global.store'
import { CardFilterComponent, CardReportComponent } from '../../components'
import { tap } from 'rxjs'

@Component({
  selector: 'app-competencies',
  standalone: true,
  imports: [CommonModule, CardFilterComponent, CardReportComponent],
  templateUrl: './Competencies.component.html',
  styleUrl: './Competencies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetenciesComponent implements AfterViewInit {
  service = inject(CategoriesRequestsService)
  globalStore = inject(GlobalStoreService)
  activateRoute = inject(ActivatedRoute)
  selectedCategory: any = null
  cards: any = []
  headers: Array<any> = []
  values: Array<any> = []
  headersCob: Array<any> = []
  valuesCob: Array<any> = []
  doughnutData: any = []
  participationData: any = []
  evolutionLabels: any[] = []
  evolutionData: any
  evolutionDataLabels: any

  ngAfterViewInit() {
    this.getData().subscribe()
  }

  filter() {
    this.getData().subscribe()
  }

  getData() {
    this.globalStore.showLoading()

    const filterParams = {
      ...(this.selectedCategory ? { category: this.selectedCategory } : { category: '' }),
    }
    return this.service.getCategoriesReport(filterParams).pipe(
      tap((data: any) => {
        this.cards = data?.cards

        this.globalStore.hideLoading()
      })
    )
  }
}
