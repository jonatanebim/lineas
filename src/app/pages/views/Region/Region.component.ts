import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Region.component.html',
  styleUrl: './Region.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegionComponent {}
