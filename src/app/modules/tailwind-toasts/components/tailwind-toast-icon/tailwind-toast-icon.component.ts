import { Component, Input } from '@angular/core';

@Component({
  selector: 'golden-tailwind-toast-icon',
  standalone: false,
  styles: [
    `
      svg {
        width: 1.5rem;
        height: 1.5rem;
        margin: auto;
      }
    `,
  ],
  templateUrl: './tailwind-toast-icon.component.html',
})
export class TailwindToastIconComponent {
  @Input() type: string = '';
}
