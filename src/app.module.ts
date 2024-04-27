import { Module } from '@nestjs/common';

import { NatsModule } from './transports/nats.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    NatsModule,
    ImagesModule,
  ],
})
export class AppModule { }
