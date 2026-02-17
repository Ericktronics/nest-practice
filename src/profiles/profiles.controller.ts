import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProfileDto, PutProfileDto } from './dto/profile.dto';
import { ProfilesService } from './profiles.service';
import { UUID } from 'crypto';
import { ProfilesGuard } from './profiles.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}

  @Get()
  findAll(): any[] {
    return this.profileService.findALl();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.profileService.findOne(id);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new NotFoundException(message);
    }
  }

  @Post()
  create(@Body() createProfile: CreateProfileDto) {
    return this.profileService.create(createProfile);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProfile: PutProfileDto,
  ) {
    try {
      return this.profileService.update({ id, ...updateProfile });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new NotFoundException(message);
    }
  }

  @Delete(':id')
  @UseGuards(ProfilesGuard)
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    try {
      return this.profileService.delete(id);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new NotFoundException(message);
    }
  }
}
