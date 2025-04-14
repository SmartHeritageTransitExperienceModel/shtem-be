import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaceDocument = Place & Document;

@Schema({
  timestamps: true, 
  collection: 'places', 
})
export class Place {
  @Prop({
    type: {
      type: String,
      enum: ['Point'], 
      required: true,
    },
    coordinates: {
      type: [Number], 
      required: true,
    },
  })
  location: {
    type: 'Point';
    coordinates: [number, number];
  };

  @Prop({ type: String, unique: true, required: true, trim: true })
  slug: string;

  @Prop({ type: [String], default: [] })
  image: string[];
}

export const PlaceSchema = SchemaFactory.createForClass(Place);

PlaceSchema.index({ location: '2dsphere' });