import { Module } from '@nestjs/common'
import { AsyncLocalStorage } from 'node:async_hooks'
import { AUTH_STORAGE } from './auth-storage.constants'
import { AuthStorageType } from './auth-storage.type'

@Module({
	providers: [
		{
			provide: AUTH_STORAGE,
			useValue: new AsyncLocalStorage<AuthStorageType>()
		}
	],
	exports: [AUTH_STORAGE]
})
export class AuthStorageModule {}
