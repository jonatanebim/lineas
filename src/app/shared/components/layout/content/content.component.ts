import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../../loading/loading.component';
import { GlobalStoreService } from '../../../stores/global.store';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  globalStore = inject(GlobalStoreService)

  isOpen = false;
  navBarItems = [
    {
      icon: 'icon-chart.svg',
      path: '',
      label: 'Inicio',
    },
    {
      icon: 'icon-coupon.svg',
      path: 'categorias',
      label: 'Oportunidad de Categorías',
    },
    {
      icon: 'icon-chart.svg',
      path: 'regiones',
      label: 'Oportunidad en Regiones',
    },
    {
      icon: 'icon-location.svg',
      path: '',
      label: 'Oportunidad de Competencia',
      pro: true,
    },
  ];

  toggleSidebar() {
    this.isOpen = !this.isOpen
  }
}
