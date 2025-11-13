import { SetBroPhraseRequestDto } from '@dto/profile/set-bro-phrase-request.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { ProfileInfoRequestDto } from '@dto/profile/profile-info-request.dto';
import { ProfileInfoResponseDto } from '@dto/profile/profile-info-response.dto';
import { ProfileRequestDto } from '@dto/profile/profile-request.dto';
import { ProfileResponseDto } from '@dto/profile/profile-response.dto';
import { BroLock } from 'src/bro-lock/entity/bro-lock.entity';
import { BroLockPreviewItemDto } from '@dto/bro-lock-items/bro-lock-preview-item.dto';
import { BroReactionList } from 'src/bro-lock/entity/bro-reaction-list.entity';
import { BRO_REACTION_ENUM } from '@bro-types/bro-reaction.enum';
import { BroStateList } from 'src/bro-lock/entity/bro-state-list.entity';
import { BRO_LIST_STATE_ENUM } from '@bro-types/bro-state-list.enum';

interface ReactionsList {
  likeLocks: BroLockPreviewItemDto[];
  dislikeLocks: BroLockPreviewItemDto[];
  pokerFaceLocks: BroLockPreviewItemDto[];
}

interface StateList {
  activeLocks: BroLockPreviewItemDto[];
  closeLocks: BroLockPreviewItemDto[];
  laterLocks: BroLockPreviewItemDto[];
  trashLocks: BroLockPreviewItemDto[];
}

@Injectable()
export class ProfileService {
  constructor(
    private userSrv: UserService,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async getProfile(params: ProfileRequestDto): Promise<ProfileResponseDto> {
    const profile = await this.findByUser(params.userId);

    const { userName, avatar, userPhrase } = profile;

    const createdBroLocks = profile.createdBroLocks?.map(lock => {
      return this.createPreviewLock(lock);
    });

    const addedBroLocks = profile.addedBroLocks?.map(lock => {
      return this.createPreviewLock(lock);
    });

    const { likeLocks, dislikeLocks, pokerFaceLocks } = this.getReactions(
      profile.reactions,
    );

    const { activeLocks, closeLocks, laterLocks, trashLocks } =
      this.getStateList(profile.broStateList);

    return {
      userName,
      avatar,
      userPhrase,
      createdBroLocks,
      addedBroLocks,
      activeLocks,
      closeLocks,
      laterLocks,
      trashLocks,
      likeLocks,
      dislikeLocks,
      pokerFaceLocks,
    };
  }

  private createPreviewLock(broLock: BroLock): BroLockPreviewItemDto {
    const { id, name, auther, category, img, genres } = broLock;

    return {
      id,
      name,
      auther,
      category,
      img,
      genres,
      createDate: broLock.createDate.toDateString(),
      lockCount: broLock.lockItems.length,
    };
  }

  getStateList(list: BroStateList[]): StateList {
    const state = {
      activeLocks: [],
      closeLocks: [],
      laterLocks: [],
      trashLocks: [],
    };

    list?.forEach(lock => {
      switch (lock.state) {
        case BRO_LIST_STATE_ENUM.ACTIVE:
          state.activeLocks.push(lock);
          break;
        case BRO_LIST_STATE_ENUM.CLOSE:
          state.closeLocks.push(lock);
          break;
        case BRO_LIST_STATE_ENUM.LATE:
          state.laterLocks.push(lock);
          break;
        case BRO_LIST_STATE_ENUM.TRASH:
          state.trashLocks.push(lock);
          break;
        default:
          throw new BadRequestException();
      }
    });

    return state;
  }

  getReactions(list: BroReactionList[]): ReactionsList {
    const reactions = {
      likeLocks: [],
      dislikeLocks: [],
      pokerFaceLocks: [],
    };

    list?.forEach(lock => {
      switch (lock.reaction) {
        case BRO_REACTION_ENUM.LIKE:
          reactions.likeLocks.push(lock);
          break;
        case BRO_REACTION_ENUM.DISLIKE:
          reactions.dislikeLocks.push(lock);
          break;
        case BRO_REACTION_ENUM.POKER_FACE:
          reactions.pokerFaceLocks.push(lock);
          break;
        default:
          throw new BadRequestException();
      }
    });

    return reactions;
  }

  async findByUser(userId: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
      relations: {
        createdBroLocks: { lockItems: true },
        addedBroLocks: { lockItems: true },
      },
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
