import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaceDocument = Place & Document;

class GeoLocation {
  @Prop({ type: String, enum: ['Point'], required: true })
  type: 'Point';

  @Prop({ type: [Number], required: true })
  coordinates: [number, number];
}

@Schema({
  timestamps: true, 
  collection: 'places', 
  toJSON: { virtuals: true, versionKey: false },
  toObject: { virtuals: true, versionKey: false },
})
export class Place {
  @Prop({ type: GeoLocation, required: true })
  location: GeoLocation;

  @Prop({ type: String, unique: true, required: true, trim: true })
  slug: string;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const PlaceSchema = SchemaFactory.createForClass(Place);

PlaceSchema.index({ location: '2dsphere' });
PlaceSchema.index({ slug: 1 });

PlaceSchema.virtual('descriptions', {
  ref: 'Description', 
  localField: '_id',
  foreignField: 'place', 
  options: { sort: { language: 1 } },
});