declare global {
  interface Window {
    electronAPI: any;
  }
}

export class BaseAPI {
  private _base: any;

  get base() {
    return this._base;
  }

  constructor() {
    this._base = window.electronAPI;
  }
}
