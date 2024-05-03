import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-top-sku',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './top-sku.component.html',
  styleUrl: './top-sku.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopSkuComponent { }
