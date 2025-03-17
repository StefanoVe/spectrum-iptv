import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'notify-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {}
