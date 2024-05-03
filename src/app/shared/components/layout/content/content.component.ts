import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  navBarItems = [
    {
      icon: 'icon-chart.svg',
      label: 'Inicio',
    },
    {
      icon: 'icon-coupon.svg',
      label: 'Oportunidad de Categorías',
    },
    {
      icon: 'icon-chart.svg',
      label: 'Oportunidad en Regiones',
    },
    {
      icon: 'icon-location.svg',
      label: 'Oportunidad de Competencia',
      pro: true
    },
  ];
}
