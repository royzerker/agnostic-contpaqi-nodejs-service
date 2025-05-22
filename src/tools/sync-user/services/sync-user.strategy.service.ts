import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/infrastructure/prisma/prisma.service';
import { SyncUserService } from '../interfaces';

@Injectable()
export class SyncUserBaseStrategyService implements SyncUserService {
  #_prismaClient: PrismaService;
  readonly #_logger = new Logger(SyncUserBaseStrategyService.name);

  constructor(prisma: PrismaService) {
    this.#_prismaClient = prisma;
  }

  async submit(request: unknown[], idx: number): Promise<void> {
    this.#_logger.log(`inside ${this.constructor.name}.${this.submit.name}()`);

    const mappedUsers = request.map((item) => {
      const [email, firstName, lastName] = item as [string, string, string];
      return <User>{
        email,
        firstName,
        lastName: lastName ?? '',
        fullName: `${firstName} ${lastName}`.trim(),
      };
    });

    this.#_logger.verbose(`Mapped Users: ${JSON.stringify(mappedUsers)}`);

    if (mappedUsers.length > 0) {
      try {
        await this.#_prismaClient.user.createMany({
          data: mappedUsers,
        });

        this.#_logger.log(`Successfully inserted ${mappedUsers.length} users`);
      } catch (error) {
        this.#_logger.error('Failed to insert users:', error);
      }
    }
  }
}
