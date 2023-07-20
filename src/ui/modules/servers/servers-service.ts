import type { Server, ServersResource } from '../../../shared/types/servers';
import { BaseResource } from '../../base-resource';

export class ServersResourceImpl
  extends BaseResource
  implements ServersResource
{
  async create(payload: Server): Promise<Server> {
    return this.base.servers.create(payload);
  }

  async read(businessKey: string): Promise<Server>;
  async read(): Promise<Server[]>;
  async read(businessKey?: string): Promise<Server | Server[]> {
    return businessKey
      ? this.base.servers.read(businessKey)
      : this.base.servers.read();
  }

  async update(businessKey: string, payload: Server): Promise<Server> {
    return this.base.servers.update(businessKey, payload);
  }

  async delete(businessKey: string): Promise<void> {
    return this.base.servers.delete(businessKey);
  }
}
