import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  baseModalComponentProviders,
  ModalBaseComponent,
} from '../../../constructors/modal.base.component';

export interface ISelectOption {
  value: any;
  label: string;
  style?: EnumSelectOptionStyle;
}

export enum EnumSelectOptionStyle {
  DESTRUCTIVE = 'destructive',
  PREFERRED = 'preferred',
  CANCEL = 'cancel',
  DEFAULT = 'default',
}

@Component({
  selector: 'notify-select',
  standalone: true,
  imports: [CommonModule],
  providers: baseModalComponentProviders,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent extends ModalBaseComponent<ISelectOption> {
  private _domSanitizer = inject(DomSanitizer);
  @Input({ required: true }) title = '';
  @Input() subtitle = '';
  @Input() options: ISelectOption[] = [];
  @Input() hideCancel = false;
  @Input() readOnly = false;

  @Output() optionSelected = new EventEmitter<ISelectOption>();

  public get sanitizedSubtitle() {
    return this._domSanitizer.bypassSecurityTrustHtml(this.subtitle) as string;
  }

  public handleSelection(option: ISelectOption) {
    this.optionSelected.emit(option);
    if (option.style === EnumSelectOptionStyle.CANCEL) {
      this.close();
      return;
    }

    console.log(`emitting ${option.value}`);
    this.submitted.next(option);
  }

  public get fullOptions() {
    if (this.hideCancel) {
      return this.options;
    }
    return [
      ...this.options,
      { value: null, label: 'Annulla', style: EnumSelectOptionStyle.CANCEL },
    ].map((option) => ({
      ...option,
      label: this._domSanitizer.bypassSecurityTrustHtml(option.label) as string,
    }));
  }
}
