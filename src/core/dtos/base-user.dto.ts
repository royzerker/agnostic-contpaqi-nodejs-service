import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { RoleEnum } from '../enums/role.enum';

export class BaseUserDto {
  @ApiProperty()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional({ type: String, enum: RoleEnum })
  role: RoleEnum;

  constructor(partial?: Partial<BaseUserDto>) {
    Object.assign(this, partial);
  }
}
