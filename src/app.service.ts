import { Injectable } from '@nestjs/common';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  convert(buffer: Buffer, options: imageminWebp.Options = {}) {
    return imagemin.buffer(buffer, {
      plugins: [imageminWebp(options)]
    });
  }
}
