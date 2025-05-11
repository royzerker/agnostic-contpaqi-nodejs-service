import { Global, Module } from '@nestjs/common';
import { AuthStorageMiddleware } from './middlewares/auth-storage.middleware';
import { AuthStorageModule } from './services/auth-storage/auth-storage.module';

@Global()
@Module({
  imports: [AuthStorageModule],
  providers: [AuthStorageMiddleware],
  exports: [AuthStorageModule],
})
export class CoreModule {}
