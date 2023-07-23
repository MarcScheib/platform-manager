export interface Workspace {
  businessKey: string;
}

export interface WorkspacesResource {
  create(payload: Workspace): Promise<Workspace>;

  read(businessKey: string): Promise<Workspace>;

  read(): Promise<Workspace[]>;

  update(businessKey: string, payload: Workspace): Promise<Workspace>;

  delete(businessKey: string): Promise<void>;
}
