import {
  ApplicationRef,
  Injectable,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { IBaseModalOptions } from './modal.base.component';

@Injectable()
export class BaseFactory {
  constructor(
    public vcr: ViewContainerRef,
    public applicationRef: ApplicationRef
  ) {}

  public _createComponent<T, D = { [key: string]: unknown }>(
    component: Type<T>,
    data?: D,
    baseModalOptions?: IBaseModalOptions
  ) {
    const rootViewContainerRef = this.applicationRef.components[0].injector;

    const ref = this.vcr.createComponent<T>(component, {
      injector: rootViewContainerRef,
    });

    ref.setInput('cf', ref);
    ref.setInput('baseModalOptions', baseModalOptions);

    for (const key in data) {
      ref.setInput(key, data[key]);
    }

    return ref;
  }
}
