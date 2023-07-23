export interface Secret {
  businessKey: string;
}

export interface SecretsResource {
  create(payload: Secret): Promise<Secret>;

  read(businessKey: string): Promise<Secret>;

  read(): Promise<Secret[]>;

  update(businessKey: string, payload: Secret): Promise<Secret>;

  delete(businessKey: string): Promise<void>;
}
