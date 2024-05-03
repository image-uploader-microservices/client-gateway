import { BadRequestException, Controller, Get, HttpStatus, Inject, Param, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ClientProxy, RpcException, } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';

import { NATS_SERVICE } from '../config';
import { imageFilter } from './helpers/image-filter.helper';
import { catchError } from 'rxjs';

@Controller()
export class ImagesController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    fileFilter: imageFilter,
  }))
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'You must insert an image to upload',
      });
    }

    return this.client.send('uploadImage', { image });
  }

  @Get('')
  findAll() {
    return this.client.send('findAllImages', '')
      .pipe(
        catchError(err => { throw new RpcException(err) }),
      );
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.client.send('findOneImage', { id })
      .pipe(
        catchError(err => { throw new RpcException(err) }),
      );
  }

  // @MessagePattern('updateImage')
  // update(@Payload() updateImageDto: UpdateImageDto) {
  //   return this.imagesService.update(updateImageDto.id, updateImageDto);
  // }

  // @MessagePattern('removeImage')
  // remove(@Payload() id: number) {
  //   return this.imagesService.remove(id);
  // }
}
