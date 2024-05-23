import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-card-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-filter.component.html',
  styleUrl: './card-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFilterComponent {
  showCurrent = signal(false)

  get isOnCurrent(): boolean {
    return this.showCurrent()
  }

  toggle() {
    this.showCurrent.update(() => !this.isOnCurrent)
  }
}
