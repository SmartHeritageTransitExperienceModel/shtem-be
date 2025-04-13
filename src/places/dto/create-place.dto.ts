import {
  IsArray,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsIn,
  IsNumber,
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
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GeoLocation)
  readonly location: GeoLocation;

  @IsString()
  readonly wikipediaDesc: string;

  @IsString()
  readonly aiDesc: string;

  @IsArray()
  readonly image: string[];

  @IsString()
  readonly audio: string;
}
