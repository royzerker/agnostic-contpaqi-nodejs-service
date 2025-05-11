import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { RolesGuard } from './core/guards/roles.guard';
import { AuthStorageMiddleware } from './core/middlewares/auth-storage.middleware';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';
import { VideoModule } from './features/video/video.module';
import { ConfigModule } from './modules/infrastructure/config/config.module';
import { PrismaModule } from './modules/infrastructure/prisma/prisma.module';
import { RedisModule } from './modules/infrastructure/redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      folder: './config',
    }),
    PrismaModule,
    CoreModule,
    RedisModule.forRoot(),

    /**
     * Features
     */
    VideoModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthStorageMiddleware).forRoutes('*');
  }
}
