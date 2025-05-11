import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AsyncLocalStorage } from 'async_hooks';
import * as crypto from 'crypto';
import { BaseUserDto } from 'src/core/dtos';
import { AUTH_STORAGE } from 'src/core/services/auth-storage/auth-storage.constants';
import { AuthStorageType } from 'src/core/services/auth-storage/auth-storage.type';
import { RedisService } from 'src/modules/infrastructure/redis';
import { AuthDto, AuthResponseDto } from './dto/auth.dto';

type Payload = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  country: string;
  active: boolean;
};

@Injectable()
export class AuthService {
  readonly #_logger = new Logger(AuthService.name);

  constructor(
    @Inject(AUTH_STORAGE)
    private asyncLocalStorage: AsyncLocalStorage<AuthStorageType>,
    // private readonly userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async signIn(
    { email }: AuthDto,
    headers: Record<string, string>,
  ): Promise<AuthResponseDto> {
    this.#_logger.log(`inside ${this.constructor.name}.${this.signIn.name}()`);

    this.#_logger.log(`Headers: ${JSON.stringify(headers)}`);
    const localStorage = this.asyncLocalStorage.getStore?.();

    this.#_logger.log(
      `LocalStorage: ${JSON.stringify(localStorage?.authRequestHeaders)}`,
    );

    // const user = await this.userService.validateEmail(
    //   email.toLocaleLowerCase(),
    // );

    // if (!user) {
    //   throw new UnauthorizedException(`El email ${email} no existe`);
    // }

    // const id = user._id.toHexString();

    // /**
    //  * Payload
    //  */
    // const payload = <Payload>{
    //   id,
    //   email: user.email,
    //   fullName: user.fullName,
    //   role: user.role,
    //   country: user.countryId,
    //   active: user.active,
    // };

    /**
     * Create token
     */
    // const access_token = await this.jwtService.signAsync(payload);

    /**
     * Hash token
     */
    // const hashedToken = this.#_hashToken(access_token);

    // const redisKey = `auth:${id}:tokens`;

    // const tokens = await this.redisService.lrange(redisKey, 0, -1);

    // this.#_logger.log(`Tokens: ${tokens}`);

    // if (tokens.length > 5) {
    //   throw new UnauthorizedException(
    //     `Ya has iniciado sesión en el máximo de dispositivos permitidos. Cierra sesión en uno de tus dispositivos para continuar.`,
    //   );
    // }

    /**
     * Agregar token a la lista de tokens
     */
    // await this.redisService.lpush(redisKey, hashedToken); // Agregar token a la lista de tokens
    // await this.redisService.ltrim(redisKey, 0, 1); // Solo se permiten 2 tokens por usuario
    // await this.redisService.expire(redisKey, 7 * 24 * 60 * 60); // Expira en 7 días

    // /**
    //  * Actualizar el estado de login
    //  */
    // // await this.userService.updateLogin(id);

    // return new AuthResponseDto({
    //   id: user._id.toHexString(),
    //   email: user.email,
    //   fullName: user.fullName,
    //   role: user.role,
    //   access_token,
    // });
    return new AuthResponseDto({});
  }

  async signOut(userId: string, token: string): Promise<void> {
    const redisKey = `auth:${userId}:tokens`;
    const hashedToken = this.#_hashToken(token);

    try {
      const tokenExists = await this.redisService.lpos(redisKey, hashedToken);

      if (!tokenExists) {
        throw new UnauthorizedException(
          `El token proporcionado no se encontró para el usuario ${userId}`,
        );
      }

      await this.redisService.lrem(redisKey, 0, hashedToken);

      this.#_logger.log(`Sesión cerrada para el usuario ${userId}`);
    } catch (error) {
      this.#_logger.error(
        `Error cerrando sesión para el usuario ${userId}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async verify(userId: string, token: string): Promise<boolean> {
    const redisKey = `auth:${userId}:tokens`;
    const tokens = await this.redisService.lrange(redisKey, 0, -1);

    const hashedToken = this.#_hashToken(token);
    return tokens.includes(hashedToken);
  }

  async revokedTokens(email: string): Promise<void> {
    // const user = await this.userService.validateEmail(
    //   email.toLocaleLowerCase(),
    // );
    // if (!user) {
    //   throw new UnauthorizedException(`El email ${email} no existe`);
    // }
    // const id = user._id.toHexString();
    // const redisKey = `auth:${id}:tokens`;
    // await this.redisService.del(redisKey);
    // this.#_logger.log(`Todos los tokens revocados para el usuario ${email}`);
  }

  async profile(userId: string): Promise<BaseUserDto> {
    // const user = await this.userService.findById(userId);

    // if (!user) {
    //   throw new UnauthorizedException(`El usuario ${userId} no existe`);
    // }

    return new BaseUserDto({});
  }

  #_hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}
