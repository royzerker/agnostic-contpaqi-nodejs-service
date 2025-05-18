import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import {
  UpserVideoDto,
  UpserVideoResponseDto,
  VideoIdDto,
} from './dtos/upsert-video.dto';
import { VideoService } from './video.service';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Put(':id')
  async create(
    @Param() videoIdDto: VideoIdDto,
    @Body() upserVideoDto: UpserVideoDto,
  ): Promise<UpserVideoResponseDto> {
    return await this.videoService.upsert(videoIdDto, upserVideoDto);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<UpserVideoResponseDto> {
    return await this.videoService.get(id);
  }
}
