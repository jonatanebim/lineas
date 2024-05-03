import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-country-graph',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './country-graph.component.html',
  styleUrl: './country-graph.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryGraphComponent { }
