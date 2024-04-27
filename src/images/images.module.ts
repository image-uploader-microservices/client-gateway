import { Module } from '@nestjs/common';

import { ImagesController } from './images.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  controllers: [
    ImagesController
  ],
  imports: [
    NatsModule,
  ],
})
export class ImagesModule { }
