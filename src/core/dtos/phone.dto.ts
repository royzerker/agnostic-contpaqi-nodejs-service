import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class PhoneDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	number: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	prefix: string

	constructor(partial?: Partial<PhoneDto>) {
		Object.assign(this, partial)
	}
}
