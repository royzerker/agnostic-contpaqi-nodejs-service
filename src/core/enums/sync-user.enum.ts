import { cwd } from 'node:process';

export enum SyncUserEnum {
  BASE = 'db/base_template.xlsx',
  CONTPAQI = 'db/TEMPLATE_CONTPAQI_BD.xlsx',
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
      {
        key: SyncUserEnum.CONTPAQI,
        value: getPath(SyncUserEnum.CONTPAQI),
      },
    ];
  }

  export function keys() {
    return [SyncUserEnum.BASE, SyncUserEnum.CONTPAQI];
  }
}
