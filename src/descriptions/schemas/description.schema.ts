import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Place } from '../../places/schemas/place.schema';

export type DescriptionDocument = Description & Document;

@Schema({
  timestamps: true,
  collection: 'descriptions',
})
export class Description {
  @Prop({ type: Types.ObjectId, ref: Place.name, required: true })
  place: Types.ObjectId;

  @Prop({ type: String, required: true, trim: true })
  language: string;

  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  address: string;

  @Prop({ type: String, required: true, trim: true })
  city: string;

  @Prop({ type: String, required: true, trim: true })
  content: string;

  @Prop({ type: String, required: true, trim: true })
  aiDesc: string;
}

export const DescriptionSchema = SchemaFactory.createForClass(Description);
DescriptionSchema.index({ place: 1, language: 1 }, { unique: true });
DescriptionSchema.virtual('audios', {
  ref: 'Audio', 
  localField: '_id',
  foreignField: 'description', 
  options: { sort: { voice: 1 } },
});