import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Place, PlaceDocument } from './schemas/place.schema';
import { Model } from 'mongoose';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const createdPlace = new this.placeModel(createPlaceDto);
    return await createdPlace.save();
  }

  async findAll(): Promise<Place[]> {
    return await this.placeModel.find().exec();
  }

  async findOne(id: string): Promise<Place | null> {
    return await this.placeModel.findById(id);
  } 

  async update(id: string, updatePlaceDto: UpdatePlaceDto) {
    return await this.placeModel.findByIdAndUpdate(id, updatePlaceDto, { new: true }).exec();
  }

  async remove(id: string) {
    return await this.placeModel.findByIdAndDelete(id).exec();
  }
}
