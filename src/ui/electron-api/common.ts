import { BaseAPI } from "./base";

export class CommonAPI extends BaseAPI {
  setTitle(title: string) {
    this.base.setTitle(title);
  }
}
