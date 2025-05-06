import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from './modules/infrastructure/config/config.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    const db = this.configService.getAndCheck('DATABASE_URL');

    this.logger.log(`Database URL: ${db}`);

    return 'Hello World!';
  }
}
