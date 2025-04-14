import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsUrl,
} from 'class-validator';

export class CreateAudioDto {
  @IsMongoId({ message: 'place must be a valid MongoID' })
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly voice: string;

  @IsUrl({}, { message: 'url must be a valid URL' })
  @IsNotEmpty()
  readonly url: string;
}
