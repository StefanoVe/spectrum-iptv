import { Injectable } from '@angular/core';

import { BaseFactory } from '../../../constructors/base.factory.service';
import { ISelectOption, SelectComponent } from './select.component';

@Injectable()
export class SelectModalFactory extends BaseFactory {
  public create(config: {
    title: string;
    subtitle?: string;
    options: ISelectOption[];
    hideCancel?: boolean;
    readOnly?: boolean;
  }) {
    return this._createComponent(SelectComponent, config);
  }
}

export const provideSelectModalFactory = () => ({
  provide: SelectModalFactory,
  useClass: SelectModalFactory,
});
