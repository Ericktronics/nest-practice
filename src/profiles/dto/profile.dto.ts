import { UUID } from "crypto";

export class CreateProfileDto {
  name: string;
  description: string;
}

export class PutProfileDto {
  id: UUID;
  name: string;
  description: string;
}