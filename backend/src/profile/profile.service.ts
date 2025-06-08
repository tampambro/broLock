import { ActiveBroLocksRequest } from '@dto/profile/active-bro-locks-request.dto';
import { ActiveBroLocksResponse } from '@dto/profile/active-bro-locks-response.dto';
import { SetBroPhraseRequestDto } from '@dto/profile/set-bro-phrase-request.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { ProfileInfoRequestDto } from '@dto/profile/profile-info-request.dto';
import { ProfileInfoResponseDto } from '@dto/profile/profile-info-response.dto';

@Injectable()
export class ProfileService {
  constructor(
    private userSrv: UserService,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  // getActiveBroLocks(params: ActiveBroLocksRequest): ActiveBroLocksResponse[] {

  // }

  async findByUser(userId: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!profile) {
      throw new BadRequestException();
    }

    return profile;
  }

  async save(profile: Profile): Promise<void> {
    this.profileRepository.save(profile);
  }

  async getProfileInfo(
    params: ProfileInfoRequestDto,
  ): Promise<ProfileInfoResponseDto> {
    const { userName, avatar, userPhrase } = await this.findByUser(
      params.userId,
    );

    return {
      userName,
      avatar,
      userPhrase,
    };
  }

  async setBroPhrase(params: SetBroPhraseRequestDto): Promise<void> {
    const profile = await this.findByUser(params.userId);

    if (!profile) {
      throw new BadRequestException();
    }

    profile.userPhrase = params.phrase;
    await this.save(profile);
  }
}
