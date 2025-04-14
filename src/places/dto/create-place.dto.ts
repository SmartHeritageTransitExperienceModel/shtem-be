import {
  IsArray,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsIn,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

class GeoLocation {
  @IsIn(['Point'])
  readonly type: 'Point';

  @IsArray()
  @IsNumber({}, { each: true })
  readonly coordinates: [number, number];
}

export class CreatePlaceDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GeoLocation)
  readonly location: GeoLocation;

  @IsString()
  @IsNotEmpty()
  readonly slug: string;

  @IsArray()
  @IsUrl({}, { each: true })
  readonly images: string[];
}
