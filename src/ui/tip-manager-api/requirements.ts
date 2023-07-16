import type {
  Requirement,
  RequirementsResource,
} from '../../shared/types/requirements';
import { BaseAPI } from './base';

export class RequirementsResourceImpl
  extends BaseAPI
  implements RequirementsResource
{
  async getRequirements(): Promise<Requirement[]> {
    return this.base.requirements.getRequirements();
  }
}
