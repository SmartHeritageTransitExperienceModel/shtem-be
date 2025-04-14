import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsMongoId, IsString, IsUrl } from 'class-validator';
import { CreateAudioDto } from './create-audio.dto';

export class UpdateAudioDto extends PartialType(CreateAudioDto) {
  @IsMongoId()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly voice?: string;

  @IsUrl({}, { message: 'url must be a valid URL' })
  @IsOptional()
  readonly url?: string;
}
