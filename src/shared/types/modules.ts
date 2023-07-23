export interface Module {
  businessKey: string;
}

export interface ModulesResource {
  create(payload: Module): Promise<Module>;

  read(businessKey: string): Promise<Module>;

  read(): Promise<Module[]>;

  update(businessKey: string, payload: Module): Promise<Module>;

  delete(businessKey: string): Promise<void>;
}
