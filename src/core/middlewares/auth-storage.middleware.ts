import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { AsyncLocalStorage } from 'node:async_hooks'
import { AuthStorageType } from 'src/core/services/auth-storage/auth-storage.type'
import { AUTH_STORAGE } from '../services/auth-storage/auth-storage.constants'

@Injectable()
export class AuthStorageMiddleware implements NestMiddleware {
	readonly #_logger = new Logger(AuthStorageMiddleware.name)
	readonly #asyncLocalStorage: AsyncLocalStorage<AuthStorageType>

	constructor(@Inject(AUTH_STORAGE) authStorage: AsyncLocalStorage<AuthStorageType>) {
		this.#asyncLocalStorage = authStorage
	}

	use(req: FastifyRequest, res: any, next: () => void): void {
		const authRequestHeaders: Record<string, string> = {}

		if (req.headers['x-company-id']) {
			authRequestHeaders['x-company-id'] = req.headers['x-company-id'] as string
		}

		if (req.headers['x-user-id']) {
			authRequestHeaders['x-user-id'] = req.headers['x-user-id'] as string
		}

		const authStorage: AuthStorageType = {
			authRequestHeaders
		}

		// const eid = async_hooks?.executionAsyncId?.()
		// this.#_logger.log(`Execution ID: ${eid}`)

		// const tid = async_hooks?.triggerAsyncId?.()
		// this.#_logger.log(`Trigger ID: ${tid}`)

		// const asyncHook = async_hooks.createHook({
		// 	init: (asyncId, type, triggerAsyncId, resource) => {
		// 		this.#_logger.log(`Init: ${asyncId} ${type} ${triggerAsyncId}`)
		// 	},
		// 	destroy: asyncId => {
		// 		this.#_logger.log(`Destroy: ${asyncId}`)
		// 	}
		// })

		this.#asyncLocalStorage.run(authStorage, () => {
			next()
		})
	}
}
