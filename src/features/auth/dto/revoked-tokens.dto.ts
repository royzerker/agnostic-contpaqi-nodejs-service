import { ApiProperty } from '@nestjs/swagger'

export class RevokedTokensDto {
	@ApiProperty()
	email: string
}
