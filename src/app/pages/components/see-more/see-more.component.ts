import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-see-more',
  templateUrl: './see-more.component.html',
  styleUrl: './see-more.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class SeeMoreComponent {
  @Input() centered = true;
  @Input() isActive = false;

  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  doToggle() {
    this.toggle.emit(!this.isActive);
  }
}
