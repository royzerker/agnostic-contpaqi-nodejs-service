import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators';
import { UserQueryDto, UserResponseDto } from './dtos/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller({ path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  @ApiOkResponse({ type: UserResponseDto })
  async list(@Query() dto: UserQueryDto): Promise<UserResponseDto> {
    return await this.userService.list(dto);
  }
}
