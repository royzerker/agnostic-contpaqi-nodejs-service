import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators';
import { SyncQueryDto } from './dtos';
import { SyncUserTool } from './sync-user.tool';

@ApiTags('Sync')
@Controller({ path: 'sync' })
export class SyncUserController {
  constructor(private readonly syncTool: SyncUserTool) {}

  @Get()
  @Public()
  @ApiOkResponse({
    description: 'Sync data from an Excel file to the database',
  })
  async execute(@Query() syncQueryDto: SyncQueryDto): Promise<void> {
    await this.syncTool.execute(syncQueryDto);
  }
}
