import type {
  Workspace,
  WorkspacesResource,
} from '../../../shared/types/workspaces';
import { CrudResourceImpl } from '../../base-resource';

export class WorkspacesResourceImpl
  extends CrudResourceImpl<Workspace>
  implements WorkspacesResource
{
  getBase() {
    return this.base.workspaces;
  }
}
