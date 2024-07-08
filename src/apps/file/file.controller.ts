import {
  BadRequestException,
  Controller,
  Get,
  Header,
  Headers,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, statSync } from 'fs';
import { FileService } from './file.service';
import { join, basename, extname } from 'path';

@Controller('file')
export class FileController {
  constructor(private service: FileService) {}

  @Get('stream/:path')
  @Header('Access-Control-Allow-Origin', '*')
  async getStreamVideo(
    @Param('path') path: string,
    @Headers() headers,
    @Res() res: Response,
  ) {
    const range = headers.range;
    const videoPath = this.service.generatePathRootFile(path);
    if (
      !this.service.checkExistingFile(path) ||
      !this.service.validateVideoFormat(path)
    ) {
      throw new BadRequestException('File không đúng');
    }
    const videoSize = statSync(videoPath).size;
    if (!range) {
      const head = {
        'Content-Length': videoSize,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
      };

      res.writeHead(200, head); //200
      createReadStream(videoPath).pipe(res);
    } else {
      const CHUNK_SIZE = 10 ** 6;
      const start = Number(range.replace(/\D/g, ''));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
      const contentLength = end - start + 1;
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, headers);
      const videoStream = createReadStream(videoPath, { start, end });
      videoStream.pipe(res);
    }
  }
  @Get('check/:path')
  async check_file(@Param('path') path: string) {
    return this.service.checkExistingFile(path);
  }

  @Header('Access-Control-Allow-Origin', '*')
  @Get('sub/:path')
  async sub(@Param('path') path: string, @Res() res: Response) {
    if (
      !this.service.checkExistingFile(path) ||
      !this.service.validateSubFormat(path)
    ) {
      throw new BadRequestException('File không đúng');
    }
    const path_file = await this.service.srtTovtt(path);
    if (path_file) {
      const file = createReadStream(path_file);
      file.pipe(res);
    } else return '';
  }

  @Header('Access-Control-Allow-Origin', '*')
  @Get('sub-download/:path')
  async sub_down(@Param('path') path: string, @Res() res: Response) {
    if (
      !this.service.checkExistingFile(path) ||
      !this.service.validateSubFormat(path)
    ) {
      throw new BadRequestException('File không đúng');
    }
    const path_file = await this.service.srtTovtt(path);
    // const file = createReadStream(path_file);
    const filename = basename(path);
    const ext = extname(path);
    res.set({
      'Content-Type': 'application/' + ext,
      'Content-Disposition': 'attachment; filename="' + filename + '"',
    });

    res.download(path_file);
  }

  @Header('Access-Control-Allow-Origin', '*')
  @Get('static/:path')
  async static(@Param('path') path: string, @Res() res: Response) {
    if (!this.service.checkExistingFile(path)) {
      throw new BadRequestException('File không đúng');
    }
    const path_file = await this.service.srtTovtt(path);
    if (path_file) {
      // const file = createReadStream(path_file);
      const videoSize = statSync(path_file).size;
      // const head = {
      //   'Content-Length': videoSize,
      //   'Content-Type': 'video/mp4',
      // };

      // res.writeHead(200, head);
      // file.pipe(res);
      res.sendFile(path_file);
    } else return '';
  }
}
