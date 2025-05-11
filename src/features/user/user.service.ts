import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/infrastructure/prisma/prisma.service';
import { UserDto, UserQueryDto, UserResponseDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  readonly #_logger = new Logger(UserService.name);
  #_prismaClient: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prismaClient = prisma;
  }

  async validateEmail(email: string): Promise<User> {
    this.#_logger.log(
      `inside ${this.constructor.name}.${this.validateEmail.name}`,
    );

    const user = await this.#_prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ConflictException(`El usuario con email ${email} no existe`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    this.#_logger.log(
      `inside ${this.constructor.name}.${this.findByEmail.name}`,
    );

    const user = await this.#_prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ConflictException(`El usuario con email ${email} no existe`);
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    this.#_logger.log(`inside ${this.constructor.name}.${this.findById.name}`);

    const user = await this.#_prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new ConflictException(`El usuario con id ${id} no existe`);
    }

    return user;
  }

  async delete(id: string): Promise<void> {
    this.#_logger.log(`inside ${this.constructor.name}.${this.delete.name}`);

    const user = await this.#_prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new ConflictException(`El usuario con id ${id} no existe`);
    }

    await this.#_prismaClient.user.delete({
      where: {
        id,
      },
    });
  }

  async updateLogin(id: string): Promise<void> {
    this.#_logger.log(
      `inside ${this.constructor.name}.${this.updateLogin.name}`,
    );

    const user = await this.#_prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new ConflictException(`El usuario con id ${id} no existe`);
    }

    if (user?.firstLogin) {
      await this.#_prismaClient.user.update({
        where: {
          id,
        },
        data: {
          firstLoginAt: new Date(),
          countLogins: (user.countLogins ?? 0) + 1,
        },
      });
    } else {
      await this.#_prismaClient.user.update({
        where: {
          id,
        },
        data: {
          firstLogin: true,
          firstLoginAt: new Date(),
          countLogins: 1,
        },
      });
    }
  }

  async list({
    pageNumber,
    pageSize,
    term,
  }: UserQueryDto): Promise<UserResponseDto> {
    this.#_logger.log(`inside ${this.constructor.name}.${this.list.name}()`);

    const page = Math.max(pageNumber, 1);
    const limit = Math.max(pageSize, 1);
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    if (term) {
      filter.fullName = { $regex: term, $options: 'i' };
    }

    try {
      const [users, totalItems] = await Promise.all([
        this.#_prismaClient.user.findMany({
          where: {
            OR: [
              { fullName: { contains: term, mode: 'insensitive' } },
              { email: { contains: term, mode: 'insensitive' } },
              { id: { contains: term, mode: 'insensitive' } },
            ],
          },
          take: limit,
          skip,
        }),

        this.#_prismaClient.user.count({
          where: {
            OR: [
              { fullName: { contains: term, mode: 'insensitive' } },
              { email: { contains: term, mode: 'insensitive' } },
              { id: { contains: term, mode: 'insensitive' } },
            ],
          },
        }),
      ]);

      this.#_logger.log(
        `Found ${users.length} users matching '${term}' on page ${page}`,
      );

      return new UserResponseDto({
        items: users.map(this.#mapDocumentToDto),
        totalItems,
      });
    } catch (error) {
      this.#_logger.error(
        `Error in ${this.list.name}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  #mapDocumentToDto(document: User): UserDto {
    const user = new UserDto({});
    user.id = document.id;
    user.fullName = document?.fullName ?? undefined;
    user.firstName = document?.firstName ?? undefined;
    user.lastName = document?.lastName ?? undefined;
    user.email = document.email!;
    user.firstLogin = document?.firstLogin ?? false;
    user.firstLoginAt = document?.firstLoginAt ?? undefined;
    user.roleId = document?.roleId ?? undefined;

    return user;
  }
}
