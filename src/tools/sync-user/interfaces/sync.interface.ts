export interface SyncUserService<T extends object = Record<string, any>> {
  submit(request: T[], idx: number, isOnly?: boolean): Promise<void>;
}
