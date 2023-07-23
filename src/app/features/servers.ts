import { Server, ServersResource } from '../../shared/types/servers';
import { BaseFeatureFacade, createGlobalState } from './base-feature-facade';

export default class ServersFacade
  extends BaseFeatureFacade<Server>
  implements ServersResource
{
  static STORAGE_FILE = 'servers.json';

  getDirectory(): string {
    return ServersFacade.STORAGE_FILE;
  }
}

export const [getServers] = createGlobalState<ServersFacade>(ServersFacade);
