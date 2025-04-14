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
import { AudiosService } from './audios.service';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import { Types } from 'mongoose';

@Controller('audios')
export class AudiosController {
  constructor(private readonly audiosService: AudiosService) {}

  @Post()
  async create(@Body() createAudioDto: CreateAudioDto) {
    try {
      return await this.audiosService.create(createAudioDto);
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

  @Get()
  async findAll() {
    try {
      return await this.audiosService.findAll();
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
        throw new HttpException('Không thể nhận id', HttpStatus.NOT_ACCEPTABLE);
      }
      const audio = await this.audiosService.findOne(id);
      if (!audio) {
        throw new HttpException('Không tìm thấy bản ghi', HttpStatus.NOT_FOUND);
      }
      return audio;
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
    @Body() updateAudioDto: UpdateAudioDto,
  ) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('Không thể nhận id', HttpStatus.NOT_ACCEPTABLE);
      }
      const updatedAudio = await this.audiosService.update(id, updateAudioDto);
      if (!updatedAudio) {
        throw new HttpException(
          'Cập nhật bản ghi thất bại',
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedAudio;
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
        throw new HttpException('Không thể nhận id', HttpStatus.NOT_ACCEPTABLE);
      }
      const deletedAudio = await this.audiosService.remove(id);
      if (!deletedAudio) {
        throw new HttpException(
          'Xóa bản ghi thất bại',
          HttpStatus.NOT_FOUND,
        );
      }
      return { message: 'Xóa bản ghi thành công' };
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
