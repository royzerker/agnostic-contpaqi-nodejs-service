// import { Injectable, Logger } from '@nestjs/common'
// import * as AWS from 'aws-sdk'
// import { ConfigService } from 'src/modules/infrastructure/config'
// import { FileS3Dto } from '../dtos/file-s3.dto'

// @Injectable()
// export class FileS3Service {
// 	readonly logger = new Logger(this.constructor.name)
// 	protected bucketName = this.configService.getAndCheck('AWS_BUCKET_NAME')
// 	#_s3: AWS.S3

// 	constructor(private readonly configService: ConfigService) {
// 		this.#_s3 = new AWS.S3({
// 			endpoint: this.configService.getAndCheck('AWS_ENDPOINT'),
// 			credentials: new AWS.Credentials({
// 				accessKeyId: this.configService.getAndCheck('AWS_ACCESS_KEY_ID'),
// 				secretAccessKey: this.configService.getAndCheck('AWS_SECRET_ACCESS_KEY')
// 			})
// 		})
// 	}

// 	async uploadFile(buffer: Buffer, filename: string): Promise<FileS3Dto> {
// 		this.logger.debug(`inside ${this.constructor.name}::uploadFile`)

// 		const params = {
// 			Bucket: this.bucketName,
// 			Key: filename,
// 			Body: buffer,
// 			ACL: 'public-read' //TODO: change this to private
// 		}

// 		const { Location, Key } = await this.#_s3.upload(params).promise()

// 		return new FileS3Dto({
// 			imageUrl: Location,
// 			key: Key
// 		})
// 	}
// }
