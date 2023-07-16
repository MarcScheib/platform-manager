import { TipManagerResource } from '../../shared/api';

declare global {
  interface Window {
    tipmanager: TipManagerResource;
  }
}

export class BaseAPI {
  private _base: TipManagerResource;

  get base() {
    return this._base;
  }

  constructor() {
    this._base = window.tipmanager;
  }
}
