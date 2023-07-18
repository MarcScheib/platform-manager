import type {
  Requirement,
  RequirementsResource,
} from '../../../shared/types/requirements';
import { BaseResource } from '../../base-resource';

export class RequirementsResourceImpl
  extends BaseResource
  implements RequirementsResource
{
  async getRequirements(): Promise<Requirement[]> {
    return this.base.requirements.getRequirements();
  }
}
