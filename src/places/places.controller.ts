import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Types } from 'mongoose';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    try {
      return await this.placesService.create(createPlaceDto);
    } catch (e) {
      throw new HttpException(
        'Lỗi máy chủ nội bộ',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.placesService.findAll();
    } catch (e) {
      throw new HttpException(
        'Lỗi máy chủ nội bộ',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException(
          'Không thể chấp nhận id',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      const place = await this.placesService.findOne(id);
      if (!place) {
        throw new HttpException(
          'Không tìm thấy địa điểm',
          HttpStatus.NOT_FOUND,
        );
      }
      return place;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Lỗi máy chủ nội bộ',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('ID không hợp lệ', HttpStatus.NOT_ACCEPTABLE);
      }
      const updatedPlace = await this.placesService.update(id, updatePlaceDto);
      if (!updatedPlace) {
        throw new HttpException('Không tìm thấy địa điểm', HttpStatus.NOT_FOUND);
      }
      return updatedPlace;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Lỗi máy chủ nội bộ',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('ID không hợp lệ', HttpStatus.NOT_ACCEPTABLE);
      }
      const deletedPlace = await this.placesService.remove(id);
      if (!deletedPlace) {
        throw new HttpException('Không tìm thấy địa điểm', HttpStatus.NOT_FOUND);
      }
      return { mess: 'Xóa thành công' };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Lỗi máy chủ nội bộ',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }
}
