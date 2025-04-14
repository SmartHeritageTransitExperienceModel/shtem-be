import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsMongoId, IsString } from 'class-validator';
import { CreateAudioDto } from './create-audio.dto';

export class UpdateAudioDto extends PartialType(CreateAudioDto) {
  @IsMongoId()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly voice?: string;

  @IsString()
  @IsOptional()
  readonly url?: string;
}
