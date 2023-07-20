import { RequirementsResource } from './types/requirements';
import { ServersResource } from './types/servers';

export interface TipManagerResource {
  requirements: RequirementsResource;
  servers: ServersResource;
}
