import { Controller, Get, UseInterceptors, UploadedFile, Post, Res, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { PassThrough } from 'stream';
import { Response } from 'express';
import imageminWebp from 'imagemin-webp';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('convert')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async postImage(@UploadedFile() file: Express.Multer.File, @Res() res: Response, @Query() options: imageminWebp.Options) {
    res.set('Content-Type', 'image/webp');
    const bufferStream = new PassThrough();
    bufferStream.end(await this.appService.convert(file.buffer, options));
    bufferStream.pipe(res);
  }
  @Get('convert')
  showConvertExample() {
    return `<form method="post" enctype ="multipart/form-data"><input type="file" name="file"/><input type="submit" value="Submit" /></form>`
  }
}
