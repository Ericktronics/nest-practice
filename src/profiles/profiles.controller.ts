import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProfileDto, PutProfileDto } from './dto/profile.dto';
import { ProfilesService } from './profiles.service';
import { UUID } from 'crypto';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}
  @Get()
  findAll(): any[] {
    return this.profileService.findALl();
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.profileService.findOne(id);
  }

  @Post()
  create(@Body() createProfile: CreateProfileDto) {
    return this.profileService.create(createProfile);
  }

  @Put(':id')
  update(@Body() updateProfile: PutProfileDto, @Param('id') id: string) {
    return this.profileService.update({ id, ...updateProfile });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: UUID) {
    return this.profileService.delete(id);
  }
}
