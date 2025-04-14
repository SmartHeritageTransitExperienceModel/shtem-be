import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Type } from 'class-transformer';

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
}