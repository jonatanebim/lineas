import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { LoadingComponent } from '../../loading/loading.component'
import { GlobalStoreService } from '../../../stores/global.store'
import { LocalStorageService } from 'ngx-webstorage'
import { FilterStoreService } from '../../../stores/filter.store'
import { FILE_SAVER } from '../../../constants/globals'
import * as ExcelJS from 'exceljs' 
import { CommonsRequestsService } from '../../../requests/commons.requests'

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  router = inject(Router)
  globalStore = inject(GlobalStoreService)
  localSt = inject(LocalStorageService)
  filterService = inject(FilterStoreService)
  commonService = inject(CommonsRequestsService)

  isDownloading = signal(false)
  showSuccess = signal(false)

  isOpen = false
  navBarItems = [
    {
      icon: 'icon-incio',
      path: 'home',
      label: 'Inicio',
    },
    {
      icon: 'icon-categorias',
      path: 'categorias',
      label: 'Oportunidad de Categorías',
    },
    {
      icon: 'icon-departamentos',
      path: 'regiones',
      label: 'Oportunidad en Regiones',
    },
    {
      icon: 'icon-pro',
      path: 'competencias',
      label: 'Oportunidad de Competencia',
      pro: true,
    },
  ]

  downloadReport() {
    this.isDownloading.update(() => true)
    this.showSuccess.update(() => false)
    //
    this.commonService.downloadReport().subscribe((data: any) => {
      setTimeout(() => {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet(FILE_SAVER.name)

        const headers = data.columns.map((f: any) => f.label)
        worksheet.addRow(headers)

        data.values.forEach((item: any) => {
          const row: any = []
          data.columns.forEach((h: any, index: number) => {
            row.push(item[h.columnName])
            worksheet.getColumn(index + 1).width = h.label.length + FILE_SAVER.size
          })
          worksheet.addRow(row)
        })

        workbook.xlsx.writeBuffer().then((buffer: any) => {
          const blob = new Blob([buffer], { type: FILE_SAVER.type }) 
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${FILE_SAVER.name}.xlsx`;
          link.click();
          URL.revokeObjectURL(link.href);
        })

        this.isDownloading.update(() => false)
        this.showSuccess.update(() => true)
      }, 1000)
    })
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen
    // this.filterService.resetParams()
  }

  doLogout() {
    this.localSt.clear()
    this.router.navigate(['/'])
  }

  closeSuccess() {
    this.showSuccess.update(() => false)
  }
}
