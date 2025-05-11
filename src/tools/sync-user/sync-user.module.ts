import { Module } from '@nestjs/common';
import { SyncUserController } from './sync-user.controller';
import { SyncUserFactory } from './sync-user.factory';

@Module({
  imports: [],
  controllers: [SyncUserController],
  providers: [SyncUserFactory],
})
export class SyncUserModule {}
