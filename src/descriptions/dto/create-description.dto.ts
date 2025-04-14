import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsIn,
} from 'class-validator';

export const SUPPORTED_LANGUAGES = ['vi', 'en', 'ja', 'ko'] as const;

export class CreateDescriptionDto {
  @IsMongoId({ message: 'place must be a valid MongoID' })
  @IsNotEmpty()
  readonly place: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(SUPPORTED_LANGUAGES)
  readonly language: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  readonly aiDesc: string;
}
