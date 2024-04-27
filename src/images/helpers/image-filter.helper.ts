import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

export const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: Function
) => {
  if (!file) {
    return callback(
      new BadRequestException('You must attach an image to upload'),
      false,
    );
  };

  const fileExtension: string = file.mimetype.split('/')[1];

  const validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif']

  if (!validExtensions.includes(fileExtension)) {
    return callback(
      new BadRequestException(`Make sure the file you are attaching is an image`),
      false,
    );
  };

  return callback(null, true);
}