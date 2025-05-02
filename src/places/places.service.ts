import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Place, PlaceDocument } from './schemas/place.schema';
import { Model } from 'mongoose';
import { FindPlacesDto } from './dto/find-place.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const existingPlace = await this.placeModel.findOne({
      slug: createPlaceDto.slug,
    });
    if (existingPlace) {
      throw new HttpException('Trùng lặp slug', HttpStatus.BAD_REQUEST);
    }
    const newPlace = new this.placeModel(createPlaceDto);
    return await newPlace.save();
  }

  async findAll(): Promise<Place[]> {
    return await this.placeModel.find().exec();
  }

  async findOne(id: string, lang: string): Promise<Place | null> {
    try {
      const place = await this.placeModel
        .findById(id)
        .select('-__v -createdAt -updatedAt')
        .populate({
          path: 'descriptions',
          match: { language: lang },
          select: '-__v -createdAt -updatedAt -aiDesc -city',
          populate: {
            path: 'audios',
            select: '-__v -createdAt -updatedAt',
          },
        })
        .lean()
        .exec();
      return place;
    } catch (e) {
      throw new HttpException(
        'Lỗi khi lấy populate',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }

  async findNearby(findPlacesDto: FindPlacesDto): Promise<Place[]> {
    const { longitude, latitude, distance, language } = findPlacesDto;
    const places = await this.placeModel
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: distance,
          },
        },
      })
      .select('-__v -createdAt -updatedAt')
      .populate({
        path: 'descriptions',
        match: { language },
        select: 'name'
      })
      .exec();

    return places;
  }

  async update(
    id: string,
    updatePlaceDto: UpdatePlaceDto,
  ): Promise<Place | null> {
    return await this.placeModel
      .findByIdAndUpdate(id, updatePlaceDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Place | null> {
    return await this.placeModel.findByIdAndDelete(id).exec();
  }
}
