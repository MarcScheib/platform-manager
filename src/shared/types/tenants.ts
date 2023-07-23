export interface Tenant {
  businessKey: string;
}

export interface TenantsResource {
  create(payload: Tenant): Promise<Tenant>;

  read(businessKey: string): Promise<Tenant>;

  read(): Promise<Tenant[]>;

  update(businessKey: string, payload: Tenant): Promise<Tenant>;

  delete(businessKey: string): Promise<void>;
}
