import { BaseAPI } from './base';

export class CommonAPI extends BaseAPI {
  async getRequirements(): Promise<{ stdout: string; stderr: string }[]> {
    return this.base.getRequirements();
  }
}
