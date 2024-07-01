import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { LoadingComponent } from '../../loading/loading.component'
import { GlobalStoreService } from '../../../stores/global.store'
import { LocalStorageService } from 'ngx-webstorage'

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
      path: '',
      label: 'Oportunidad de Competencia',
      pro: true,
    },
  ]

  toggleSidebar() {
    this.isOpen = !this.isOpen
  }

  doLogout() {
    this.localSt.clear()
    this.router.navigate(['/'])
  }
}
