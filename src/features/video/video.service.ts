import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/modules/infrastructure/prisma/prisma.service';
import {
  UpserVideoDto,
  UpserVideoResponseDto,
  VideoIdDto,
} from './dtos/upsert-video.dto';
import { VIDEO_ID } from './video.constants';

@Injectable()
export class VideoService {
  readonly #_logger = new Logger(VideoService.name);

  #_prismaClient: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prismaClient = prisma;
  }

  async upsert(
    videoIdDto: VideoIdDto,
    data: UpserVideoDto,
  ): Promise<UpserVideoResponseDto> {
    this.#_logger.log(`inside ${this.constructor.name} create method`);

    const ID = VIDEO_ID || videoIdDto.id;

    try {
      const video = await this.#_prismaClient.video.upsert({
        where: { id: ID },
        update: {
          title: data?.title,
          iframeUrl: data.iframeUrl,
          updatedAt: new Date(),
        },
        create: {
          id: ID,
          title: data?.title,
          iframeUrl: data.iframeUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return new UpserVideoResponseDto({
        title: video?.title ?? undefined,
        iframeUrl: video.iframeUrl,
        updatedAt: video.updatedAt.valueOf(),
        createdAt: video.createdAt.valueOf(),
      });
    } catch (err) {
      this.#_logger.error(`Error creating video: ${err.message}`);
      throw err;
    }
  }

  async get(id: string): Promise<UpserVideoResponseDto> {
    this.#_logger.log(`inside ${this.constructor.name} get method`);

    try {
      const video = await this.#_prismaClient.video.findUnique({
        where: { id },
      });

      if (!video) {
        throw new Error('Video not found');
      }

      return new UpserVideoResponseDto({
        title: video?.title ?? undefined,
        iframeUrl: video.iframeUrl,
        updatedAt: video.updatedAt.valueOf(),
        createdAt: video.createdAt.valueOf(),
      });
    } catch (err) {
      this.#_logger.error(`Error getting video: ${err.message}`);
      throw err;
    }
  }
}
