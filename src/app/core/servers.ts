import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { Server, ServersResource } from '../../shared/types/servers';
import { createFileIfNotExisting, loadFromFile, saveFile } from './storage';

export default class ServersFacade implements ServersResource {
  static SERVERS_FILE = 'servers.json';

  constructor() {
    createFileIfNotExisting(ServersFacade.SERVERS_FILE, []);
  }

  async create(payload: Server): Promise<Server> {
    return loadFromFile<Server[]>(ServersFacade.SERVERS_FILE)
      .then(servers => servers.concat(payload))
      .then(servers => saveFile(ServersFacade.SERVERS_FILE, servers))
      .then(() => payload);
  }

  read(businessKey: string): Promise<Server>;
  read(): Promise<Server[]>;
  read(businessKey?: unknown): Promise<Server | Server[]> {
    return loadFromFile<Server[]>(ServersFacade.SERVERS_FILE).then(servers =>
      businessKey
        ? servers.find(server => server.businessKey === businessKey)
        : servers
    );
  }

  update(businessKey: string, payload: Server): Promise<Server> {
    return loadFromFile<Server[]>(ServersFacade.SERVERS_FILE)
      .then(servers =>
        servers.map(server =>
          server.businessKey === businessKey ? payload : server
        )
      )
      .then(servers => saveFile(ServersFacade.SERVERS_FILE, servers))
      .then(() => payload);
  }

  delete(businessKey: string): Promise<void> {
    return loadFromFile<Server[]>(ServersFacade.SERVERS_FILE)
      .then(servers =>
        servers.filter(server => server.businessKey !== businessKey)
      )
      .then(servers => saveFile(ServersFacade.SERVERS_FILE, servers));
  }
}

const cache: {
  [windowId: string]: ServersFacade;
} = {};

export const getServers = (
  e: IpcMainEvent | IpcMainInvokeEvent
): ServersFacade => {
  const sourceWindow = BrowserWindow.fromWebContents(e.sender);
  if (!sourceWindow) {
    throw new Error('Could not resolve current window');
  }

  const windowId = sourceWindow.id;

  let instance = cache[windowId];
  if (!instance) {
    instance = new ServersFacade();
    cache[windowId] = instance;
  }

  return instance;
};
