import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'spectrum-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {}
