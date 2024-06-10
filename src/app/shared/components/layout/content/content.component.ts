import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LoadingComponent } from '../../loading/loading.component'
import { GlobalStoreService } from '../../../stores/global.store'

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  globalStore = inject(GlobalStoreService)

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
}
