import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Video } from '../model/video.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { VideoService } from '../model/video.service';

@Controller('/api/v1/video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  async createBook(
    @Res() response,
    @Req() request,
    @Body() video: Video,
    @UploadedFile()
    files: { video?: Express.Multer.File[]; cover?: Express.Multer.File[] },
  ) {
    const requestBody = {
      createdBy: request.user,
      titgle: video.title,
      video: files.video[0].filename,
      coverImage: files.cover[0].filename,
    };

    const newVideo = await this.videoService.createVideo(requestBody);
    return response.status(HttpStatus.CREATED).json({
      newVideo,
    });
  }
  @Get()
  // eslint-disable-next-line @typescript-eslint/ban-types
  async read(@Query() id): Promise<Object> {
    return await this.videoService.readVideo(id);
  }

  @Get('/:id')
  async stream(@Param('id') id, @Res() response, @Req() request) {
    return this.videoService.streamVideo(id, response, request);
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() video: Video) {
    const updatedVideo = await this.videoService.update(id, video);
    return response.status(HttpStatus.OK).json(updatedVideo);
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    await this.videoService.delete(id);
    return response.status(HttpStatus.OK).json({
      user: null,
    });
  }
}
