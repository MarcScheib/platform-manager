import { BaseEntity } from '../../shared/types/base';
import {
  createFileIfNotExisting,
  loadFromFile,
  saveFile,
} from '../persistence/storage';

export abstract class BaseFeatureFacade<T extends BaseEntity> {
  constructor() {
    createFileIfNotExisting(this.getDirectory(), []);
  }

  async create(payload: T): Promise<T> {
    return loadFromFile<T[]>(this.getDirectory())
      .then(entities => entities.concat(payload))
      .then(entities => saveFile(this.getDirectory(), entities))
      .then(() => payload);
  }

  read(businessKey: string): Promise<T>;
  read(): Promise<T[]>;
  read(businessKey?: unknown): Promise<T | T[]> {
    return loadFromFile<T[]>(this.getDirectory()).then(entities =>
      businessKey
        ? entities.find(entity => entity.businessKey === businessKey)
        : entities
    );
  }

  update(businessKey: string, payload: T): Promise<T> {
    return loadFromFile<T[]>(this.getDirectory())
      .then(entities =>
        entities.map(entity =>
          entity.businessKey === businessKey ? payload : entity
        )
      )
      .then(entities => saveFile(this.getDirectory(), entities))
      .then(() => payload);
  }

  delete(businessKey: string): Promise<void> {
    return loadFromFile<T[]>(this.getDirectory())
      .then(entities =>
        entities.filter(entity => entity.businessKey !== businessKey)
      )
      .then(entities => saveFile(this.getDirectory(), entities));
  }

  abstract getDirectory(): string;
}
