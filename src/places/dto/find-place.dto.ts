import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { SUPPORTED_LANGUAGES } from "src/descriptions/dto/create-description.dto";

export class FindPlacesDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'longitude must be a number' })
  @IsNotEmpty()
  longitude: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'latitude must be a number' })
  @IsNotEmpty()
  latitude: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'distance must be a number' })
  @IsOptional()
  distance: number = 10000;

  @IsString()
  @IsOptional()
  @IsIn(SUPPORTED_LANGUAGES)
  language: string = 'vi';
}