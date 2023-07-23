import { Workspace, WorkspacesResource } from '../../shared/types/workspaces';
import { BaseFeatureFacade, createGlobalState } from './base-feature-facade';

export default class WorkspacesFacade
  extends BaseFeatureFacade<Workspace>
  implements WorkspacesResource
{
  static STORAGE_FILE = 'workspaces.json';

  getDirectory(): string {
    return WorkspacesFacade.STORAGE_FILE;
  }
}

export const [getWorkspaces] =
  createGlobalState<WorkspacesFacade>(WorkspacesFacade);
