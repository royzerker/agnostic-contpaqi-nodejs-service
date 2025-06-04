import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators';
import { ReportService } from './report.service';

@ApiTags('Report')
@Controller({ path: 'report' })
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Public()
  @Get()
  @ApiOkResponse({ description: 'Report' })
  async getReport(): Promise<void> {
    await this.reportService.execute();
  }
}
