import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-see-more',
  templateUrl: './see-more.component.html',
  styleUrl: './see-more.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class SeeMoreComponent {
  @Input() centered = true
}
