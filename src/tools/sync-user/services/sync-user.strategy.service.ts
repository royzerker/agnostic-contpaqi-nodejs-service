import { Injectable, Logger } from '@nestjs/common';
import { SyncUserService } from '../interfaces';

@Injectable()
export class SyncUserBaseStrategyService implements SyncUserService {
  readonly #_logger = new Logger(SyncUserBaseStrategyService.name);

  constructor() {}

  async submit(request: unknown[], idx: number): Promise<void> {
    this.#_logger.log(`inside ${this.constructor.name}.${this.submit.name}()`);

    // const operations: AnyBulkWriteOperation<UserDocument>[] = []

    // for (const item of request) {
    // 	operations.push({
    // 		insertOne: {
    // 			document: {
    // 				...this.#mapToUserDocument(item as unknown[])
    // 			}
    // 		}
    // 	})
    // }

    // this.#_logger.log(`Operations ${JSON.stringify(operations)}`)

    // if (operations.length > 0) {
    // 	this.#_logger.log(`Bulk writing ${operations.length} documents.`)
    // 	await this.#_datasource.bulkWrite(operations)
    // }
  }
}
