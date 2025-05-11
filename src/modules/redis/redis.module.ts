import { DynamicModule, Global, Module } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { ConfigService } from '../infrastructure/config/config.service';
import { RedisService } from './redis.service';

@Global()
@Module({})
export class RedisModule {
  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: 'REDIS_CLIENT',
          useFactory: (configService: ConfigService) => {
            const redisOptions: RedisOptions = {
              host: configService.getAndCheck('REDIS_HOST'),
              port: configService.getNumberAndCheck('REDIS_PORT'),
              // password: configService.getAndCheck('REDIS_PASSWORD'),
              // maxRetriesPerRequest: 2,
              // tls: {}
            };

            return new Redis(redisOptions);
          },
          inject: [ConfigService],
        },
        RedisService,
      ],
      exports: ['REDIS_CLIENT', RedisService],
    };
  }
}
