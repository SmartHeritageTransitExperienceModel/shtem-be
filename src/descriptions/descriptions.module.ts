import { Module } from '@nestjs/common';
import { DescriptionsService } from './descriptions.service';
import { DescriptionsController } from './descriptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Description, DescriptionSchema } from './schemas/description.schema';
import { Place, PlaceSchema } from 'src/places/schemas/place.schema';
import { Audio, AudioSchema } from 'src/audios/schemas/audio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Description.name, schema: DescriptionSchema },
      { name: Place.name, schema: PlaceSchema },
      { name: Audio.name, schema: AudioSchema },
    ]),
  ],
  controllers: [DescriptionsController],
  providers: [DescriptionsService],
})
export class DescriptionsModule {}
