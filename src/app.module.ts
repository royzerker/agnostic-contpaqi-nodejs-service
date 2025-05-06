import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/infrastructure/config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      folder: './config',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
