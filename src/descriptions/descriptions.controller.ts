import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DescriptionsService } from './descriptions.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { Types } from 'mongoose';

@Controller('descriptions')
export class DescriptionsController {
  constructor(private readonly descriptionsService: DescriptionsService) {}

  @Post()
  async create(@Body() createDescriptionDto: CreateDescriptionDto) {
    try {
      return await this.descriptionsService.create(createDescriptionDto);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Lỗi máy chủ nội bộ',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return this.descriptionsService.findAll();
    } catch (e) {
      throw new HttpException(
        'Lỗi máy chủ nội bộ',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('Không thể nhận id', HttpStatus.NOT_ACCEPTABLE);
      }
      const description = await this.descriptionsService.findOne(id);
      if (!description) {
        throw new HttpException('Không tìm thấy mô tả', HttpStatus.NOT_FOUND);
      }
      return description;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Lỗi máy chủ nội bộ',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDescriptionDto: UpdateDescriptionDto,
  ) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('Không thể nhận id', HttpStatus.NOT_ACCEPTABLE);
      }
      const updatedDescription = await this.descriptionsService.update(
        id,
        updateDescriptionDto,
      );
      if (!updatedDescription) {
        throw new HttpException(
          'Cập nhật mô tả thất bại',
          HttpStatus.BAD_REQUEST,
        );
      }
      return updatedDescription;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Lỗi máy chủ nội bộ',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('ID không hợp lệ', HttpStatus.NOT_ACCEPTABLE);
      }
      const deletedDescription = await this.descriptionsService.remove(id);
      if (!deletedDescription) {
        throw new HttpException(
          'Xóa mô tả không thành công',
          HttpStatus.BAD_REQUEST,
        );
      }
      return { message: 'Xóa mô tả thành công' };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Lỗi máy chủ nội bộ',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }
}
