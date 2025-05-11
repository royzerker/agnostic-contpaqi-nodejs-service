import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class updateProfileDto {
	@IsString()
	@ApiProperty()
	avatar: string
}
