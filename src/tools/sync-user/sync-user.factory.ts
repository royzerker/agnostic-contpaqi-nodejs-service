import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { SyncUserEnum } from 'src/core/enums/sync-user.enum';
import { SyncUserBaseStrategyService } from './services/sync-user.strategy.service';

@Injectable()
export class SyncUserFactory {
  #_moduleRef: ModuleRef;

  constructor(moduleRef: ModuleRef) {
    this.#_moduleRef = moduleRef;
  }

  create(type: SyncUserEnum) {
    switch (type) {
      case SyncUserEnum.BASE:
        return this.#_moduleRef.get(SyncUserBaseStrategyService);
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  }
}
