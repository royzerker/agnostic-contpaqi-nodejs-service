import { Body, Controller, Post } from '@nestjs/common';
import { Video } from '@prisma/client';
import { CreateVideoDto } from './dtos/create-video.dto';
import { VideoService } from './video.service';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
    return await this.videoService.create(createVideoDto);
  }
}
