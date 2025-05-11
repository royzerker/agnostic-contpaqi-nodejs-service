import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
	@ApiProperty()
	email: string
}

export class AuthResponseDto {
	@ApiProperty()
	id: string

	@ApiProperty()
	email: string

	// @ApiProperty()
	// firstName: string

	// @ApiProperty()
	// lastName: string
	@ApiProperty()
	fullName: string

	@ApiProperty()
	role: string

	@ApiProperty()
	access_token: string

	constructor(partial?: Partial<AuthResponseDto>) {
		Object.assign(this, partial)
	}
}
