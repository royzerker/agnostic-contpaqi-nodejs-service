import { Inject, Injectable } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RedisService {
	#_client: Redis

	constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

	async getClient(): Promise<Redis> {
		return this.redisClient
	}

	async sadd(key: string, value: string): Promise<number> {
		return await this.redisClient.sadd(key, value)
	}

	async srem(key: string, value: string): Promise<number> {
		return await this.redisClient.srem(key, value)
	}

	async smembers(key: string): Promise<string[]> {
		return await this.redisClient.smembers(key)
	}

	async set(key: string, value: string, ttlInSeconds?: number): Promise<void> {
		if (ttlInSeconds) {
			await this.redisClient.set(key, value, 'EX', ttlInSeconds)
		} else {
			await this.redisClient.set(key, value)
		}
	}

	async get(key: string): Promise<string | null> {
		return await this.redisClient.get(key)
	}

	async del(key: string): Promise<number> {
		return await this.redisClient.del(key)
	}

	async lpos(key: string, value: string): Promise<number> {
		return await this.redisClient.lpos(key, value)
	}

	/**
	 * @param key
	 * @param value
	 * @returns
	 * @description Add a value to the end of a list
	 */
	async lpush(key: string, value: string): Promise<number> {
		return await this.redisClient.lpush(key, value)
	}

	/**
	 * @param key
	 * @returns
	 * @description Remove and get the first element in a list
	 */
	async ltrim(key: string, start: number, stop: number): Promise<string> {
		return await this.redisClient.ltrim(key, start, stop)
	}

	/**
	 * @param key
	 * @param start
	 * @param stop
	 * @returns
	 * @description Get a range of elements from a list
	 */
	async lrange(key: string, start: number, stop: number): Promise<string[]> {
		return await this.redisClient.lrange(key, start, stop)
	}

	/**
	 * @param key
	 * @param count
	 * @param value
	 * @returns
	 * @description Remove elements from a list
	 */
	async lrem(key: string, count: number, value: string): Promise<number> {
		return await this.redisClient.lrem(key, count, value)
	}

	/**
	 *
	 * @param key
	 * @param ttlInSeconds
	 * @returns  1 if the timeout was set, 0 if key does not exist
	 */
	async expire(key: string, ttlInSeconds: number): Promise<number> {
		return await this.redisClient.expire(key, ttlInSeconds)
	}

	/**
	 *
	 * @param key
	 * @returns
	 * @description Remove and get the last element
	 */

	async rpop(key: string): Promise<string> {
		return await this.redisClient.rpop(key)
	}
}
