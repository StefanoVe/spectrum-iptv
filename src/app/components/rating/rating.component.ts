import { Component, Input } from '@angular/core';

@Component({
  selector: 'spectrum-rating',
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  @Input() rating = 0;
}
