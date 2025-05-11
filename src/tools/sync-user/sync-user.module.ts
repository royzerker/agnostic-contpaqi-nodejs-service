import { Module } from '@nestjs/common';
import { SyncUserBaseStrategyService } from './services/sync-user.strategy.service';
import { SyncUserController } from './sync-user.controller';
import { SyncUserFactory } from './sync-user.factory';
import { SyncUserTool } from './sync-user.tool';

@Module({
  imports: [],
  controllers: [SyncUserController],
  providers: [SyncUserFactory, SyncUserTool, SyncUserBaseStrategyService],
})
export class SyncUserModule {}
