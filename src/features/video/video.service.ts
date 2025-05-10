import { Injectable, Logger } from '@nestjs/common';
import { Video } from '@prisma/client';
import { PrismaService } from 'src/modules/infrastructure/prisma/prisma.service';
import { CreateVideoDto } from './dtos/create-video.dto';

@Injectable()
export class VideoService {
  readonly #_logger = new Logger(VideoService.name);

  #_prismaClient: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prismaClient = prisma;
  }

  async create(data: CreateVideoDto): Promise<Video> {
    this.#_logger.log(`inside ${this.constructor.name} create method`);

    try {
      const video = await this.#_prismaClient.video.create({ data });
      return video;
    } catch (err) {
      this.#_logger.error(`Error creating video: ${err.message}`);
      throw err;
    }
  }
}
