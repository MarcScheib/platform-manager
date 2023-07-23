import type {
  Workspace,
  WorkspacesResource,
} from '../../../shared/types/workspaces';
import { BaseResource } from '../../base-resource';

export class WorkspacesResourceImpl
  extends BaseResource
  implements WorkspacesResource
{
  async create(payload: Workspace): Promise<Workspace> {
    return this.base.workspaces.create(payload);
  }

  async read(businessKey: string): Promise<Workspace>;
  async read(): Promise<Workspace[]>;
  async read(businessKey?: string): Promise<Workspace | Workspace[]> {
    return businessKey
      ? this.base.workspaces.read(businessKey)
      : this.base.workspaces.read();
  }

  async update(businessKey: string, payload: Workspace): Promise<Workspace> {
    return this.base.workspaces.update(businessKey, payload);
  }

  async delete(businessKey: string): Promise<void> {
    return this.base.workspaces.delete(businessKey);
  }
}
