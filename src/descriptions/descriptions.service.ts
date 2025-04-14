import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Description, DescriptionDocument } from './schemas/description.schema';
import { Model, Types } from 'mongoose';
import { Place, PlaceDocument } from 'src/places/schemas/place.schema';

@Injectable()
export class DescriptionsService {
  constructor(
    @InjectModel(Description.name)
    private descriptionModel: Model<DescriptionDocument>,

    @InjectModel(Place.name)
    private placeModel: Model<PlaceDocument>,
  ) {}

  async create(
    createDescriptionDto: CreateDescriptionDto,
  ): Promise<Description> {
    const place = await this.placeModel.findById(createDescriptionDto.place);

    if (!place) {
      throw new HttpException(
        'Không tìm thấy địa điểm hợp lệ',
        HttpStatus.NOT_FOUND,
      );
    }

    const createdDescription = new this.descriptionModel({
      ...createDescriptionDto,
      place: place._id,
    });

    return await createdDescription.save();
  }

  async findAll(): Promise<Description[]> {
    return await this.descriptionModel.find().exec();
  }

  async findOne(id: string): Promise<Description | null> {
    return await this.descriptionModel.findById(id).exec();
  }

  async update(
    id: string,
    updateDescriptionDto: UpdateDescriptionDto,
  ): Promise<Description | null> {
    let newPlaceId: Types.ObjectId | undefined;

    if (updateDescriptionDto.place) {
      const placeId = new Types.ObjectId(updateDescriptionDto.place);

      const place = await this.placeModel.findById(placeId);
      if (!place) {
        throw new HttpException(
          'Không tìm thấy địa điểm hợp lệ',
          HttpStatus.NOT_FOUND,
        );
      }

      newPlaceId = place._id as Types.ObjectId;
    }
    return await this.descriptionModel
      .findByIdAndUpdate(
        id, 
        {
          ...updateDescriptionDto,
          ...(newPlaceId && { place: newPlaceId })
        }, 
        { new: true }
      )
      .exec();
  }

  async remove(id: string): Promise<Description | null> {
    return await this.descriptionModel.findByIdAndDelete(id).exec();
  }
}
