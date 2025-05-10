import { Module } from '@nestjs/common';
import { VideoModule } from './features/video/video.module';
import { ConfigModule } from './modules/infrastructure/config/config.module';
import { PrismaModule } from './modules/infrastructure/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      folder: './config',
    }),
    PrismaModule,

    /**
     * Features
     */
    VideoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
