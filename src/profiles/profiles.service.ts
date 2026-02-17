import { Injectable } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import { CreateProfileDto, PutProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfilesService {
  private profiles: PutProfileDto[] = [
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
    const profile = this.profiles.find((profile) => profile.id === id);

    if (profile === undefined) {
      throw new Error(`Profile with id ${id} is not found`);
    }

    return profile;
  }

  create(createProfile: CreateProfileDto) {
    this.profiles.push({ id: randomUUID(), ...createProfile });
    return 'New Profile Created';
  }

  update(updateProfile: PutProfileDto) {
    const profileIndex = this.profiles.findIndex(
      (profile) => profile.id === updateProfile.id,
    );

    if (profileIndex === -1) {
      throw new Error(
        `Cannot update profileId ${updateProfile.id}. Profile is Not Found`,
      );
    }

    this.profiles[profileIndex] = updateProfile;
    return this.profiles[profileIndex];
  }

  delete(id: UUID) {
    const matchingProfile = this.profiles.findIndex(
      (profile) => profile.id === id,
    );

    if (matchingProfile < 0) {
      throw new Error(
        `Cannot delete profileId ${id}. Profile is Not Found`,
      );
    }

    return this.profiles.splice(matchingProfile, 1);
  }
}
