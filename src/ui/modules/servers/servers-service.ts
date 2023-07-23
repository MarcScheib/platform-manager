import type { Server, ServersResource } from '../../../shared/types/servers';
import { CrudResourceImpl } from '../../base-resource';

export class ServersResourceImpl
  extends CrudResourceImpl<Server>
  implements ServersResource
{
  getBase() {
    return this.base.servers;
  }
}
