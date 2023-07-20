export interface Server {
  businessKey?: string;
  name: string;
  url: string;
}

export interface ServersResource {
  create(payload: Server): Promise<Server>;

  read(businessKey: string): Promise<Server>;

  read(): Promise<Server[]>;

  update(businessKey: string, payload: Server): Promise<Server>;

  delete(businessKey: string): Promise<void>;
}
