export interface BaseEntity {
  businessKey: string;
  name: string;
}

export interface CrudResource<T extends BaseEntity> {
  create(payload: T): Promise<T>;
  read(businessKey: string): Promise<T>;
  read(): Promise<T[]>;
  update(businessKey: string, payload: T): Promise<T>;
  delete(businessKey: string): Promise<void>;
}
