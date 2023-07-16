import { TipManagerAPI } from '../../shared/api';

declare global {
  interface Window {
    tipmanager: TipManagerAPI;
  }
}

export class BaseAPI {
  private _base: TipManagerAPI;

  get base() {
    return this._base;
  }

  constructor() {
    this._base = window.tipmanager;
  }
}
