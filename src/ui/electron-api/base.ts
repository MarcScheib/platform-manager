declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export interface ElectronAPI {
  getRequirements: () => Promise<{ stdout: string; stderr: string }[]>;
}

export class BaseAPI {
  private _base: ElectronAPI;

  get base() {
    return this._base;
  }

  constructor() {
    this._base = window.electronAPI;
  }
}
