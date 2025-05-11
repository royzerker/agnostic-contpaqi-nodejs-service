import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VideoIdDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class UpserVideoDto {
  @IsString()
  @ApiPropertyOptional()
  title: string;

  @IsString()
  @ApiProperty()
  iframeUrl: string;
}

export class UpserVideoResponseDto {
  @IsString()
  @ApiPropertyOptional()
  title: string;

  @IsString()
  @ApiProperty()
  iframeUrl: string;

  @IsNumber()
  @ApiProperty({ type: Number, example: Date.now() })
  updatedAt: number;

  @IsNumber()
  @ApiProperty({ type: Number, example: Date.now() })
  createdAt: number;

  constructor(partial: Partial<UpserVideoResponseDto>) {
    Object.assign(this, partial);
  }
}
