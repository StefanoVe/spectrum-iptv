import { Injectable } from '@angular/core';

import { BaseFactory } from '../../../constructors/base.factory.service';
import { XtreamCatalog } from '../../../interfaces/xtream.interface';
import { VodDetailsComponent } from './vod-details.component';

@Injectable()
export class VodDetailsFactory extends BaseFactory {
  public create(data: { vod: XtreamCatalog[0] }) {
    return this._createComponent(VodDetailsComponent, data);
  }
}
