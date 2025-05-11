import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { PhoneDto } from 'src/core/dtos/phone.dto'

export class ProfileDto {
	@ApiProperty()
	@IsNotEmpty()
	id: string

	@ApiProperty()
	@IsNotEmpty()
	firstName: string

	@ApiProperty()
	@IsNotEmpty()
	paternalLastName: string

	@ApiProperty()
	@IsNotEmpty()
	maternalLastName: string

	@ApiProperty()
	@IsNotEmpty()
	email: string

	@ApiProperty({ type: PhoneDto })
	phone: PhoneDto

	@ApiProperty()
	@IsNotEmpty()
	occupation: string

	@ApiProperty()
	profile: string

	@ApiProperty()
	@IsNotEmpty()
	countryId: string

	@ApiPropertyOptional()
	@IsOptional()
	avatar: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	bio: string

	@ApiPropertyOptional()
	isOldUser?: boolean

	constructor(partial?: Partial<ProfileDto>) {
		Object.assign(this, partial)
	}
}
