import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeeMoreComponent } from '../see-more/see-more.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  imports: [CommonModule, SeeMoreComponent],
})
export class CategoriesComponent {

  categories = [
    {
      label: 'Desodorante y antitranspirantes',
      value: 20,
      color: '#0050F5',
    },
    {
      label: 'Cuidado facial',
      value: 20,
      color: '#00B0FF',
    },
    {
      label: 'Jabón gel y de manos',
      value: 20,
      color: '#D9DDE3',
    },
    {
      label: 'Cuidado personal',
      value: 20,
      color: '#B3B8BF',
    },
    {
      label: 'Otros',
      value: 20,
      color: '#8F959D',
    },
  ];
}
