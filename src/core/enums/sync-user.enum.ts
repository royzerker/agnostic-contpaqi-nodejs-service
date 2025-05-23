import { cwd } from 'node:process';

export enum SyncUserEnum {
  BASE = 'db/base_template.xlsx',
}

export namespace SyncUserEnum {
  export function getPath(key: SyncUserEnum): string {
    return `${cwd()}/${key}`;
  }

  export function toArray() {
    return [
      {
        key: SyncUserEnum.BASE,
        value: getPath(SyncUserEnum.BASE),
      },
    ];
  }

  export function keys() {
    return [SyncUserEnum.BASE];
  }
}
