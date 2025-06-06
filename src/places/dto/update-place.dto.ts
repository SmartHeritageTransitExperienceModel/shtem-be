import { PartialType, OmitType } from '@nestjs/mapped-types';
import {
  IsArray,
  ValidateNested,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePlaceDto } from './create-place.dto';

class GeoLocationUpdate {
  @IsIn(['Point'])
  @IsOptional()
  readonly type?: 'Point';

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly coordinates?: [number, number];
}

export class UpdatePlaceDto extends PartialType(OmitType(CreatePlaceDto, ['location'] as const)) {
  @ValidateNested()
  @Type(() => GeoLocationUpdate)
  @IsOptional()
  readonly location?: GeoLocationUpdate;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  readonly images?: string[];

  @IsString()
  @IsOptional()
  readonly slug?: string;
}