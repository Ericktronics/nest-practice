import {
  IsString,
  MinLength,
  Length,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateProfileDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  @MinLength(3)
  description: string;
}

export class PutProfileDto {
  @IsUUID()
  id: UUID;

  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  @MinLength(3)
  description: string;
}