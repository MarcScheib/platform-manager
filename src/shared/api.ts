import { ModulesResource } from './types/modules';
import { RequirementsResource } from './types/requirements';
import { SecretsResource } from './types/secrets';
import { ServersResource } from './types/servers';
import { TenantsResource } from './types/tenants';
import { WorkspacesResource } from './types/workspaces';

export interface TipManagerResource {
  modules: ModulesResource;
  requirements: RequirementsResource;
  secrets: SecretsResource;
  servers: ServersResource;
  tenants: TenantsResource;
  workspaces: WorkspacesResource;
}
