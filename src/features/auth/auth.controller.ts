import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { Public, Token } from 'src/core/decorators';
import { BaseUserDto } from 'src/core/dtos';
import { UserIdDto } from 'src/core/dtos/user-id.dto';
import { AuthService } from './auth.service';
import { AuthDto, AuthResponseDto } from './dto/auth.dto';
import { RevokedTokensDto } from './dto/revoked-tokens.dto';

@ApiTags('Authentication')
@Controller({ path: 'authentication' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  // @Post('register')
  // @ApiOperation({ summary: 'User Registration' })
  // @ApiNoContentResponse({
  //   description: 'User registered successfully',
  // })
  // async signUp(
  //   @Body() dto: RegisterDto,
  //   @Req() req: FastifyRequest,
  // ): Promise<void> {
  //   const headers: Record<string, string> = req.headers as Record<
  //     string,
  //     string
  //   >;

  //   headers['x-forwarded-for'] = req.ip;
  //   headers['user-agent'] = req.headers['user-agent'] || '';
  //   headers['accept-language'] = req.headers['accept-language'] || '';

  //   await this.authService.signUp(dto, headers);
  // }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiOkResponse({ description: 'User logged in', type: AuthResponseDto })
  async signIn(
    @Body() dto: AuthDto,
    @Req() req: FastifyRequest,
  ): Promise<AuthResponseDto> {
    const headers: Record<string, string> = req.headers as Record<
      string,
      string
    >;

    headers['x-forwarded-for'] = req.ip;
    headers['user-agent'] = req.headers['user-agent'] || '';
    headers['accept-language'] = req.headers['accept-language'] || '';

    return await this.authService.signIn(dto, headers);
  }

  @ApiBearerAuth()
  @Post('logout')
  @ApiOperation({ summary: 'User Logout' })
  @ApiOkResponse({ description: 'User logged out' })
  async signOut(@Body() dto: UserIdDto, @Token() token: string): Promise<void> {
    console.log('token', token);
    console.log('dto', dto);

    await this.authService.signOut(dto.id, token);
  }

  @Public()
  @Get('profile/:id')
  @ApiOperation({ summary: 'User Profile' })
  @ApiOkResponse({ description: 'User profile', type: BaseUserDto })
  async profile(@Param() { id }: UserIdDto): Promise<BaseUserDto> {
    return await this.authService.profile(id);
  }

  @Public()
  @Post('revoked-tokens')
  @ApiOperation({ summary: 'Revoked Tokens' })
  @ApiOkResponse({ description: 'Revoked tokens' })
  async revokedTokens(@Body() { email }: RevokedTokensDto): Promise<void> {
    await this.authService.revokedTokens(email);
  }

  @ApiBearerAuth()
  @Get('verify/:id')
  @ApiOperation({ summary: 'Verify Token' })
  @ApiOkResponse({ description: 'Token verified' })
  async verify(
    @Param() { id }: UserIdDto,
    @Token() token: string,
  ): Promise<boolean> {
    return await this.authService.verify(id, token);
  }
}
