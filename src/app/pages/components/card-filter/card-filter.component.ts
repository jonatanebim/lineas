import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-filter.component.html',
  styleUrl: './card-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFilterComponent {}
