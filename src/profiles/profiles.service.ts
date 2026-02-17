import { Injectable } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import { CreateProfileDto, PutProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      id: randomUUID(),
      name: 'Test Profile 1',
      description: 'loremipsum',
    },
    {
      id: randomUUID(),
      name: 'Test Profile 2',
      description: 'dolor sit amet',
    },
    {
      id: randomUUID(),
      name: 'Test Profile 3',
      description: 'consectetur adipiscing',
    },
    {
      id: randomUUID(),
      name: 'Test Profile 4',
      description: 'sed do eiusmod',
    },
  ];

  findALl() {
    return this.profiles;
  }

  findOne(id: string) {
    return this.profiles.find((profile) => profile.id === id);
  }

  create(createProfile: CreateProfileDto) {
    this.profiles.push({ id: randomUUID(), ...createProfile });
    return 'New Profile Created';
  }

  update(updateProfile: PutProfileDto) {
    const profileIndex = this.profiles.findIndex(
      (profile) => profile.id === updateProfile.id,
    );

    this.profiles[profileIndex] = updateProfile;

    return this.profiles[profileIndex];
  }

  delete(id: UUID) {
    const matchingProfile = this.profiles.findIndex(
      (profile) => profile.id !== id,
    );

    if (matchingProfile === -1) {
      return 'No Profile';
    }
    
    this.profiles.splice(matchingProfile, 1);
  }
}
