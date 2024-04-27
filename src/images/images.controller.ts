import { BadRequestException, Controller, HttpStatus, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ClientProxy, RpcException, } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';

import { NATS_SERVICE } from '../config';
import { imageFilter } from './helpers/image-filter.helper';

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

  // @MessagePattern('findAllImages')
  // findAll() {
  //   return this.imagesService.findAll();
  // }

  // @MessagePattern('findOneImage')
  // findOne(@Payload() id: number) {
  //   return this.imagesService.findOne(id);
  // }

  // @MessagePattern('updateImage')
  // update(@Payload() updateImageDto: UpdateImageDto) {
  //   return this.imagesService.update(updateImageDto.id, updateImageDto);
  // }

  // @MessagePattern('removeImage')
  // remove(@Payload() id: number) {
  //   return this.imagesService.remove(id);
  // }
}
