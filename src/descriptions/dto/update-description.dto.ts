import { PartialType } from '@nestjs/mapped-types';
import {
  IsOptional,
  IsMongoId,
  IsString,
  IsIn,
} from 'class-validator';
import { CreateDescriptionDto, SUPPORTED_LANGUAGES } from './create-description.dto';

export class UpdateDescriptionDto extends PartialType(CreateDescriptionDto) {
  @IsMongoId()
  @IsOptional()
  readonly place?: string;

  @IsString()
  @IsOptional()
  @IsIn(SUPPORTED_LANGUAGES)
  readonly language?: string;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly address?: string;

  @IsString()
  @IsOptional()
  readonly city?: string;

  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsString()
  @IsOptional()
  readonly aiDesc?: string;
}
