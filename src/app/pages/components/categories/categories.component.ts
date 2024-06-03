import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeeMoreComponent } from '../see-more/see-more.component';
import { Indicator } from '../../../shared/interfaces';
import {
  MAX_CATEGORIES_VIEW,
  MIN_CATEGORIES_VIEW,
} from '../../../shared/constants/global.constants';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  imports: [CommonModule, SeeMoreComponent],
})
export class CategoriesComponent {
  @Input() data!: Array<Partial<Indicator>>;
  @Input() showAll = false;

  isActiveShowAll = false;
  viewQuantity = MIN_CATEGORIES_VIEW;

  doToggle($ev: boolean) {
    this.isActiveShowAll = $ev;
    this.viewQuantity = $ev ? MAX_CATEGORIES_VIEW : MIN_CATEGORIES_VIEW;
  }
}
