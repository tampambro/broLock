import { Controller, Get, Param, Query } from '@nestjs/common';
import { BroListService } from './bro-list.service';

@Controller('bro-list')
export class BroListController {
  constructor(private readonly broListService: BroListService) { }

  @Get('created/:profileId')
  async getCreatedList(
    @Param('profileId') profileId: number,
    @Query('page') page: number = 1,
    @Query('size') size: number = 20,
  ) {
    return this.broListService.getCreatedList({
      profileId,
      page,
      size,
    });
  }
}
