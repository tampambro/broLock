import { Controller, Get, Param, Query } from '@nestjs/common';
import { BroListService } from './bro-list.service';
import { BRO_LIST_STATE_ENUM } from '@dto/types/bro-state-list.enum';

@Controller('bro-list')
export class BroListController {
  constructor(private readonly broListService: BroListService) { }

  @Get('created/:profileId')
  async getCreatedList(
    @Param('profileId') profileId: number,
    @Query('page') page: number = 1,
    @Query('size') size: number = 20,
  ) {
    return await this.broListService.getCreatedList({
      profileId,
      page,
      size,
    });
  }

  @Get('added/:profileId')
  async getAddedList(
    @Param('profileId') profileId: number,
    @Query('page') page: number = 1,
    @Query('size') size: number = 20,
  ) {
    return await this.broListService.getAddedList({
      profileId,
      page,
      size,
    });
  }

  @Get(':state/:profileId')
  async getListsByState(
    @Param('state') state: BRO_LIST_STATE_ENUM,
    @Param('profileId') profileId: number,
    @Query('page') page: number = 1,
    @Query('size') size: number = 20,
  ) {
    return await this.broListService.getListsByState({
      state,
      profileId,
      page,
      size,
    });
  }
}
