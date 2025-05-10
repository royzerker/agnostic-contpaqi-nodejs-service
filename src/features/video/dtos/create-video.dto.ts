import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @ApiPropertyOptional()
  title: string;

  @IsString()
  @ApiProperty()
  iframeUrl: string;
}
