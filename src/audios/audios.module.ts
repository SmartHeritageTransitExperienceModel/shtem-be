import { Module } from '@nestjs/common';
import { AudiosService } from './audios.service';
import { AudiosController } from './audios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AudioSchema, Audio } from './schemas/audio.schema';
import {
  Description,
  DescriptionSchema,
} from 'src/descriptions/schemas/description.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Audio.name, schema: AudioSchema },
      { name: Description.name, schema: DescriptionSchema },
    ]),
  ],
  controllers: [AudiosController],
  providers: [AudiosService],
})
export class AudiosModule {}
