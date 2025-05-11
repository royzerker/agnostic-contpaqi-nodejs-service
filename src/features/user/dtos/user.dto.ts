import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserQueryDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  term?: string;

  @ApiProperty({ default: 10 })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  pageSize: number;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  pageNumber: number;
}

export class UserDto {
  @ApiProperty()
  id: string;

  @IsString()
  @ApiPropertyOptional()
  fullName?: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  lastName?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  firstLogin?: boolean;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  firstLoginAt?: Date;

  @IsOptional()
  @IsString()
  roleId?: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}

export class UserResponseDto {
  @ApiProperty()
  totalItems: number;

  @ApiProperty({ type: [UserDto] })
  items: UserDto[];

  constructor(partial?: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
