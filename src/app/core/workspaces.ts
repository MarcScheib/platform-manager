import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { Workspace, WorkspacesResource } from '../../shared/types/workspaces';
import { createFileIfNotExisting, loadFromFile, saveFile } from './storage';

export default class WorkspacesFacade implements WorkspacesResource {
  static STORAGE_FILE = 'workspaces.json';

  constructor() {
    createFileIfNotExisting(WorkspacesFacade.STORAGE_FILE, []);
  }

  async create(payload: Workspace): Promise<Workspace> {
    return loadFromFile<Workspace[]>(WorkspacesFacade.STORAGE_FILE)
      .then(workspaces => workspaces.concat(payload))
      .then(workspaces => saveFile(WorkspacesFacade.STORAGE_FILE, workspaces))
      .then(() => payload);
  }

  read(businessKey: string): Promise<Workspace>;
  read(): Promise<Workspace[]>;
  read(businessKey?: unknown): Promise<Workspace | Workspace[]> {
    return loadFromFile<Workspace[]>(WorkspacesFacade.STORAGE_FILE).then(
      workspaces =>
        businessKey
          ? workspaces.find(workspace => workspace.businessKey === businessKey)
          : workspaces
    );
  }

  update(businessKey: string, payload: Workspace): Promise<Workspace> {
    return loadFromFile<Workspace[]>(WorkspacesFacade.STORAGE_FILE)
      .then(workspaces =>
        workspaces.map(workspace =>
          workspace.businessKey === businessKey ? payload : workspace
        )
      )
      .then(workspaces => saveFile(WorkspacesFacade.STORAGE_FILE, workspaces))
      .then(() => payload);
  }

  delete(businessKey: string): Promise<void> {
    return loadFromFile<Workspace[]>(WorkspacesFacade.STORAGE_FILE)
      .then(workspaces =>
        workspaces.filter(workspace => workspace.businessKey !== businessKey)
      )
      .then(workspaces => saveFile(WorkspacesFacade.STORAGE_FILE, workspaces));
  }
}

const cache: {
  [windowId: string]: WorkspacesFacade;
} = {};

export const getWorkspaces = (
  e: IpcMainEvent | IpcMainInvokeEvent
): WorkspacesFacade => {
  const sourceWindow = BrowserWindow.fromWebContents(e.sender);
  if (!sourceWindow) {
    throw new Error('Could not resolve current window');
  }

  const windowId = sourceWindow.id;

  let instance = cache[windowId];
  if (!instance) {
    instance = new WorkspacesFacade();
    cache[windowId] = instance;
  }

  return instance;
};
