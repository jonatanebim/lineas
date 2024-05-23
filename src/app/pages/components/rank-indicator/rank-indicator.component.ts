import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rank-indicator',
  styleUrls: ['./rank-indicator.component.scss'],
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rank-indicator.component.html',
})
export class RankIndicatorComponent {
  @Input() withHeader = true
  @Input() clear = false
  @Input() data: any
}
