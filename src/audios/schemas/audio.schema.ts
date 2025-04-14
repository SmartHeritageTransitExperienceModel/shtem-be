import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Description } from 'src/descriptions/schemas/description.schema';

export type AudioDocument = Audio & Document;

@Schema({
  timestamps: true,
  collection: 'audios',
})

export class Audio {
  @Prop({ type: Types.ObjectId, ref: Description.name, required: true })
  description: Types.ObjectId;

  @Prop({ type: String, required: true, trim: true })
  voice: string;

  @Prop({ type: String, required: true, trim: true })
  url: string;
}

export const AudioSchema = SchemaFactory.createForClass(Audio);
