export class FileS3Dto {
	imageUrl: string
	key: string

	constructor(partial?: Partial<FileS3Dto>) {
		Object.assign(this, partial)
	}
}
