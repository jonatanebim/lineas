import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-indicator.component.html',
  styleUrls: ['./graph-indicator.component.scss'],
})
export class GraphIndicatorComponent {
  @Input() label = '';
  @Input() type = '';
  @Input() color = '';
}
