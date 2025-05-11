import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { SyncUserEnum } from 'src/core/enums/sync-user.enum';

export class SyncQueryDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, enum: SyncUserEnum.keys() })
  @IsEnum(SyncUserEnum)
  filePath: SyncUserEnum;

  constructor(partial?: Partial<SyncQueryDto>) {
    Object.assign(this, partial);
  }
}
