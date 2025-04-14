import { HttpException, HttpStatus, Injectable, Type } from '@nestjs/common';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Audio, AudioDocument } from './schemas/audio.schema';
import {
  Description,
  DescriptionDocument,
} from 'src/descriptions/schemas/description.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AudiosService {
  constructor(
    @InjectModel(Audio.name)
    private audioModel: Model<AudioDocument>,

    @InjectModel(Description.name)
    private descriptionModel: Model<DescriptionDocument>,
  ) {}

  async create(createAudioDto: CreateAudioDto): Promise<Audio> {
    const descId = new Types.ObjectId(createAudioDto.description);

    const description = await this.descriptionModel.findById(descId).exec();
    if (!description) {
      throw new HttpException(
        'Không tìm thấy mô tả hợp lệ',
        HttpStatus.NOT_FOUND,
      );
    }

    const newAudio = new this.audioModel({
      ...createAudioDto,
      description: description._id,
    });

    return await newAudio.save();
  }

  async findAll(): Promise<Audio[]> {
    return await this.audioModel
      .find().exec();
  }

  async findOne(id: string): Promise<Audio | null> {
    return await this.audioModel.findById(id).exec();
  }

  async update(
    id: string,
    updateAudioDto: UpdateAudioDto,
  ): Promise<Audio | null> {
    let newDescriptionId: Types.ObjectId | undefined;

    if (updateAudioDto.description) {
      const descId = new Types.ObjectId(updateAudioDto.description);

      const description = await this.descriptionModel.findById(descId).exec();
      if (!description) {
        throw new HttpException(
          'Không tìm thấy mô tả hợp lệ',
          HttpStatus.NOT_FOUND,
        );
      }

      newDescriptionId = description._id as Types.ObjectId;
    }

    return await this.audioModel
      .findByIdAndUpdate(
        id,
        {
          ...updateAudioDto,
          ...(newDescriptionId && { description: newDescriptionId }),
        },
        { new: true },
      )
      .exec();
  }

  async remove(id: string): Promise<Audio | null> {
    return await this.audioModel.findByIdAndDelete(id).exec();
  }
}
